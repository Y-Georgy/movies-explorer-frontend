import './Header.css'
import logo from '../../images/logo.svg'
// import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <section className="header__container">
        <img src={logo} alt="Логотип Movies-explorer" className="header__logo" />
        <nav className="header__links">
          <div className="header__link-register">
            Регистрация
          </div>
          <div className="header__link-login">
            Войти
          </div>
        </nav>
      </section>
    </header>
  )
}

export default Header
