import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { UserFormValidator } from '../UserFormValidator/UserFormValidator';
import { useEffect, useState } from 'react';
import { IDataLogin } from '../App/App'
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

interface Props {
  onSubmit: ( dataLogin: IDataLogin ) => void,
  errorLoginMessage: string,
  isFormDisabled: boolean
}

function Login( { onSubmit, errorLoginMessage, isFormDisabled }: Props) {
  const navigate = useNavigate();
  const { currentUser } = React.useContext(CurrentUserContext)
  const { values, validators, handleChange, isValidForm } = UserFormValidator()
  const [errorLogin, setErrorLogin] = useState<string>('')

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit({
      email: values.email,
      password: values.password
    })
  }

  useEffect(() => {
    setErrorLogin(errorLoginMessage)
  }, [errorLoginMessage])


  useEffect(() => {
    setErrorLogin('')
  }, [values])

  useEffect(() => {
    Object.keys(currentUser).length !== 0 && navigate('/profile')
  }, [currentUser, navigate])

  return (
      <main className="login">
        <Link to="/" className="login__link-logo">
          <img src={logo} alt="Логотип Movies-explorer" className="logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="form-user" name="form-login" onSubmit={handleSubmit} noValidate>

          <label htmlFor="email" className="form-user__label">E-mail</label>
          <input
            id="email"
            type="email"
            className="form-user__input"
            name="email"
            placeholder="Введите имя"
            onChange={handleChange}
            disabled={isFormDisabled}
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
            disabled={isFormDisabled}
          />
          <span className="form-user__error password-input-error">
            {!validators.isValidPassword && 'Пароль должен содержать минимум 8 знаков'}
          </span>

          <span className="form-user__error form-user__submit-error  form-user__submit-error_margin_top">
            {errorLogin}
          </span>
          <button
            type="submit"
            className="form-user__submit-button"
            disabled={!isValidForm(['email', 'password']) || isFormDisabled}
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
