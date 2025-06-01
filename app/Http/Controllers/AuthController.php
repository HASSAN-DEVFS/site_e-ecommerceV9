<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

use App\Models\User;


class AuthController extends Controller
{
    // login classique
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;
            
            return response()->json([
                'message' => 'Connecté',
                'token' => $token,
                'user' => $user
            ], 200);
        }
        return response()->json(['message' => 'Échec'], 401);
    }

    // logout
    public function logout(Request $request)
    {
        try {
            // Récupérer l'utilisateur authentifié
            $user = $request->user();
            
            if ($user) {
                // Révoquer tous les tokens de l'utilisateur
                $user->tokens()->delete();
                
                \Log::info('Utilisateur déconnecté', [
                    'user_id' => $user->id,
                    'email' => $user->email
                ]);
            }
            
            // Déconnecter la session
            Auth::logout();
            
            // Invalider la session
            $request->session()->invalidate();
            
            // Régénérer le jeton CSRF
            $request->session()->regenerateToken();
            
            return response()->json([
                'message' => 'Déconnecté avec succès',
                'success' => true
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la déconnexion', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Erreur lors de la déconnexion: ' . $e->getMessage(),
                'success' => false
            ], 500);
        }
    }

    // login via Google
    public function googleLogin(Request $request)
    {
        try {
            $token = $request->input('token');
            
            if (!$token) {
                \Log::error('Google login: Token manquant');
                return response()->json(['message' => 'Token Google manquant'], 400);
            }
            
            \Log::info('Google login: Tentative avec token', ['token_start' => substr($token, 0, 10)]);
            
            try {
                // Utiliser userFromToken pour récupérer l'utilisateur Google
                $googleUser = Socialite::driver('google')->stateless()->userFromToken($token);
            } catch (\Exception $e) {
                \Log::error('Google login: Erreur Socialite', [
                    'error' => $e->getMessage(),
                    'token_start' => substr($token, 0, 10)
                ]);
                return response()->json(['message' => 'Erreur de validation du token: ' . $e->getMessage()], 401);
            }

            if (!$googleUser || !$googleUser->getEmail()) {
                \Log::error('Google login: Données utilisateur invalides');
                return response()->json(['message' => 'Données utilisateur Google invalides'], 400);
            }

            \Log::info('Google login: Utilisateur récupéré', [
                'email' => $googleUser->getEmail(),
                'name' => $googleUser->getName()
            ]);

            // Valider l'URL de l'avatar
            $avatarUrl = $this->validateAvatarUrl($googleUser->getAvatar());
            
            // trouver ou créer l'utilisateur
            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $avatarUrl, // URL validée
                    'password' => bcrypt(\Illuminate\Support\Str::random(16)),
                ]
            );

            // Connecter l'utilisateur avec Sanctum
            Auth::login($user);
            
            // Générer un token Sanctum pour l'API
            $token = $user->createToken('google-token')->plainTextToken;
            
            \Log::info('Google login: Authentification réussie', [
                'user_id' => $user->id, 
                'email' => $user->email,
                'auth_check' => Auth::check(),
                'session_id' => session()->getId()
            ]);
            
            return response()->json([
                'message' => 'Connecté Google', 
                'user' => $user,
                'token' => $token,
                'auth_check' => Auth::check()
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Google login: Erreur générale', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    public function redirectToTwitter()
{
    return Socialite::driver('twitter')->redirect();
}

      // Étape 2 : Twitter renvoie ici après consentement
      public function handleTwitterCallback()
      {
          // Récupère les infos utilisateur depuis Twitter
          $socialUser = Socialite::driver('twitter')->user();
  
          // Cherche ou crée l’utilisateur en base
          $user = User::firstOrCreate(
              [
                  'provider'    => 'twitter',
                  'provider_id' => $socialUser->getId(),
              ],
              [
                  'name'  => $socialUser->getName() ?? $socialUser->getNickname(),
                  'email' => $socialUser->getEmail(), // peut être null selon permissions
                  // tu peux aussi stocker le token si nécessaire :
                  // 'token' => $socialUser->token,
              ]
          );
  
          // Connecte l’utilisateur
          Auth::login($user);
  
          // Redirige vers le front-end (ou tableau de bord)
          return redirect(config('app.frontend_url'));
      }

    public function getUserProfile(Request $request)
    {
        try {
            // Vérifier si l'utilisateur est authentifié via session
            if (Auth::check()) {
                $user = Auth::user();
                \Log::info('User profile requested (session)', [
                    'user_id' => $user->id, 
                    'authenticated' => true,
                    'session_id' => session()->getId()
                ]);
                
                return response()->json([
                    'user' => $user,
                    'isAuthenticated' => true
                ]);
            }
            
            // Vérifier si l'utilisateur est authentifié via token
            if ($request->bearerToken()) {
                $user = $request->user();
                if ($user) {
                    \Log::info('User profile requested (token)', [
                        'user_id' => $user->id, 
                        'authenticated' => true
                    ]);
                    
                    return response()->json([
                        'user' => $user,
                        'isAuthenticated' => true
                    ]);
                }
            }
            
            \Log::info('User profile requested but not authenticated', [
                'session_id' => session()->getId(),
                'cookies' => request()->cookies->all()
            ]);
            
            return response()->json([
                'isAuthenticated' => false,
                'message' => 'Non authentifié'
            ], 401);
        } catch (\Exception $e) {
            \Log::error('Error in getUserProfile', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Erreur serveur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        // Récupérer l'utilisateur authentifié avec toutes ses données, y compris l'avatar
        $user = $request->user();
        
        // Assurez-vous que l'avatar est inclus dans la réponse
        return response()->json([
            'user' => $user,
            'isAuthenticated' => true
        ]);
    }

    /**
     * Handle Google login
     */
    public function handleGoogleLogin(Request $request)
    {
        try {
            // Valider le token
            $token = $request->input('token');
            if (!$token) {
                return response()->json(['message' => 'Token manquant'], 400);
            }

            // Récupérer les infos utilisateur depuis Google
            $client = new \Google_Client(['client_id' => config('services.google.client_id')]);
            $payload = $client->verifyIdToken($token);

            if (!$payload) {
                return response()->json(['message' => 'Token invalide'], 400);
            }

            // Récupérer les données utilisateur
            $googleId = $payload['sub'];
            $email = $payload['email'];
            $name = $payload['name'];
            $avatar = $payload['picture']; // Récupérer l'avatar de Google

            // Chercher ou créer l'utilisateur
            $user = User::updateOrCreate(
                [
                    'email' => $email,
                ],
                [
                    'name' => $name,
                    'google_id' => $googleId,
                    'avatar' => $avatar, // Enregistrer l'avatar
                ]
            );

            // Créer un token pour l'API
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => 'Connexion Google réussie'
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

    // Fonction pour s'assurer que l'URL de l'avatar est valide
    private function validateAvatarUrl($url)
    {
        if (empty($url)) {
            return null;
        }
        
        // S'assurer que l'URL commence par http:// ou https://
        if (!preg_match('/^https?:\/\//i', $url)) {
            $url = 'https://' . $url;
        }
        
        // Vérifier si l'URL est accessible
        $headers = @get_headers($url);
        if ($headers && strpos($headers[0], '200') !== false) {
            return $url;
        }
        
        \Log::warning('URL d\'avatar invalide ou inaccessible', ['url' => $url]);
        return null;
    }

    /**
     * Update user profile information
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(Request $request)
    {
        try {
            // Valider les données
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . auth()->id(),
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:100',
                'postalCode' => 'nullable|string|max:20',
                'country' => 'nullable|string|max:100',
            ]);

            // Récupérer l'utilisateur authentifié
            $user = $request->user();
            
            // Mettre à jour les informations
            $user->name = $validated['name'];
            $user->email = $validated['email'];
            
            // Mettre à jour les champs supplémentaires s'ils existent
            if (isset($validated['phone'])) {
                $user->phone = $validated['phone'];
            }
            
            if (isset($validated['address'])) {
                $user->address = $validated['address'];
            }
            
            if (isset($validated['city'])) {
                $user->city = $validated['city'];
            }
            
            if (isset($validated['postalCode'])) {
                $user->postal_code = $validated['postalCode'];
            }
            
            if (isset($validated['country'])) {
                $user->country = $validated['country'];
            }
            
            // Sauvegarder les modifications
            $user->save();
            
            // Journaliser la mise à jour
            \Log::info('Profil utilisateur mis à jour', [
                'user_id' => $user->id,
                'email' => $user->email
            ]);
            
            return response()->json([
                'message' => 'Profil mis à jour avec succès',
                'user' => $user,
                'success' => true
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
                'success' => false
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour du profil', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du profil',
                'success' => false
            ], 500);
        }
    }
}












