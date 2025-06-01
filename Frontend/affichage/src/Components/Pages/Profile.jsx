import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import './Profile.css';
import { FaUser, FaMapMarkerAlt, FaPhone, FaShoppingBag, FaHeart, FaCreditCard, FaFileDownload, FaEye } from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
  const { user, loading, error, fetchUser, isAuthenticated, token } = useAuth();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Maroc'
  });
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [wishlistError, setWishlistError] = useState(null);
  
  // Fonction pour charger les commandes de l'utilisateur
  const fetchUserOrders = async () => {
    if (!token) return;
    
    setLoadingOrders(true);
    setOrderError(null);
    
    try {
      const response = await axios.get('http://localhost:8000/api/user/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      setOrderError(error.response?.data?.message || error.message || 'Erreur lors du chargement des commandes');
    } finally {
      setLoadingOrders(false);
    }
  };
  
  // Fonction pour charger la liste de souhaits de l'utilisateur
  const fetchUserWishlist = async () => {
    if (!token) return;
    
    setLoadingWishlist(true);
    setWishlistError(null);
    
    try {
      const response = await axios.get('http://localhost:8000/api/user/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error('Erreur lors du chargement de la liste de souhaits:', error);
      setWishlistError(error.response?.data?.message || error.message || 'Erreur lors du chargement de la liste de souhaits');
    } finally {
      setLoadingWishlist(false);
    }
  };
  
  // Charger les données au montage du composant
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchUserOrders();
      fetchUserWishlist();
    }
  }, [isAuthenticated, token]);
  
  // Fonction pour télécharger une facture
  const handleDownloadInvoice = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/invoices/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `facture-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erreur lors du téléchargement de la facture:', error);
      alert('Erreur lors du téléchargement de la facture. Veuillez réessayer plus tard.');
    }
  };
  
  // Fonction pour ajouter un produit au panier depuis la liste de souhaits
  const handleAddToCart = (product) => {
    dispatch(ajouterAuPanier(product));
    alert(`${product.name} a été ajouté à votre panier.`);
  };
  
  // Fonction pour supprimer un produit de la liste de souhaits
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/user/wishlist/remove/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Mettre à jour la liste de souhaits
      setWishlist(wishlist.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Erreur lors de la suppression du produit de la liste de souhaits:', error);
      alert('Erreur lors de la suppression du produit. Veuillez réessayer plus tard.');
    }
  };

  // Forcer un rafraîchissement des données utilisateur au chargement
  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      try {
        await fetchUser();
        console.log("Profile component mounted, user data fetched");
      } catch (err) {
        console.error("Error fetching user in profile:", err);
      } finally {
        setLoadingProfile(false);
      }
    };
    
    loadProfile();
  }, []);

  // Mettre à jour les données du formulaire lorsque l'utilisateur est chargé
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postal_code || '',
        country: user.country || 'Maroc'
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus({ loading: true, success: false, error: null });
    
    try {
      // Envoyer les données au serveur
      const response = await axios.post('http://localhost:8000/api/profile/update', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        // Mettre à jour l'état avec les nouvelles données
        setUpdateStatus({ loading: false, success: true, error: null });
        
        // Rafraîchir les données utilisateur
        await fetchUser();
        
        // Désactiver le mode édition
        setEditMode(false);
        
        // Afficher un message de succès temporaire
        setTimeout(() => {
          setUpdateStatus(prev => ({ ...prev, success: false }));
        }, 3000);
      } else {
        throw new Error(response.data.message || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      setUpdateStatus({ 
        loading: false, 
        success: false, 
        error: error.response?.data?.message || error.message || 'Une erreur est survenue' 
      });
    }
  };

  if (loading || loadingProfile) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-2">Chargement des données utilisateur...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">
          <h4>Erreur lors du chargement du profil</h4>
          <p>{error}</p>
          {token && (
            <div className="mt-2">
              <p>Token présent mais non valide. Essayez de vous reconnecter.</p>
            </div>
          )}
        </div>
        <button 
          className="btn btn-primary mt-3" 
          onClick={() => window.location.href = '/login'}
        >
          Retour à la connexion
        </button>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    console.log("User is not authenticated, redirecting to login");
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-user-info">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="profile-avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `
                  <div class="profile-avatar-placeholder">
                    ${user.name ? user.name.charAt(0).toUpperCase() : '?'}
                  </div>
                `;
              }}
            />
          ) : (
            <div className="profile-avatar-placeholder">
              {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
          <h3>{user?.name || 'Utilisateur'}</h3>
          <p>{user?.email || 'Email non disponible'}</p>
          <p className="member-since">Membre depuis: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
        </div>
        
        <ul className="profile-menu">
          <li 
            className={activeTab === 'personal' ? 'active' : ''} 
            onClick={() => setActiveTab('personal')}
          >
            <FaUser /> Informations personnelles
          </li>
          <li 
            className={activeTab === 'address' ? 'active' : ''} 
            onClick={() => setActiveTab('address')}
          >
            <FaMapMarkerAlt /> Adresses de livraison
          </li>
          <li 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingBag /> Mes commandes
          </li>
          <li 
            className={activeTab === 'wishlist' ? 'active' : ''} 
            onClick={() => setActiveTab('wishlist')}
          >
            <FaHeart /> Liste de souhaits
          </li>
          <li 
            className={activeTab === 'payment' ? 'active' : ''} 
            onClick={() => setActiveTab('payment')}
          >
            <FaCreditCard /> Méthodes de paiement
          </li>
        </ul>
      </div>
      
      <div className="profile-content">
        {activeTab === 'personal' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Informations personnelles</h2>
              <button 
                className="btn-edit" 
                onClick={() => setEditMode(!editMode)}
                disabled={updateStatus.loading}
              >
                {editMode ? 'Annuler' : 'Modifier'}
              </button>
            </div>
            
            {updateStatus.success && (
              <div className="alert alert-success">
                Vos informations ont été mises à jour avec succès.
              </div>
            )}
            
            {updateStatus.error && (
              <div className="alert alert-danger">
                {updateStatus.error}
              </div>
            )}
            
            {editMode ? (
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-group">
                  <label>Nom complet</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={() => setEditMode(false)}
                    disabled={updateStatus.loading}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn-save"
                    disabled={updateStatus.loading}
                  >
                    {updateStatus.loading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="info-display">
                <div className="info-item">
                  <span className="info-label">Nom complet:</span>
                  <span className="info-value">{user?.name || 'Non renseigné'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user?.email || 'Non renseigné'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Téléphone:</span>
                  <span className="info-value">{user?.phone || 'Non renseigné'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Membre depuis:</span>
                  <span className="info-value">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'address' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Adresses de livraison</h2>
              <button 
                className="btn-edit" 
                onClick={() => setEditMode(!editMode)}
                disabled={updateStatus.loading}
              >
                {editMode ? 'Annuler' : 'Modifier'}
              </button>
            </div>
            
            {updateStatus.success && (
              <div className="alert alert-success">
                Vos informations ont été mises à jour avec succès.
              </div>
            )}
            
            {updateStatus.error && (
              <div className="alert alert-danger">
                {updateStatus.error}
              </div>
            )}
            
            {editMode ? (
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-group">
                  <label>Adresse</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Ville</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Code postal</label>
                  <input 
                    type="text" 
                    name="postalCode" 
                    value={formData.postalCode} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Pays</label>
                  <select 
                    name="country" 
                    value={formData.country} 
                    onChange={handleInputChange}
                  >
                    <option value="Maroc">Maroc</option>
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={() => setEditMode(false)}
                    disabled={updateStatus.loading}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn-save"
                    disabled={updateStatus.loading}
                  >
                    {updateStatus.loading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="info-display">
                <div className="info-item">
                  <span className="info-label">Adresse:</span>
                  <span className="info-value">{user?.address || 'Non renseignée'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ville:</span>
                  <span className="info-value">{user?.city || 'Non renseignée'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Code postal:</span>
                  <span className="info-value">{user?.postal_code || 'Non renseigné'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Pays:</span>
                  <span className="info-value">{user?.country || 'Maroc'}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Mes commandes</h2>
            </div>
            
            {loadingOrders ? (
              <div className="loading-indicator">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
                <p>Chargement de vos commandes...</p>
              </div>
            ) : orderError ? (
              <div className="alert alert-danger">
                {orderError}
              </div>
            ) : orders.length > 0 ? (
              <div className="orders-list">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Commande</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.date}</td>
                        <td>
                          <span className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.total} Dhs</td>
                        <td className="action-buttons">
                          <button 
                            className="btn-action btn-view" 
                            onClick={() => setSelectedOrder(order)}
                            title="Voir les détails"
                          >
                            <FaEye /> <span className="btn-text">Détails</span>
                          </button>
                          <button 
                            className="btn-action btn-download" 
                            onClick={() => handleDownloadInvoice(order.id)}
                            title="Télécharger la facture"
                          >
                            <FaFileDownload /> <span className="btn-text">Facture</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaShoppingBag />
                </div>
                <h3>Aucune commande</h3>
                <p>Vous n'avez pas encore passé de commande.</p>
                <button className="btn-shop" onClick={() => navigate('/produits')}>
                  Commencer vos achats
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'wishlist' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Liste de souhaits</h2>
            </div>
            
            {loadingWishlist ? (
              <div className="loading-indicator">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
                <p>Chargement de votre liste de souhaits...</p>
              </div>
            ) : wishlistError ? (
              <div className="alert alert-danger">
                {wishlistError}
              </div>
            ) : wishlist.length > 0 ? (
              <div className="wishlist-grid">
                {wishlist.map(item => (
                  <div className="wishlist-item" key={item.id}>
                    <div className="wishlist-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="wishlist-item-info">
                      <h3>{item.name}</h3>
                      <p className="price">{item.price} Dhs</p>
                      <div className="wishlist-actions">
                        <button 
                          className="btn-add-cart" 
                          onClick={() => handleAddToCart(item)}
                        >
                          Ajouter au panier
                        </button>
                        <button 
                          className="btn-remove" 
                          onClick={() => handleRemoveFromWishlist(item.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Votre liste de souhaits est vide.</p>
                <button className="btn-shop">Explorer les produits</button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'payment' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Méthodes de paiement</h2>
            </div>
            
            <div className="payment-methods">
              <div className="payment-method">
                <div className="payment-method-icon">
                  <FaCreditCard />
                </div>
                <div className="payment-method-info">
                  <h3>Paiement à la livraison</h3>
                  <p>Payer en espèces lors de la réception de votre commande</p>
                </div>
              </div>
              
              <div className="payment-method">
                <div className="payment-method-icon">
                  <FaCreditCard />
                </div>
                <div className="payment-method-info">
                  <h3>Carte bancaire</h3>
                  <p>Payer en ligne avec votre carte bancaire via notre passerelle sécurisée</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;






