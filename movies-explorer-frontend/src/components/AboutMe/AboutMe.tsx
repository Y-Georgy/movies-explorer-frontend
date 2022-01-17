import './AboutMe.css'
import avatar from '../../images/avatar.jpg'

function AboutMe() {
  return (
    <section className="about-me main__section" id="about-me">
      <h2 className="main__section-title">Студент</h2>
      <article className="about-me__article">
        <div className="about-me__overlay">
          <h3 className="about-me__title">Георгий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 38 лет</p>
          <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <div className="about-me__social-links">
            <a href="https://www.facebook.com/Dmitry.Medvedev/" className="about-me__social-link" target="_blank" rel="noreferrer">FaceBook</a>
            <a href="https://github.com/Y-Georgy" className="about-me__social-link" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
        <img src={avatar} alt="Фото автора" className="about-me__photo" />
      </article>
    </section>
  )
}

export default AboutMe
