import './NavTab.css'

function NavTab() {
  return (
    <section className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__link"><a href="#about-project" className="nav-tab__anchor-link">О проекте</a></li>
        <li className="nav-tab__link"><a href="#techs" className="nav-tab__anchor-link">Технологии</a></li>
        <li className="nav-tab__link"><a href="#about-me" className="nav-tab__anchor-link">Студент</a></li>
      </ul>
    </section>
  )
}

export default NavTab
