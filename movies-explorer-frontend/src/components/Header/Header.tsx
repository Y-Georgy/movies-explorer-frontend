import './Header.css'
import logo from '../../images/logo.svg'

const Header = () => {
  return (
    <header className="header">
      <section className="header__container">
        <img src={logo} alt="Логотип Movies-explorer" className="header__logo" />
      </section>
    </header>
  )
}

export default Header
