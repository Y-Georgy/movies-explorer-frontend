import './Register.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import { UserFormValidator } from '../UserFormValidator/UserFormValidator';
import { useEffect } from 'react';

function Register() {
  const { values, isValidName, isValidEmail, isValidPassword, handleChange } = UserFormValidator()


  useEffect(() => {
    console.log('values', values);
  }, [values])

   return (
      <main className="register">
        <Link to="/" className="register__link-logo">
          <img src={logo} alt="Логотип Movies-explorer" className="logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="form-user" name="form-register" noValidate>
          <label htmlFor="name" className="form-user__label">Имя</label>
          <input
            required
            id="name"
            type="text"
            className="form-user__input"
            name="name"
            placeholder="Введите имя"
            onChange={handleChange}
          />
          <span className="form-user__error name-input-error">
            {(values.name && !isValidName(values.name)) && 'Имя может содержать только латиницу, кириллицу, пробел или дефис'}
          </span>

          <label htmlFor="email" className="form-user__label">E-mail</label>
          <input
            required
            id="email"
            type="email"
            className="form-user__input"
            name="email"
            placeholder="Введите e-mail"
            onChange={handleChange}
          />
          <span className="form-user__error email-input-error">
            {(values.email && !isValidEmail(values.email)) && 'Введён не корректный e-mail'}
          </span>

          <label htmlFor="password" className="form-user__label">Пароль</label>
          <input
            required
            id="password"
            type="password"
            className="form-user__input"
            name="password"
            placeholder="Введите пароль"
            onChange={handleChange}
            />
          <span className="form-user__error password-input-error">
            {(values.password && !isValidPassword(values.password)) && 'Пароль должен содержать минимум 8 знаков'}
          </span>

          <button
            type="submit"
            className="form-user__submit-button"
            // disabled={isValidName(values.name)}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="register__text">
          Уже зарегистрированы?
          <Link to="/signin" className="register__link">Войти</Link>
        </p>
      </main>
  )
}

export default Register;
