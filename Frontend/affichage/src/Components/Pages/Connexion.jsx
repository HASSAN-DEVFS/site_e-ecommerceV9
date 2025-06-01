// Importez les dépendances nécessaires
import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { fetchUser, setAuthToken } = useAuth();
  const BACKEND_URL = 'http://127.0.0.1:8000';

  // Helper to fetch CSRF cookie
  const fetchCsrf = async () => {
    try {
      console.log("Récupération du cookie CSRF...");
      const response = await fetch(`${BACKEND_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
      });
      console.log("Réponse CSRF:", response.status);
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération du cookie CSRF:", error);
      throw error;
    }
  };

  // Handle classic login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await fetchCsrf();
      console.log("Tentative de connexion classique...");
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Réponse login:", response.status, data);
      
      if (response.ok) {
        console.log("Connexion réussie, récupération des données utilisateur");
        
        // Stocker le token d'API si présent
        if (data.token) {
          setAuthToken(data.token);
        }
        
        await fetchUser();
        console.log("Redirection vers le profil");
        navigate('/profile');
      } else {
        setMessage(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Erreur lors de la connexion: ' + error.message);
    }
  };

  // Nouvelle approche pour Google login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google login success, token response:", tokenResponse);
        const token = tokenResponse.access_token;
        
        if (!token) {
          console.error("Pas de token Google dans la réponse");
          throw new Error('Pas de token Google');
        }
        
        console.log("Token Google obtenu:", token.substring(0, 10) + "...");
        
        // Récupérer le cookie CSRF
        await fetchCsrf();
        
        console.log("Envoi du token au backend...");
        const res = await fetch(`${BACKEND_URL}/api/google-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token }),
        });
        
        console.log("Réponse du backend status:", res.status);
        
        // Récupérer la réponse en texte d'abord
        const responseText = await res.text();
        console.log("Réponse brute:", responseText);
        
        // Essayer de parser en JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          console.error("Erreur lors du parsing de la réponse:", e);
          throw new Error("Réponse invalide du serveur: " + responseText.substring(0, 100));
        }
        
        console.log("Réponse du backend data:", data);
        
        if (res.ok) {
          console.log("Connexion Google réussie, stockage du token");
          
          // Stocker le token d'API si présent
          if (data.token) {
            console.log("Token reçu et stocké:", data.token.substring(0, 10) + "...");
            localStorage.setItem('auth_token', data.token);
            setAuthToken(data.token);
          } else {
            console.error("Aucun token reçu du backend");
          }
          
          // Attendre que fetchUser() termine
          await fetchUser();
          console.log("Redirection vers le profil");
          navigate('/profile');
        } else {
          console.error("Échec de la connexion Google:", data.message);
          setMessage(data.message || 'Échec Google');
        }
      } catch (err) {
        console.error('Google login error détaillée:', err);
        setMessage('Erreur Google: ' + err.message);
      }
    },
    onError: (errorResponse) => {
      console.error('Google auth error:', errorResponse);
      setMessage("Échec de l'auth Google: " + (errorResponse?.error_description || errorResponse?.error || "Erreur inconnue"));
    },
    flow: 'implicit',
    scope: 'email profile',
  });

  return (
    <div className="container vh-100 d-flex">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white px-5">
          <div style={{ maxWidth: 400, width: '100%' }}>
            <h2 className="fw-bold mb-4">Se connecter</h2>
            {message && <div className="alert alert-danger">{message}</div>}
            
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Se connecter
              </button>
            </form>
            
            <div className="text-center text-muted my-3">Ou connectez-vous avec</div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => googleLogin()}
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="google"
                  style={{ width: 20, height: 20, marginRight: '8px' }}
                />
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
// </div>
