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

    const [products, setProducts] = useState([
        {
            id: 1,
            title: 'ASUS TUF FX505DT Gaming Laptop- 15.6", 120Hz Full HD, AMD Ryzen 5 R5-3550H Processor, GeForce GTX 1650 Graphics, 8GB DDR4, 256GB PCIe SSD, RGB Keyboard, Windows 10 64-bit - FX505DT-AH51',
            price: "1.245$",
            image: "https://m.media-amazon.com/images/I/81gK08T6tYL._AC_SL1500_.jpg",
            link: "https://amzn.to/3qeS1Fe",
            brand: "asus",
        },
        {
            id: 2,
            title: 'Razer Blade 15 Base Gaming Laptop 2020: Intel Core i7-10750H 6-Core, NVIDIA GeForce GTX 1660 Ti, 15.6" FHD 1080p 120Hz, 16GB RAM, 256GB SSD, CNC Aluminum, Chroma RGB Lighting, Black',
            price: "2.345$",
            image: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_SL1500_.jpg",
            link: "https://amzn.to/42dsdGC",
            brand: "razer",
        },
        {
            id: 3,
            title: 'Lenovo Legion 5 Gaming Laptop, 15.6" FHD (1920x1080) IPS Screen, AMD Ryzen 7 4800H Processor, 16GB DDR4, 512GB SSD, NVIDIA GTX 1660Ti, Windows 10, 82B1000AUS, Phantom Black',
            price: "1.020$",
            image: "https://m.media-amazon.com/images/I/81w+3k4U8PL._AC_SL1500_.jpg",
            link: "https://amzn.to/3os2Nrc",
            brand: "lenovo",
        },
        {
            id: 4,
            title: 'MSI GL66 Gaming Laptop: 15.6" 144Hz FHD 1080p Display, Intel Core i7-11800H, NVIDIA GeForce RTX 3070, 16GB, 512GB SSD, Win10, Black (11UGK-001)',
            price: "2.245$",
            image: "https://m.media-amazon.com/images/I/61Ze2wc9nyS._AC_SL1500_.jpg",
            link: "https://amzn.to/43tMNDW",
            brand: "msi",
        },
    ]);



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
