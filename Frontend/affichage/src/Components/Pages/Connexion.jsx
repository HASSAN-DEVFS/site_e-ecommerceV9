// src/pages/Login.jsx
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                credentials: 'include',
            });
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Obligatoire avec Sanctum
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Connexion réussie');
                // Rediriger ou stocker l'état connecté ici
            } else {
                setMessage(data.message || 'Erreur de connexion');
            }
        } catch (error) {
            console.error(error);
            setMessage('Erreur lors de la connexion');
        }
    };

    return (
        // <div className="login-container">
        //     <h2>Connexion</h2>
        //     <form onSubmit={handleLogin}>
        //         <input
        //             type="email"
        //             placeholder="Email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             required
        //         />
        //         <input
        //             type="password"
        //             placeholder="Mot de passe"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             required
        //         />
        //         <button type="submit">Se connecter</button>
        //     </form>
        //     {message && <p>{message}</p>}
        // </div>

        
        
            <div className="container vh-100 d-flex">
              {/* Formulaire à gauche */}
              <div className="col-md-6 d-flex align-items-center justify-content-center bg-white px-5">
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <h6 className="text-muted mb-1">Start your journey</h6>
                  <h2 className="fw-bold mb-4">Sign Up to InsideBox</h2>
        
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
        
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
        
                    <button type="submit" className="btn btn-primary w-100">
                      Sign Up
                    </button>
                  </form>
        
                  {message && (
                    <p className="text-danger text-center mt-3">{message}</p>
                  )}
        
                  <div className="text-center text-muted mt-4 mb-2">or sign up with</div>
        
                  <div className="d-flex justify-content-between gap-2 mb-3">
                    <button className="btn btn-outline-secondary flex-fill">
                      <img
                        src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/facebook.svg"
                        alt="Facebook"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                    <button className="btn btn-outline-secondary flex-fill">
                      <img
                        src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/google.svg"
                        alt="Google"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                    <button className="btn btn-outline-secondary flex-fill">
                      <img
                        src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/apple.svg"
                        alt="Apple"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>
        
                  <p className="text-center mt-4">
                    Have an account? <a href="#" className="text-primary">Sign in</a>
                  </p>
                </div>
              </div>
        
              {/* Image à droite */}
              <div className="col-md-6 p-0">
                <img
                  src="/assets/Publicité.webp"
                  alt="Background"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
    );
}

export default Login;
