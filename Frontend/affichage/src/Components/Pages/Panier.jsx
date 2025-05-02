// import { useSelector, useDispatch } from "react-redux";
// import Header from "../Layout/Header";
// import "../Style/Panier.css";
// import { AiFillDelete } from "react-icons/ai";
// import { supprimerDuPanier } from "../../redux_panier/PanierSlice";

// const Panier = () => {
//     const dispatch = useDispatch();
//     const panier = useSelector((state) => state.panier.panier);
//     const totalprix = useSelector((state) => state.panier.total);

//     // Regrouper les articles identiques
//     const articlesRegroupés = panier.reduce((acc, article) => {
//         const trouvé = acc.find((item) => item.id === article.id);
//         if (trouvé) {
//             trouvé.quantite += 1;
//         } else {
//             acc.push({ ...article, quantite: 1 });
//         }
//         return acc;
//     }, []);

//     return (
//         <div className="container mt-5">
//             <h1 id="title" className="mb-4">Panier</h1>
//             <div className="row">
//                 {/* Colonne 1 : Articles */}
//                 <div className="col-lg-8">
//                     {articlesRegroupés.length === 0 ? (
//                         <p>Le panier est vide.</p>
//                     ) : (
//                         articlesRegroupés.map((article, index) => (
//                             <div className="card mb-3" key={index} id="cardPanier">
//                                 <div className="row g-0">
//                                     <div className="col-md-4">
//                                         <img
//                                             src={article.image_url}
//                                             className="img-fluid rounded-start"
//                                             alt="produit"
//                                         />
//                                     </div>
//                                     <div className="col-md-8">
//                                         <div className="card-body">
//                                             <h5 className="card-title">Nom : {article.title}</h5>
//                                             <p className="card-text">Description : {article.description}</p>
//                                             <h5 className="card-text">Prix : {article.price} Dhs</h5>
//                                             <div className="d-flex justify-content-between align-items-center mt-3">
//                                                 <p className="mb-0">Quantité : {article.quantite}</p>
//                                                 <AiFillDelete
//                                                     className="fs-4 text-danger"
//                                                     onClick={() => dispatch(supprimerDuPanier(article.id))}
//                                                     style={{ cursor: "pointer" }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 {/* Colonne 2 : Résumé panier */}
//                 <div className="col-lg-4">
//                     <div className="card p-4 shadow-sm">
//                         <h4 className="mb-3">Résumé du panier</h4>
//                         <p className="mb-1">Sous-total : <strong>{totalprix} Dhs</strong></p>
//                         <p className="mb-1">Livraison : <strong>20.00 Dhs</strong></p>
//                         <hr />
//                         <h5>Total : <strong>{(totalprix + 20).toFixed(2)} Dhs</strong></h5>
//                         <button className="btn btn-success mt-3 w-100">Payer maintenant</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Panier;










import { useSelector } from "react-redux";

import Header from "../Layout/Header";
import "../Style/Panier.css";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { supprimerDuPanier } from "../../redux_panier/PanierSlice";
const Panier = () => {
    const dispatch = useDispatch();
    const panier = useSelector((state) => state.panier.panier);
    // console.log(panier);
    const totalprix = useSelector((state) => state.panier.total);
    // Regrouper les articles
    const articlesRegroupés = panier.reduce((acc, article) => {
        const trouvé = acc.find((item) => item.id === article.id);
        if (trouvé) {
            trouvé.quantite += 1;
        } else {
            acc.push({ ...article, quantite: 1 });
        }
        return acc;
    }, []);

    return (
        <div className="w-90 px-4 py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" , marginLeft : "20px" }}>
        <h1 className="mb-5 text-center fw-bold">Mon Panier</h1>
        <div className="row mt-4">
            {/* Colonne gauche : articles */}
            <div className="col-lg-8 mt-4">
                {articlesRegroupés.length === 0 ? (
                    <p>Le panier est vide.</p>
                ) : (
                    articlesRegroupés.map((article, index) => (
                        <div
                            className="card mb-4 shadow-sm border-0"
                            key={index}
                            style={{ borderRadius: "16px" }}
                        >
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src={article.image_url}
                                        className="img-fluid rounded-start"
                                        alt="produit"
                                        style={{ borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px" }}
                                    />
                                </div>
                                <div className="col-md-8 d-flex align-items-center">
                                    <div className="card-body">
                                        <h5 className="card-title mb-2 fw-semibold">{article.title}</h5>
                                        <p className="card-text text-muted">{article.description}</p>
                                        <h5 className="text-primary">Prix : {article.price} Dhs</h5>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span className="text-secondary">Quantité : {article.quantite}</span>
                                            <AiFillDelete
                                                className="fs-4 text-danger"
                                                onClick={() => dispatch(supprimerDuPanier(article.id))}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Colonne droite : résumé */}
            <div className="col-lg-4 d-flex justify-content-center mt-4">
            <div
    className="card shadow-lg p-4 w-75"
    style={{
        position: "sticky",
        top: "28px", // Elle suit l’utilisateur lors du scroll
        alignSelf: "start", // Bien alignée en haut de sa colonne
        borderRadius: "10px",
        backgroundColor: "#ffffff"
    }}
>

                    <h4 className="mb-4 text-center fw-bold">Résumé de la commande</h4>
                    <div className="mb-3 mt-3">
                        <div className="d-flex justify-content-between">
                            <span className="text-muted">Sous-total :</span>
                            <span className="fw-semibold">{totalprix} Dhs</span>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <span className="text-muted">Frais de livraison :</span>
                            <span className="fw-semibold">20.00 Dhs</span>
                        </div>
                        <hr className="my-3" />
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">Total :</span>
                            <span className="fw-bold text-success">
                                {(totalprix + 20).toFixed(2)} Dhs
                            </span>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-lg w-100 mt-3" style={{ borderRadius: "10px" }}>
                        Payer maintenant
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Panier;
