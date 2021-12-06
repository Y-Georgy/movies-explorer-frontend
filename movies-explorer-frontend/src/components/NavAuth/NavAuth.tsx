import './NavAuth.css'
import React from 'react'
import { Link } from 'react-router-dom';

const NavAuth: React.FC = () => {
  return (
    <nav className="nav-auth">
      <Link to="/signup" className="nav-auth__link-register">
        Регистрация
      </Link>
      <Link to="/signin" className="nav-auth__link-login">
        Войти
      </Link>
    </nav>
  )
}

export default NavAuth;
