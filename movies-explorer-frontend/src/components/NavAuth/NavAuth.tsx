import './NavAuth.css'

const NavAuth = (): JSX.Element => {
    return (
      <nav className="header__links">
        <div className="header__link-register">
          Регистрация
        </div>
        <div className="header__link-login">
          Войти
        </div>
      </nav>
    )
}

export default NavAuth;
