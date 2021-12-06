import './Register.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'

function Register() {
  return (
      <main className="register">
        <Link to="/" className="register__link-logo">
          <img src={logo} alt="Логотип Movies-explorer" className="logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="form-user" name="form-register">
          <label htmlFor="name" className="form-user__label">Имя</label>
          <input required id="name" type="text" className="form-user__input" name="name" minLength={2} maxLength={30} placeholder="Введите имя" />
          <span className="form-user__error name-input-error"></span>

          <label htmlFor="email" className="form-user__label">E-mail</label>
          <input required id="email" type="email" className="form-user__input" name="email" placeholder="Введите e-mail" />
          <span className="form-user__error email-input-error"></span>

          <label htmlFor="password" className="form-user__label">Пароль</label>
          <input required id="password" type="password" className="form-user__input" name="password" minLength={8} placeholder="Введите пароль" />
          <span className="form-user__error password-input-error"></span>

          <button type="submit" className="form-user__submit-button">Зарегистрироваться</button>
        </form>
        <p className="register__text">
          Уже зарегистрированы?
          <Link to="/signin" className="register__link">Войти</Link>
        </p>
      </main>
  )
}

export default Register;
