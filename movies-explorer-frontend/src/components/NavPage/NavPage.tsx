import './NavPage.css'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

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
            <NavLink to="/" className={({ isActive }) => (`nav-page__link ${isActive && 'nav-page__link_active'}`)}>
              Главная
            </NavLink>
            <NavLink to="/movies" className={({ isActive }) => (`nav-page__link ${isActive && 'nav-page__link_active'}`)}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={({ isActive }) => (`nav-page__link ${isActive && 'nav-page__link_active'}`)}>
              Сохранённые фильмы
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (`nav-page__btn-account ${isActive && 'nav-page__link_active'}`)}>
              Аккаунт
            </NavLink>
          </div>
        </div>
      </nav>
    )
}

export default NavPage;
