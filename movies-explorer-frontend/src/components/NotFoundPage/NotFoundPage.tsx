import './NotFoundPage.css'
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <div className="not-found-page__container">
        <p className="not-found-page__text">404</p>
        <h1 className="not-found-page__title">Страница не найдена</h1>
        <button className="not-found-page__button-back" onClick={() => navigate(-1)}>Назад</button>
      </div>
    </main>
  )
}

export default NotFoundPage;
