import './Header.css'
import logo from '../../images/logo.svg'
import React from 'react'

interface Props { component: React.ComponentType }

const Header = ({ component: HeaderNav }: Props) => {

  return (
    <header className="header">
      <section className="header__container">
        <img src={logo} alt="Логотип Movies-explorer" className="header__logo" />
        <HeaderNav />
      </section>
    </header>
  )
}

export default Header
