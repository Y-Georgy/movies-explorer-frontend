import './NavPage.css'
import React from 'react'
import { Link } from 'react-router-dom';

const NavPage: React.FC = () => {
    return (
      <nav className="nav-page">
        <Link to="/movies" className="nav-page__link nav-page__link_bold">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="nav-page__link">
          Сохранённые фильмы
        </Link>
        <Link to="/profile" className="nav-page__btn-account">
          Аккаунт
        </Link>
      </nav>
    )
}

export default NavPage;
