// import PersonIcon from '@mui/icons-material/Person';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import ContrastIcon from '@mui/icons-material/Contrast';
// import { FiMenu, FiX } from "react-icons/fi";
// import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Link} from 'react-router-dom';

import { useState } from "react";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaShoppingCart } from 'react-icons/fa';

import "../Style/Header.css";
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    //   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    //   const toggleMobileMenu = () => {
    //     setMobileMenuOpen(!isMobileMenuOpen);
    //   };

    //   const [menuVisible, setMenuVisible] = useState(false);

    // const toggleMenu = () => {
    //   setMenuVisible(!menuVisible);
    // };
    return (
        <>

<div className="container">
    {/* Conteneur principal pour aligner les éléments */}
    <div className="header-content">
      {/* Logo à gauche */}
      <div className="logo">
        <img src="./assets/Logo.png" alt="Logo" />
      </div>

      {/* Icônes à droite */}
      <div className="icon-container">
        {/* <PersonIcon className="icon" />
        <PersonAddAltIcon className="icon" /> */}
        <div style={styles.panier}>
              {/* -------------  -----------------    ---------     -----                        */}
        <Link to='/panier'><FaShoppingCart className='icon' style={styles.iconePanier} /></Link>
        {/* {nbArticles > 0 && ( */}
          <div style={styles.badge}>
             <span style={styles.badgeTexte}>0</span> {/* {nbArticles} */}
          </div>
        {/* )} */}
      </div>
        <MdOutlineDarkMode className="icon"  />
      </div>
    </div>
  </div>
<hr/>
              {/* ---------------------------------------------------- */}
            <header className="header">
                
                <div
                    className="header-row container"
                    role="navigation"
                    aria-label="Main"
                >
                    <div className="header-left">
                        <div className="logo">
                            <h1 className='store'>Viora<span style={{color : "blue"}}>Luxe.</span></h1>
                        </div>
                    </div>
                    <div className="header-right">
                        <ul className="main-menu">
                            <li className="menu-item">
                                <Link to="/" className="active">
                                    Home
                                </Link>
                            </li>

                            <li className="menu-item mega-menu">
                                <Link to="/products">categories +</Link>
                                <div className="mega-menu-wrapper slideInUp">
                                    <div className="mega-menu-col">
                                        <h5>Mode et vêtements</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <Link to="/products/homme">
                                                Hommes
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/femme">
                                                femmes
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products/enfants">
                                                enfants
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="chaussures">
                                                chaussures
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#">
                                                accessoires de mode
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Électronique</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Smartphones
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                ordinateurs
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Téléviseurs 4K
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                accessoires électroniques
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Appareils photo numériques
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Maison et Cuisine</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Meubles (Tables, Canapés)
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Électroménager
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Linge de maison
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Décoration intérieure
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Ustensiles de cuisine
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Beauté et Santé</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Maquillage
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Parfums
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Soins capillaires
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Accessoires de beauté
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Produits de bien-être
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li className="menu-item dropdown">
                                <a href="#">Services +</a>
                                <div className="sub-menu-wrapper slideInUp">
                                    <ul className="sub-menu">
                                        <li className="menu-item">
                                            <a href="#">Support technique</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">Service 2</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">Service 3</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">Service 4</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="menu-item">
                                <a href="#">Blog</a>
                            </li>
                            <li className="menu-item">
                                <a href="#">Connexion</a>
                            </li>
                        </ul>
                        <a
                            href="#"
                            id="hamburger-icon"
                            className="mobile-toggler"
                            aria-label="Mobile Menu"
                            onClick={toggleMenu}
                        >
                            <i
                                className={`fas ${
                                    isMenuOpen ? "fa-times" : "fa-bars"
                                }`}
                            ></i>
                        </a>
                    </div>

                    {/* <!-- Mobile menu --> */}
                    <div
                        id="mobile-menu"
                        className={`mobile-menu ${isMenuOpen ? "" : "hidden"}`}
                    >
                        <ul>
                            <li className="menu-item">
                                <a href="#" className="active">
                                    Home
                                </a>
                            </li>

                            <li className="menu-item mega-menu">
                                <a href="#">categories +</a>
                                <div className="mega-menu-wrapper">
                                    <div className="mega-menu-col">
                                        <h5>Mode et vêtements</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Hommes
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                femmes
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                enfants
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                chaussures
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                accessoires de mode
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Électronique</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Smartphones
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                ordinateurs
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Téléviseurs 4K
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                accessoires électroniques
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Appareils photo numériques
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Maison et Cuisine</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Meubles (Tables, Canapés)
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Électroménager
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Linge de maison
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Décoration intérieure
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Ustensiles de cuisine
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-col">
                                        <h5>Beauté et Santé</h5>
                                        <ul className="mega-sub-menu">
                                            <li>
                                                <a href="#">
                                                Maquillage
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Parfums
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Accessoires de beauté
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Soins capillaires
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                Produits de bien-être
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li className="menu-item dropdown">
                                <a href="#">Services +</a>
                                <div className="sub-menu-wrapper">
                                    <ul className="sub-menu">
                                        <li className="menu-item">
                                            <a href="#">Support technique</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">FAQ</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">Service 3</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#">Service 4</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="menu-item">
                                <a href="#">Blog</a>
                            </li>
                            <li className="menu-item">
                                <Link  to="/Connexion">Connexion</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;


// Styles pour l'exemple
const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "50px",
    },
    boutonAjouter: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "20px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
    },
    panier: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      fontSize: "25px",
      color: "#333",
    },
    iconePanier: {
      marginRight: "10px",
    },
    badge: {
      position: "absolute",
      top: "-5px",
      right: "-10px",
      backgroundColor: "#f44336", // Couleur du badge
      color: "#fff",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "10px", // Taille du texte
      fontWeight: "bold",
    },
    badgeTexte: {
      position: "relative",
      top: "-0.5px",
    //   padding : "4px"
    },
  };
  
  