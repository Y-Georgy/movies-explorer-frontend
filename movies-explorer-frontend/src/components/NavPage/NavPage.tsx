import './NavPage.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const NavPage: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  function handleClickOpenMenu() {
    setIsOpenMenu(true);
  }

  function handleClickCloseMenu() {
    setIsOpenMenu(false);
  }

    return (
      <nav className="nav-page">
        <button className="nav-page__icon-burger" onClick={handleClickOpenMenu}/>
        <div className={`nav-page__overlay${isOpenMenu ? ' nav-page__overlay_display_flex' : '' }`}>
          <div className="nav-page__container">
            <button className="nav-page__icon-close" onClick={handleClickCloseMenu}/>
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
