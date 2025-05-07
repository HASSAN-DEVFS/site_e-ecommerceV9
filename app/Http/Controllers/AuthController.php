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
            return response()->json(['message' => 'Connecté'], 200);
        }
        return response()->json(['message' => 'Échec'], 401);
    }

    // logout
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Déconnecté']);
    }

    // login via Google
    public function googleLogin(Request $request)
    {
    
    // dd($request->all());
    

        $token = $request->input('token');
        $googleUser = Socialite::driver('google')->stateless()->userFromToken($token);


        // trouver ou créer l'utilisateur
        $user = User::updateOrCreate(
            ['email'     => $googleUser->getEmail()],
            [
                'name'      => $googleUser->getName(),
                'google_id'=> $googleUser->getId(),
                'avatar'    => $googleUser->getAvatar(),
                // Vous pouvez générer un mot de passe aléatoire si votre table l'exige
                'password'  => bcrypt(\Illuminate\Support\Str::random(16)),
            ]
        );

        Auth::login($user);
        return response()->json(['message' => 'Connecté Google', 'user' => $user], 200);
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
}