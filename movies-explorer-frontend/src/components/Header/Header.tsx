import './Header.css'
import logo from '../../images/logo.svg'
import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode,
  bgcolor: 'grey' | 'blue'
}

const Header = ({ children, bgcolor }: Props) => {
  return (
    <header className={`header header_bgcolor_${bgcolor}`}>
      <section className="header__container">
        <Link to="/"><img src={logo} alt="Логотип Movies-explorer" className="logo" /></Link>
        {children}
      </section>
    </header>
  )
}

export default Header
