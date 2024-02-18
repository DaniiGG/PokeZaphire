import './css/footer.css';

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Enlaces útiles</h3>
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Acerca de nosotros</a></li>
              <li><a href="#">Servicios</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>Dirección: Calle Falsa #123, Ciudad Ficticia</p>
            <p>Teléfono: +1234567890</p>
            <p>Email: daniescomoli@gmail.com</p>
          </div>
          <div className="footer-section">
            <h3>Redes sociales</h3>
            <ul className="social-icons">
              <li><a href="#"><img src="../public/insta.png"/></a></li>
              <li><a href="#"><img src="../public/facebook.png"/></a></li>
              <li><a href="#"><img src="../public/twitter.png"/></a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Daniel Escobar. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  