import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ajouterAuPanier } from "../../redux_panier/PanierSlice";

const Produits = () => {
    const dispatch = useDispatch();
    // const ajouterAuPanier = useSelector((state) => state.panier.ajouterAuPanier);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {category} = useParams();

    useEffect(() => {
       const url = category ? `http://127.0.0.1:8000/api/products/${category}` : `http://127.0.0.1:8000/api/products?limit=25`;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); // Vérifie si les données sont correctes
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setError(error);
                setLoading(false);
            });
    }, [category]); 
    

    if (loading) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div className="container-fluid bg-transparent my-4 p-3">
                <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
                    {products.map((product) => (
                        <div className="col hp" key={product.id}>
                            <div className="card h-100 shadow-sm">
                                <a target="_blank" rel="noopener noreferrer" href={product.link}>
                                    <img
                                        src={product.image_url}
                                        className="card-img-top"
                                        alt={product.title}
                                    />
                                </a>
                                <div className="card-body">
                                    <div className="clearfix mb-3 text-center">
                                        <span className="text-center badge rounded-pill bg-success">
                                            {product.price}
                                        </span>
                                    </div>
                                    <h5 className="card-title">
                                        <a target="_blank" rel="noopener noreferrer" href={product.link}>
                                            {product.title}
                                        </a>
                                    </h5>
                                    <div className="d-grid gap-2 my-4">
                                    <button
    className="btn btn-warning bold-btn"
    onClick={() =>
        dispatch(
            ajouterAuPanier({
                id: product.id,
                title: product.title,
                image_url: product.image_url,
                description: product.description,
                price: parseFloat(product.price),
            })
        )
    }
>
    Ajouter au panier
</button>

                                    </div>
                                    <div className="clearfix mb-1"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Produits;