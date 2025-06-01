import React, { useState } from 'react';

const ApiTest = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testEndpoint = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const defaultOptions = {
        credentials: 'include',
      };
      const mergedOptions = { ...defaultOptions, ...options };
      
      console.log(`Testing ${url} with options:`, mergedOptions);
      const res = await fetch(url, mergedOptions);
      
      const text = await res.text();
      console.log(`Raw response from ${url}:`, text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = { text };
      }
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
        headers: Object.fromEntries([...res.headers.entries()]),
      });
    } catch (err) {
      console.error(`Error testing ${url}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Test API</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Endpoints</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
          <button 
            onClick={() => testEndpoint('http://127.0.0.1:8000/api/test')}
            className="btn btn-primary"
          >
            Test API
          </button>
          
          <button 
            onClick={() => testEndpoint('http://127.0.0.1:8000/sanctum/csrf-cookie')}
            className="btn btn-secondary"
          >
            CSRF Cookie
          </button>
          
          <button 
            onClick={() => testEndpoint('http://127.0.0.1:8000/api/user')}
            className="btn btn-info"
          >
            User Profile
          </button>
        </div>
      </div>
      
      {loading && <p>Chargement...</p>}
      
      {error && (
        <div className="alert alert-danger">
          <h3>Erreur</h3>
          <p>{error}</p>
        </div>
      )}
      
      {response && (
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Réponse</h3>
          <p><strong>Status:</strong> {response.status} {response.statusText}</p>
          
          <div>
            <h4>Headers</h4>
            <pre>{JSON.stringify(response.headers, null, 2)}</pre>
          </div>
          
          <div>
            <h4>Data</h4>
            <pre>{JSON.stringify(response.data, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest;