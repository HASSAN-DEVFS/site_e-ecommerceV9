<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    'google' => [
  'client_id'     => env('593028440137-o2onm20ad0ujchn9mrd35il7us3k996j.apps.googleusercontent.com'),
  'client_secret' => env('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'),
  'redirect'      => env('http://localhost:5173/oauth2/acceuil'),
],
'twitter' => [
    'client_id'     => env('dlFGbUV4dVRCX01zelIzVFlfVGw6MTpjaQ'),
    'client_secret' => env('****TDVSH7'),
    'redirect'      => env('https://localhost:8000/auth/callback/twitter'),
],

];
