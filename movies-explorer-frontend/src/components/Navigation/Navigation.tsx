import './Navigation.css'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navigation: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  function handleClickOpenMenu() {
    setIsOpenMenu(true);
  }

  function handleClickCloseMenu() {
    setIsOpenMenu(false);
  }

  return (
    <nav className="navigation">
      <button className="navigation__icon-burger" onClick={handleClickOpenMenu}/>
      <div className={`navigation__overlay${isOpenMenu ? ' navigation__overlay_display_flex' : '' }`}>
        <div className="navigation__container">
          <button className="navigation__icon-close" onClick={handleClickCloseMenu}/>
          <NavLink to="/" className={({ isActive }) => (`navigation__link ${isActive && 'navigation__link_active'}`)}>
            Главная
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => (`navigation__link ${isActive && 'navigation__link_active'}`)}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={({ isActive }) => (`navigation__link ${isActive && 'navigation__link_active'}`)}>
            Сохранённые фильмы
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (`navigation__btn-account ${isActive && 'navigation__link_active'}`)}>
            Аккаунт
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
