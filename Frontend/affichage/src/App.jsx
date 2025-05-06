import { useState } from "react";
import Header from "./Components/Layout/Header";
import Accueil from "./Components/Pages/Accueil";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Layout/footer";
import Produits from "./Components/Pages/Produits";
import Panier from "./Components/Pages/Panier";
import Connexion from "./Components/Pages/Connexion";
const App = () => {
    const Brande = {
        adidas: "/assets/Branding/adidas.png",
        apple: "/assets/Branding/apple.png",
        asus: "/assets/Branding/asus.png",
        cat: "/assets/Branding/cat.png",
        hp: "/assets/Branding/hp.png",
        lg: "/assets/Branding/lg.png",
        nike: "/assets/Branding/nike.png",
        nivea: "/assets/Branding/nivea.png",
        Gucci: "/assets/Branding/Gucci.png",
        samsung: "/assets/Branding/samsung.png",
        Sony: "/assets/Branding/Sony.png",
        dior: "/assets/Branding/dior.png",
        philips: "/assets/Branding/philips.png",
        reebok: "/assets/Branding/reebok.png",
        chanel: "/assets/Branding/chanel.png",
        dhl: "/assets/Branding/dhl.png",
        canon: "/assets/Branding/canon.png",
        zara: "/assets/Branding/zara.png",
    };

    const cards = [
        {
            img: "/assets/img1.webp",
            title: "Vêtements Femme",
            link: "/products/vêtementsFemmes",
        },
        {
            img: "/assets/vetemntshomme.webp",
            title: "Vetements Homme",
            link: "/products/vetementsHommes",
        },
        {
            img: "/assets/chaussures.webp",
            title: "Chaussures",
            link: "/products/chaussures",
        },
        {
            img: "/assets/Electro1.webp",
            title: "Electronique",
            link: "/products/AccessoiresElectronique",
        },
        {
            img: "/assets/Maison_Cuisine.webp",
            title: "Accessoires Maison",
            link: "#",
        },
        {
            img: "/assets/Beaute.webp",
            title: "Beauté & Maquillage",
            link: "#",
        },
    ];

    const [products, setProducts] = useState([]);



    // Conversion de l'objet Brande en tableau d'images
    const brandImages = Object.values(Brande);
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Accueil brandImages={brandImages} cards={cards} products={products} setProducts={setProducts}/>
                    }
                />
                {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />  */}
                {/* <Route path="/products" element={<Produits />} /> */}
                <Route path="/panier" element={<Panier />} />
                <Route path="/products/:category?" element={<Produits />} />
                <Route path="/login" element={<Connexion/>}/>
            </Routes>
            <Footer />
        </>
    );
};

export default App;
