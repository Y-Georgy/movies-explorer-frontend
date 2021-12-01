import './Profile.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import Header from '../Header/Header';
import NavPage from '../NavPage/NavPage';

function Profile() {
  return (
    <>
      <Header children={<NavPage />} bgcolor="grey"/>
      <main className="login">
        <Link to="/" className="login__link-logo">
          <img src={logo} alt="Логотип Movies-explorer" className="logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="form-user" name="form-login">

          <label htmlFor="email" className="form-user__label">E-mail</label>
          <input required id="email" type="email" className="form-user__input" name="email" />
          <span className="form-user__error email-input-error"></span>

          <label htmlFor="password" className="form-user__label">Пароль</label>
          <input required id="password" type="password" className="form-user__input" name="password" />
          <span className="form-user__error password-input-error"></span>

          <button type="submit" className="form-user__submit-button form-user__submit-button_margin_top">Войти</button>
        </form>
        <p className="login__text">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login__link">Регистрация</Link>
        </p>
      </main>
    </>
  )
}

export default Profile;
