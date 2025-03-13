import Header from "../Layout/Header";
import "../Style/Panier.css";
import { AiFillDelete } from "react-icons/ai";
const Panier = () => {
    return (
        <div>
            <div className="container mt-5">
                <h1 id="title">Panier</h1>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4" ></div>
                                    <img src="" className="img-fluid rounded-start" alt="image" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body"></div>
                                        <h5 className="card-title">Nom :</h5>
                                        <p className="card-text">description : </p>
                                        <h3 className="card-text">prix : </h3>
                                        <AiFillDelete /> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           
    )
}


export default Panier;