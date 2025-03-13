<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Lire le fichier JSON
        $json = file_get_contents(public_path('data/products.json'));
        $data = json_decode($json, true);

        // Parcourir toutes les catégories
        foreach ($data as $categorie => $products) {
            foreach ($products as $product) {
                Product::create([
                    'title'       => $product['title'],
                    'price'       => $product['price'],
                    'image_url'   => $product['image_url'],
                    'description' => $product['description'],
                    'category'    => $categorie, // Stocker la catégorie
                    'type'        => $product['type'],
                ]);
            }
        }
    }
}
