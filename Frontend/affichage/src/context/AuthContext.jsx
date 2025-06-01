import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const BACKEND_URL = 'http://127.0.0.1:8000';

  const fetchUser = async () => {
    try {
      setLoading(true);
      console.log("Tentative de récupération des données utilisateur...");
      
      // Préparer les headers avec le token si disponible
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log("Token utilisé pour l'authentification:", token.substring(0, 10) + "...");
      } else {
        console.log("Aucun token disponible pour l'authentification");
      }
      
      const response = await fetch(`${BACKEND_URL}/api/user`, {
        credentials: 'include',
        headers: headers
      });
      
      console.log("Réponse API user:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Données utilisateur reçues:", data);
        // Assurez-vous que l'avatar est inclus dans les données utilisateur
        setUser(data.user);
        setError(null);
        return data.user;
      } else {
        console.error("Erreur lors de la récupération de l'utilisateur:", response.status);
        const errorText = await response.text();
        console.error("Détails de l'erreur:", errorText);
        setUser(null);
        setError(`Erreur ${response.status}: ${errorText}`);
        // Si le token est invalide, le supprimer
        if (response.status === 401 && token) {
          localStorage.removeItem('auth_token');
          setToken(null);
        }
        return null;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const logout = async () => {
    try {
      console.log("Déconnexion en cours...");
      
      // Préparer les headers avec le token si disponible
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log("Token utilisé pour la déconnexion:", token.substring(0, 10) + "...");
      }
      
      // Appel au backend pour déconnecter l'utilisateur
      const response = await fetch(`${BACKEND_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: headers
      });
      
      console.log("Réponse de déconnexion:", response.status);
      
      // Supprimer le token du localStorage
      localStorage.removeItem('auth_token');
      
      // Supprimer les autres données stockées localement
      localStorage.removeItem('user_data');
      sessionStorage.clear();
      
      // Réinitialiser l'état
      setToken(null);
      setUser(null);
      
      console.log("Déconnexion réussie, état réinitialisé");
      
      // Rediriger vers la page d'accueil
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Fonction pour stocker le token
  const setAuthToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('auth_token', newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem('auth_token');
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      loading, 
      error,
      fetchUser,
      logout,
      isAuthenticated: !!user,
      token,
      setAuthToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);






