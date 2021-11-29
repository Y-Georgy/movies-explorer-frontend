import './NavPage.css'
import React from 'react'
import { Link } from 'react-router-dom';

const NavPage: React.FC = () => {
    return (
      <nav className="nav-page">
        <button className="nav-page__icon-burger" />
        <div className="nav-page__overlay">
          <div className="nav-page__container">
            <button className="nav-page__icon-close" />
            <Link to="/" className="nav-page__link">
              Главная
            </Link>
            <Link to="/movies" className="nav-page__link nav-page__link_active">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="nav-page__link">
              Сохранённые фильмы
            </Link>
            <Link to="/profile" className="nav-page__btn-account">
              Аккаунт
            </Link>
          </div>
        </div>
      </nav>
    )
}

export default NavPage;
