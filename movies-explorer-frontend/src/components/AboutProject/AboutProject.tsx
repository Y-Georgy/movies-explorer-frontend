import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__articles">
        <article className="about-project__article">
          <h3 className="about-project__article-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__article-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="about-project__article">
          <h3 className="about-project__article-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__article-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about-project__figures">
        <figure className="about-project__figure">
          <p className="about-project__figure-text">1 неделя</p>
          <figcaption className="about-project__figcaption">Back-end</figcaption>
        </figure>
        <figure className="about-project__figure">
          <p className="about-project__figure-text about-project__figure-text_right">4 недели</p>
          <figcaption className="about-project__figcaption">Front-end</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default AboutProject
