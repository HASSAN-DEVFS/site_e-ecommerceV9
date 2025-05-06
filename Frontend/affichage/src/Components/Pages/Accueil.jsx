import { useEffect, useState } from "react";
import "../Style/Accueill.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ajouterAuPanier } from "../../redux_panier/PanierSlice";


const Accueil = ({ brandImages, cards, products, setProducts }) => {
   
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
      
        setTimeout(() => {
            fetch("http://127.0.0.1:8000/api/produits-limites")
                .then((response) => response.json())
                .then((data) => {
                    setProducts((produit) => [...produit, ...data]); 
                    setLoading(false); 
                })
                .catch((err) => {
                    console.error("Fetch error:", err);
                    setLoading(false); 
                });
        }, 2000);
    }, [setProducts]); 
    return (
        <>
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="./assets/carroussel0.jpg"
                            className="d-block w-100"
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="./assets/carroussel1.webp"
                            className="d-block w-100"
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img src="./assets/imagecomplete.webp" alt="..." />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="carousel">
                <div className="carousel-track">
                    {brandImages.map((img, index) => {
                        return (
                            <img
                                key={index} // Ajout de la clé avec l'index
                                src={img}
                                alt={`Brand ${index}`} // Utilisation correcte de l'index ici
                                className="carousel-logo"
                            />
                        );
                    })}

                    {/* <img
                        src="/assets/Branding/nike.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="logo2.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="logo3.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="logo4.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="logo5.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="logo6.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="logo1.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="logo2.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="logo3.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="logo4.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="logo5.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="logo6.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="/assets/Branding/nike.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="/assets/Branding/adidas.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="/assets/Branding/asus.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="/assets/Branding/cat.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="/assets/Branding/apple.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="/assets/Branding/hp.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="/assets/Branding/.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="logo2.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="logo3.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="logo4.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    />
                    <img
                        src="logo5.png"
                        alt="Marque de vêtements"
                        className="carousel-logo"
                    />
                    <img
                        src="logo6.png"
                        alt="Marque de PC"
                        className="carousel-logo"
                    /> */}
                </div>
            </div>

            {/*--------------------------------------------------------------------------------------------------------------------------------*/}
            <div className="title">
                <h1 style={{ textAlign: "center", marginTop: "4%" }}>
                    Catégories
                </h1>
            </div>
            <div id="card-area">
                <div className="wrapper">
                    <div className="box-area">
                        {cards.map((card, index) => {
                            return (
                                <div className="box" key={index}>
                                    <img src={card.img} alt="" />
                                    <div className="overlay">
                                        <h3>{card.title}</h3>
                                        <p>{card.description}</p>
                                        <Link to={card.link}>Visiter</Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="titleProduits">
                <h1>Produits</h1>
            </div>
            {/*-------------------------------------------------------------------------------*/}

            {/*--------------------------------------------------------------------------------------*/}

            <div className="container-fluid bg-transparent my-4 p-3">
    <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
    {loading ? (
        <div className="spinner"></div>
    ) : (
        products.map((product,index) => (
            <div className="col hp" key={index}>
            <div className="card h-100 shadow-sm">
              <a target="_blank" rel="noopener noreferrer" href={product.link}>
                <img
                  src={product.image_url}
                  className="card-img-top"
                  alt={product.title}
                />
              </a>
              {/* <div className="label-top shadow-sm">
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={product.link}
                >
                  {product.brand}
                </a>
              </div> */}
              <div className="card-body">
                <div className="clearfix mb-3 text-center">
                  <span className="text-center badge rounded-pill bg-success">
                    {product.price}
                  </span>
                  {/* <span className="float-end">
                    <a href="#" className="small text-muted text-uppercase aff-link">
                      reviews
                    </a>
                  </span> */}
                </div>
                <h5 className="card-title">
                  <a target="_blank" rel="noopener noreferrer" href={product.link}>
                    {product.title}
                  </a>
                </h5>
                <div className="d-grid gap-2 my-4">
                  <Link to="#" className="btn btn-warning bold-btn" onClick={() => dispatch(ajouterAuPanier({
                    id: product.id,
                    title: product.title,
                    image_url: product.image_url,
                    description: product.description,
                    price: parseFloat(product.price),
                  }))} >Ajouter au panier</Link>
                </div>
                <div className="clearfix mb-1">
                  {/* <span className="float-start">
                    <a href="#">
                      <i className="fas fa-question-circle"></i>
                    </a>
                  </span> */}
                  {/* <span className="float-end">
                    {/* <i className="far fa-heart" style={{ cursor: "pointer" }}></i> 
                  </span> */}
                </div>
              </div>
            </div>
          </div>
          ))
    )}
        

    </div>
      </div>

            <div className="publicité">
                <img src="./assets/Publicité3.webp" alt="" />
                <div className="textpub">
                    <p>
                        Viora Luxe. propose des soldes exceptionnelles pour ses
                        clients
                    </p>
                </div>
                <div className="glass-button">
                    <a href="https://www.vioraluxe.com/">Profitez-en !</a>
                </div>
            </div>

            {/* <footer>
    <div className="footer">
        
    </div>
  </footer> */}
        </>
    );
};

export default Accueil;
