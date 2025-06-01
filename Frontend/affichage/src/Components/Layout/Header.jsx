import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link, useNavigate} from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import { useAuth } from '../../context/AuthContext';

import "../Style/Header.css";
const Header = () => {
    const NbreArticles = useSelector((state) => state.panier.nbrArticles);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Ajouter un log pour déboguer
    console.log("User dans Header:", user);
    console.log("Avatar URL:", user?.avatar);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    
    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileMenuRef]);
    
    // Fonction de déconnexion améliorée
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            // Utiliser la fonction de déconnexion du contexte
            await logout();
            
            // Réinitialiser le panier si nécessaire
            // Si vous avez une action pour vider le panier, vous pouvez l'appeler ici
            // dispatch(viderPanier());
            
            // Fermer le menu mobile si ouvert
            setIsMenuOpen(false);
            
            // Rediriger vers la page d'accueil
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    // Fonction pour gérer le survol
    const handleMouseEnter = (itemId) => {
        setHoveredItem(itemId);
    };
    
    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    return (
        <>
<div className="container">
    {/* Conteneur principal pour aligner les éléments */}
    <div className="header-content">
      {/* Logo à gauche */}
      <div className="logo">
        <img src="/assets/Logo.png" alt="VioraLuxe." />
      </div>

      {/* Icônes à droite */}
      <div className="icon-container">
        {/* Icône du panier - maintenant à gauche */}
        <div style={styles.panier}>
          <Link to='/panier'><FaShoppingCart className='icon' style={styles.iconePanier} /></Link>
          {NbreArticles > 0 && (
            <div style={styles.badge}>
              <span style={styles.badgeTexte}>{NbreArticles}</span>
            </div>
          )} 
        </div>
        
        {/* Avatar de profil utilisateur avec menu déroulant */}
        {user && (
          <div className="avatar-wrapper" ref={profileMenuRef}>
            <div 
              onClick={toggleProfileMenu} 
              className="avatar-clickable"
            >
              {user.avatar ? (
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src={user.avatar} 
                    alt="Avatar" 
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #fff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onError={(e) => {
                      console.error("Erreur de chargement de l'avatar:", e);
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `
                        <div style="
                          width: 32px;
                          height: 32px;
                          border-radius: 50%;
                          background-color: #007bff;
                          color: white;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          font-size: 16px;
                          font-weight: bold;
                          position: relative;
                        ">${user.name ? user.name.charAt(0).toUpperCase() : '?'}</div>
                      `;
                    }}
                  />
                  {/* Indicateur en ligne ajusté */}
                  <div style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#4CAF50',
                    borderRadius: '50%',
                    border: '1px solid white',
                    bottom: '2px',
                    right: '2px'
                  }}></div>
                </div>
              ) : (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#007bff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  position: 'relative'
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                  {/* Indicateur en ligne ajusté */}
                  <div style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#4CAF50',
                    borderRadius: '50%',
                    border: '1px solid white',
                    bottom: '2px',
                    right: '2px'
                  }}></div>
                </div>
              )}
            </div>
            
            {/* Menu déroulant du profil avec effet de survol bleu */}
            {isProfileMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '45px',
                right: '0',
                width: '200px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 1000,
                overflow: 'hidden'
              }}>
                {/* En-tête du menu avec le nom d'utilisateur */}
                <div style={{
                  padding: '10px 15px',
                  borderBottom: '1px solid #eee',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#333'
                  }}>{user.name}</span>
                </div>
                
                {/* Liste des options de menu avec effet de survol bleu */}
                <ul style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '0'
                }}>
                  <li style={{
                    padding: '0',
                    margin: '0',
                    borderBottom: '1px solid #f5f5f5'
                  }}>
                    <Link 
                      to="/profile" 
                      style={{
                        display: 'block',
                        padding: '10px 15px',
                        color: hoveredItem === 'profile' ? 'white' : '#555',
                        backgroundColor: hoveredItem === 'profile' ? '#007bff' : 'transparent',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={() => handleMouseEnter('profile')}
                      onMouseLeave={handleMouseLeave}
                    >
                      Profile
                    </Link>
                  </li>
                  <li style={{
                    padding: '0',
                    margin: '0',
                    borderBottom: '1px solid #f5f5f5'
                  }}>
                    <Link 
                      to="/settings" 
                      style={{
                        display: 'block',
                        padding: '10px 15px',
                        color: hoveredItem === 'settings' ? 'white' : '#555',
                        backgroundColor: hoveredItem === 'settings' ? '#007bff' : 'transparent',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={() => handleMouseEnter('settings')}
                      onMouseLeave={handleMouseLeave}
                    >
                      Settings
                    </Link>
                  </li>
                  <li style={{
                    padding: '0',
                    margin: '0'
                  }}>
                    <a 
                      href="#" 
                      onClick={handleLogout} 
                      style={{
                        display: 'block',
                        padding: '10px 15px',
                        color: hoveredItem === 'logout' ? 'white' : '#555',
                        backgroundColor: hoveredItem === 'logout' ? '#007bff' : 'transparent',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={() => handleMouseEnter('logout')}
                      onMouseLeave={handleMouseLeave}
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
<hr/>
              {/* ---------------------------------------------------- */}
            <header className="header">
                
                <div
                    className="header-row container"
                    role="navigation"
                    aria-label="Main"
                >
                    <div className="header-left">
                        <div className="logo">
                            <h1 className='store'>Viora<span style={{color : "blue"}}>Luxe.</span></h1>
                        </div>
                    </div>
                    <div className="header-right">
                        <ul className="main-menu">
                            <li className="menu-item">
                                <Link to="/" className="active">
                                    Home
                                </Link>
                            </li>

                            <li className="menu-item mega-menu">
                                <Link to="/products/">categories +</Link>
                                <div className="mega-menu-wrapper slideInUp">
                                    <div className="mega-menu-col">
                                        <h5>Mode et vêtements</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <Link to="/products/vetementsHommes">
                                                vêtements Hommes
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/vêtementsFemmes">
                                                vêtements Femmes
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/enfants">
                                                enfants
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/chaussures">
                                                chaussures
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/AccessoiresMode">
                                                accessoires de mode
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Électronique</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <Link to="/products/telephonesAccessoires">
                                                Smartphones
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/ordinateursAccessoires">
                                                ordinateurs
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/televiseursAccessoires">
                                                Téléviseurs 4K
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/AccessoiresElectronique">
                                                accessoires électroniques
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Appareils photo numériques
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Maison et Cuisine</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <Link to="/products/Meubles">
                                                Meubles (Tables, Canapés)
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="/products/Électroménager">
                                                Électroménager
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/products/Linge de maison">
                                                Linge de maison
                                                </a>
                                            </li>
                                            <li>
                                                <Link to="/products/Décoration-intérieure">
                                                Décoration intérieure
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/Ustenciles-cuisine">
                                                Ustensiles de cuisine
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Beauté et Santé</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <Link to="/products/Maquillage">
                                                Maquillage
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/Parfums">
                                                Parfums
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/Soins capillaires">
                                                Soins capillaires
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/Accessoires de beauté">
                                                Accessoires de beauté
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/Produits-bien-etre">
                                                Produits de bien-être
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li className="menu-item dropdown">
                                <a href="#">Services +</a>
                                <div className="sub-menu-wrapper slideInUp">
                                    <ul className="sub-menu">
                                        <li className="menu-item">
                                            <a href="#">Support technique</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">FAQ</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">Contact</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">Conditions /termes</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="menu-item">
                                <a href="#">Blog</a>
                            </li>
                            <li className="menu-item">
                                {user ? (
                                    <Link to="/profile">Mon Profil</Link>
                                ) : (
                                    <Link to="/login">Connexion</Link>
                                )}
                            </li>
                            {user && (
                                <li className="menu-item">
                                    <a href="#" onClick={handleLogout}>Déconnexion</a>
                                </li>
                            )}
                        </ul>
                        <a
                            href="#"
                            id="hamburger-icon"
                            className="mobile-toggler"
                            aria-label="Mobile Menu"
                            onClick={toggleMenu}
                        >
                            <i
                                className={`fas ${
                                    isMenuOpen ? "fa-times" : "fa-bars"
                                }`}
                            ></i>
                        </a>
                    </div>

                    {/* <!-- Mobile menu --> */}
                    <div
                        id="mobile-menu"
                        className={`mobile-menu ${isMenuOpen ? "" : "hidden"}`}
                    >
                        <ul>
                            <li className="menu-item">
                                <a href="#" className="active">
                                    Home
                                </a>
                            </li>

                            <li className="menu-item mega-menu">
                                <a href="#">categories +</a>
                                <div className="mega-menu-wrapper">
                                    <div className="mega-menu-col">
                                        <h5>Mode et vêtements</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Hommes
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                femmes
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                enfants
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                chaussures
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                accessoires de mode
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Électronique</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Smartphones
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                ordinateurs
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Téléviseurs 4K
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                accessoires électroniques
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Appareils photo numériques
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Maison et Cuisine</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Meubles (Tables, Canapés)
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Électroménager
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Linge de maison
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Décoration intérieure
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Ustensiles de cuisine
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Beauté et Santé</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Maquillage
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Parfums
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Accessoires de beauté
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Soins capillaires
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Produits de bien-être
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li className="menu-item dropdown">
                                <a href="#">Services +</a>
                                <div className="sub-menu-wrapper">
                                    <ul className="sub-menu">
                                        <li className="menu-item">
                                            <a href="#">Support technique</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">FAQ</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">Service 3</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">Service 4</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="menu-item">
                                <a href="#">Blog</a>
                            </li>
                            <li className="menu-item">
                                {user ? (
                                    <Link to="/profile">Mon Profil</Link>
                                ) : (
                                    <Link to="/login">Connexion</Link>
                                )}
                            </li>
                            {user && (
                                <li className="menu-item">
                                    <a href="#" onClick={handleLogout}>Déconnexion</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;


// Styles pour l'exemple
const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "50px",
    },
    boutonAjouter: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "20px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
    },
    panier: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      fontSize: "25px",
      color: "#333",
      marginRight: "20px", // Ajouter une marge à droite pour séparer du logo
    },
    iconePanier: {
      marginRight: "10px",
    },
    iconeProfile: {
      fontSize: "25px",
      color: "#333",
      marginRight: "15px",
    },
    iconWrapper: {
      display: "flex",
      alignItems: "center",
      // Pas de marge à droite nécessaire car c'est le dernier élément
    },
    avatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    avatarContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    avatarPlaceholder: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#007bff",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "bold",
      border: "2px solid #fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    badge: {
      position: "absolute",
      top: "-5px",
      right: "-10px",
      backgroundColor: "#f44336", // Couleur du badge
      color: "#fff",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "10px", // Taille du texte
      fontWeight: "bold",
    },
    badgeTexte: {
      position: "relative",
      top: "-0.5px",
    },
    loginText: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#333",
      textDecoration: "none",
      marginRight: "15px",
    },
    avatarClickable: {
      cursor: 'pointer',
      position: 'relative',
    },
    onlineIndicator: {
      position: 'absolute',
      width: '10px',
      height: '10px',
      backgroundColor: '#4CAF50',
      borderRadius: '50%',
      border: '2px solid white',
      bottom: '0',
      right: '0',
    },
    profileDropdown: {
      position: 'absolute',
      top: '45px',
      right: '0',
      width: '200px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      overflow: 'hidden',
    },
    profileDropdownHeader: {
      padding: '15px',
      borderBottom: '1px solid #eee',
      textAlign: 'center',
    },
    profileName: {
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#333',
    },
    profileMenu: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    profileMenuItem: {
      padding: '0',
      margin: '0',
      transition: 'background-color 0.2s',
    },
    profileMenuLink: {
      display: 'block',
      padding: '12px 15px',
      color: '#555',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: '#f5f5f5',
      }
    },
  };
