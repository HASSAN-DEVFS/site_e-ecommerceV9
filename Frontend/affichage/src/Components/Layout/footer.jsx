import "../Style/footer.css";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
const footer = () => {
    return (
    <footer>
        <div className="footer">
            <div className="footer-column">
                <ul>
                <li><strong  style={{fontSize : "1rem"}}>Catégories des produits</strong></li>
                    <li><a href="">Home</a></li>
                    <li><a href="">Mode et vêtements</a></li>
                    <li><a href="">Électronique</a></li>
                    <li><a href="">Maison et Cuisine</a></li>
                    <li><a href="">Beauté et Santé</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <ul>
                    <li><strong style={{fontSize : "1rem"}}>Service Clients</strong></li>
                    <li><a href="">A propos de service</a></li>
                    <li><a href="">Politiques de retour</a></li>
                    <li><a href="">Nous contacter</a></li>
                    <li><a href="">FAQ</a></li>
                    <li><a href="">Urgent sur Whatssapp</a></li>
                </ul>
            </div>
            <div className="footer-column2">
                <h3>Découvrez une expérience unique et enrichissante <br/>sur notre site VioraLuxe. !</h3>
                <a href="">Découvrir là</a>
            </div>
        </div>
        <hr/>
        <div className=" footer-copyright">
       
    <ul className="liste-copyr">
        <li>VIORA LUXE</li>
        <li>
            <a href="https://www.linkedin.com/in/hassansebbani" 
      target="_blank" ><FaLinkedin className="linkedin-icon" /></a>
            <FaInstagram className="instagram-icon" />
            <a href="https://github.com/CyberFetch" 
      target="_blank" ><FaGithub className="github-icon" /></a>
        </li>
        <li className="copyright">Copyright © 2025</li>
    </ul>
</div>

    </footer>
    )
}

export default footer;