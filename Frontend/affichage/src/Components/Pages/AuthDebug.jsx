import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AuthDebug = () => {
  const { user, loading, error, fetchUser } = useAuth();
  const [apiResponse, setApiResponse] = useState(null);
  const [testStatus, setTestStatus] = useState(null);
  const BACKEND_URL = 'http://127.0.0.1:8000';

  const testApi = async (endpoint) => {
    try {
      setTestStatus({ loading: true, endpoint });
      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        credentials: 'include',
      });
      
      const data = await response.text();
      setApiResponse({
        status: response.status,
        data: data
      });
    } catch (error) {
      setApiResponse({
        error: error.message
      });
    } finally {
      setTestStatus({ loading: false });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Débogage Authentification</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>État actuel</h2>
        <p>Loading: {loading ? 'Oui' : 'Non'}</p>
        <p>Utilisateur connecté: {user ? 'Oui' : 'Non'}</p>
        {user && (
          <div>
            <p>Nom: {user.name}</p>
            <p>Email: {user.email}</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={fetchUser} style={{ marginRight: '10px' }}>
          Rafraîchir utilisateur
        </button>
        <button onClick={() => testApi('/api/user')} disabled={testStatus?.loading}>
          Tester API
        </button>
      </div>
      
      {apiResponse && (
        <div style={{ padding: '10px', border: '1px solid #ccc' }}>
          <h2>Réponse API</h2>
          <p>Status: {apiResponse.status}</p>
          <pre>{apiResponse.data || JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AuthDebug;


