import './Login.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { UserFormValidator } from '../UserFormValidator/UserFormValidator';

function Login() {
  const { values, validators, handleChange, isValidForm } = UserFormValidator()

  return (
      <main className="login">
        <Link to="/" className="login__link-logo">
          <img src={logo} alt="Логотип Movies-explorer" className="logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="form-user" name="form-login" noValidate>

          <label htmlFor="email" className="form-user__label">E-mail</label>
          <input
            id="email"
            type="email"
            className="form-user__input"
            name="email"
            placeholder="Введите имя"
            onChange={handleChange}
          />
          <span className="form-user__error email-input-error">
            {!validators.isValidEmail && 'Введён не корректный e-mail'}
          </span>

          <label htmlFor="password" className="form-user__label">Пароль</label>
          <input
            id="password"
            type="password"
            className="form-user__input"
            name="password"
            minLength={8}
            placeholder="Введите пароль"
            onChange={handleChange}
          />
          <span className="form-user__error password-input-error">
            {!validators.isValidPassword && 'Пароль должен содержать минимум 8 знаков'}
          </span>

          <button
            type="submit"
            className="form-user__submit-button form-user__submit-button_margin_top"
            disabled={!isValidForm() || values.email === '' || values.password === ''}
          >
            Войти
          </button>
        </form>
        <p className="login__text">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login__link">Регистрация</Link>
        </p>
      </main>
  )
}

export default Login;
