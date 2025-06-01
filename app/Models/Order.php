<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_amount',
        'status',
        'payment_id',
        'shipping_address',
        'shipping_city',
        'shipping_postal_code',
        'shipping_country',
    ];

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec les articles de la commande
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}