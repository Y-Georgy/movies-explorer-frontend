import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__overlay">
        <figcaption className="footer__figcaption">© 2021</figcaption>
        <ul className="footer__links-list">
          <li className="footer__link-elem">
            <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-elem">
            <a href="https://github.com/Y-Georgy" target="_blank" rel="noreferrer" className="footer__link">
              Github
            </a>
          </li>
          <li className="footer__link-elem">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="footer__link">
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
