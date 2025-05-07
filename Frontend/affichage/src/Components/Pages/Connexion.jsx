// // src/pages/Login.jsx
// import { useGoogleLogin } from '@react-oauth/google';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

    
  


//     // Connexion classique
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
      
//       const response = await fetch('http://127.0.0.1:8000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage('Connexion réussie');
//         navigate('/');
//       } else {
//         setMessage(data.message || 'Erreur de connexion');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage('Erreur lors de la connexion');
//     }
//   };


  


//      // login Google
//   const googleLogin = useGoogleLogin({
//     onSuccess: async ({ credential }) => {
//       try {
//            // CSRF cookie helper
//   const fetchCsrf = async () => {
//     await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
//       credentials: 'include',
//     });
//   };
//         await fetchCsrf(); // appeler le CSRF cookie avant tout POST
//         const res = await fetch('http://127.0.0.1:8000/api/google-login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({ token: credential }),
//         });
//         const data = await res.json();
//         if (res.ok) {
//           navigate('/');
//         } else {
//           setMessage(data.message || 'Échec Google');
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage('Erreur Google');
//       }
//     },
//     onError: () => setMessage("Échec de l'auth Google"),
//   });



//     return (
       

//         <div className="container vh-100 d-flex">
//         <div className="row justify-content-center align-items-center g-0 w-100">
//           {/* Colonne unique pour le formulaire, centrée */}
//           <div className="col-md-6 d-flex align-items-center justify-content-center bg-white px-5">
//             <div className="w-100" style={{ maxWidth: "400px" }}>
//               <h6 className="text-muted mb-1">Start your journey</h6>
//               <h2 className="fw-bold mb-4">Sign Up to InsideBox</h2>
  
//               <form onSubmit={handleLogin}>
//                 <div className="mb-3">
//                   <label className="form-label">E-mail</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="example@email.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
  
//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="********"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
  
//                 <button type="submit" className="btn btn-primary w-100">
//                   Sign Up
//                 </button>
//               </form>
  
//               {message && (
//                 <p className="text-danger text-center mt-3">{message}</p>
//               )}
  
//               <div className="text-center text-muted mt-4 mb-2">
//                 or sign up with
//               </div>
  
//               <div className="d-flex justify-content-between gap-2 mb-3">
//                 {["facebook", "google", "apple"].map((provider) => (
//                   <button
//                     key={provider}
//                     className="btn btn-outline-secondary flex-fill"
//                     type="button"
//                     onClick={
//                       provider === "google"
//                         ? () => googleLogin()
//                         : undefined // Tu pourras ajouter Facebook/Apple ici plus tard
//                     }
//                   >
//                     <img
//                       src={`https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/${provider}.svg`}
//                       alt={provider}
//                       style={{ width: 20, height: 20 }}
//                     />
//                   </button>
//                 ))}
//               </div>
  
//               <p className="text-center mt-4">
//                 Have an account?{" "}
//                 <a href="#" className="text-primary">
//                   Sign in
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>



           
//     );
// }

// export default Login;






// // src/pages/Login.jsx
// import React, { useState } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   // Helper to fetch CSRF cookie
//   const fetchCsrf = () => {
//     return fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
//       credentials: 'include',
//     });
//   };

//   // Handle classic login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await fetchCsrf();
//       const response = await fetch('http://127.0.0.1:8000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         navigate('/');
//       } else {
//         setMessage(data.message || 'Erreur de connexion');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage('Erreur lors de la connexion');
//     }
//   };

//   // Handle Google login using access_token
//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const token = tokenResponse.access_token;            
//         if (!token) throw new Error('Pas de token Google');
//         await fetchCsrf();
//         const res = await fetch('http://127.0.0.1:8000/api/google-login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({ token }),
//         });
//         const data = await res.json();
//         if (res.ok) {
//           navigate('/');
//         } else {
//           setMessage(data.message || 'Échec Google');
//         }
//       } catch (err) {
//         console.error('Google login error:', err);
//         setMessage('Erreur Google');
//       }
//     },
//     onError: (errorResponse) => {
//       console.error('Google auth error:', errorResponse);
//       setMessage("Échec de l'auth Google");
//     },
//   });

//   return (
//     <div className="container vh-100 d-flex">
//       <div className="row justify-content-center align-items-center w-100">
//         <div className="col-md-6 d-flex align-items-center justify-content-center bg-white px-5">
//           <div style={{ maxWidth: 400, width: '100%' }}>
//             <h2 className="fw-bold mb-4">Se connecter</h2>
//             <form onSubmit={handleLogin}>
//               <div className="mb-3">
//                 <label className="form-label">E-mail</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Mot de passe</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary w-100 mb-3">
//                 Se connecter
//               </button>
//             </form>
//             {message && <p className="text-danger text-center mt-3">{message}</p>}
//             <div className="text-center text-muted my-3">Ou connectez-vous avec</div>
//             <div className="d-flex justify-content-between gap-2">
//               {['facebook', 'google', 'apple'].map((provider) => (
//                 <button
//                   key={provider}
//                   type="button"
//                   className="btn btn-outline-secondary flex-fill"
//                   onClick={() => provider === 'google' && googleLogin()}
//                 >
//                   <img
//                     src={`https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/${provider}.svg`}
//                     alt={provider}
//                     style={{ width: 20, height: 20 }}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;































// src/pages/Login.jsx
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Vite uniquement
  const logoUrls = {
    facebook: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    google: "https://developers.google.com/identity/images/g-logo.png",
    twitter:  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/240px-Logo_of_Twitter.svg.png",
  };

  // Helper to fetch CSRF cookie
  const fetchCsrf = () => {
    return fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      credentials: 'include',
    });
  };

  // Handle classic login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await fetchCsrf();
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/');
      } else {
        setMessage(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Erreur lors de la connexion');
    }
  };

  const handleProviderClick = (provider) => {
    if (provider === 'google') {
      googleLogin();
    } else if (provider === 'twitter') {
      handleTwitterLogin();
    } else {
      console.log(`${provider} login non encore implémenté`);
    }
  };

  

  
    
  const handleTwitterLogin = () => {
    if (!BACKEND_URL) {
      console.error('VITE_BACKEND_URL non défini');
      return;
    }
    window.location.href = `${BACKEND_URL}/auth/redirect/twitter`
;

  };
  






  // Handle Google login using access_token
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const token = tokenResponse.access_token;            
        if (!token) throw new Error('Pas de token Google');
        await fetchCsrf();
        const res = await fetch('http://127.0.0.1:8000/api/google-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (res.ok) {
          navigate('/');
        } else {
          setMessage(data.message || 'Échec Google');
        }
      } catch (err) {
        console.error('Google login error:', err);
        setMessage('Erreur Google');
      }
    },
    onError: (errorResponse) => {
      console.error('Google auth error:', errorResponse);
      setMessage("Échec de l'auth Google");
    },
  });

  return (
    <div className="container vh-100 d-flex">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white px-5">
          <div style={{ maxWidth: 400, width: '100%' }}>
            <h2 className="fw-bold mb-4">Se connecter</h2>
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
            {message && <p className="text-danger text-center mt-3">{message}</p>}
            <div className="text-center text-muted my-3">Ou connectez-vous avec</div>
            <div className="d-flex justify-content-between gap-2">
              {['facebook', 'google', 'twitter'].map((provider) => (
  <button
    key={provider}
    type="button"
    className="btn btn-outline-secondary flex-fill"
    onClick={() => handleProviderClick(provider)
    }
  >
    <img
      src={logoUrls[provider]}
      alt={provider}
      style={{ width: 20, height: 20 }}
    />
  </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
































































































































// <div className="row vh-100 justify-content-center align-items-center g-0">
// <div className="col-md-6 d-flex align-items-center justify-content-center bg-white px-5">
// <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
// <h6 className="text-muted mb-1">Start your journey</h6>
// <h2 className="fw-bold mb-4">Sign Up to InsideBox</h2>

// <form onSubmit={handleLogin}>
// <div className="mb-3">
//   <label className="form-label">E-mail</label>
//   <input
//     type="email"
//     className="form-control"
//     placeholder="example@email.com"
//     value={email}
//     onChange={e => setEmail(e.target.value)}
//     required
//   />
// </div>
// <div className="mb-3">
//   <label className="form-label">Password</label>
//   <input
//     type="password"
//     className="form-control"
//     placeholder="********"
//     value={password}
//     onChange={e => setPassword(e.target.value)}
//     required
//   />
// </div>
// <button type="submit" className="btn btn-primary w-100">
//   Sign Up
// </button>
// </form>

// {message && (
// <p className="text-danger text-center mt-3">{message}</p>
// )}

// <div className="text-center text-muted mt-4 mb-2">or sign up with</div>

// <div className="d-flex justify-content-between gap-2 mb-3">
// {['facebook','google','apple'].map((provider) => (
//   <button key={provider} className="btn btn-outline-secondary flex-fill">
//     <img
//       src={`https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/${provider}.svg`}
//       alt={provider}
//       style={{ width: 20, height: 20 }}
//     />
//   </button>
// ))}
// </div>

// <p className="text-center mt-4">
// Have an account? <a href="#" className="text-primary">Sign in</a>
// </p>
// </div> 
// </div>

// </div>