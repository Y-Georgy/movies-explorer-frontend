import './Header.css'
import logo from '../../images/logo.svg'
// import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Movies-explorer" className="header__logo" />
      <nav className="header__links">
        <div className="header__link-register">
          Регистрация
        </div>
        <div className="header__link-login">
          Войти
        </div>
      </nav>


    </header>
  )
}

export default Header
