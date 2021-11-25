import './Portfolio.css'
import { Link } from 'react-router-dom'

function Portfolio() {
  return (
    <section className="portfolio main__section">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-elem">
          <a href="https://ya.ru" className="portfolio__link" target="_blank" rel="noreferrer">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-elem">
          <a href="https://ya.ru" className="portfolio__link" target="_blank" rel="noreferrer">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__list-elem">
          <a href="https://ya.ru" className="portfolio__link" target="_blank" rel="noreferrer">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section >
  )
}

export default Portfolio;
