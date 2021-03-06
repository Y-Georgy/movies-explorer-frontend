import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg'
import { UserFormValidator } from '../UserFormValidator/UserFormValidator';
import { mainApi } from '../../utils/MainApi';
import { useEffect, useState } from 'react';
import { IDataLogin } from '../App/App';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

interface Props {
  onSubmit: ( dataLogin: IDataLogin ) => void,
  errorLoginMessage: string,
}

function Register({ onSubmit, errorLoginMessage }: Props) {
  const navigate = useNavigate();
  const { currentUser } = React.useContext(CurrentUserContext)
  const { values, validators, handleChange, isValidForm } = UserFormValidator()
  const [errorRegister, setErrorRegister] = useState<string>('')
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false)

  function handleSubmit(e: any) {
    e.preventDefault()
    setIsFormDisabled(true)
    mainApi.register(values)
      .then((res) => {
        onSubmit({ email: values.email, password: values.password })
      })
      .catch((err) => {
        setErrorRegister(err);
      })
      .finally(() => setIsFormDisabled(false))
  }

  useEffect(() => {
    setErrorRegister(errorLoginMessage)
  }, [errorLoginMessage])

  useEffect(() => {
    setErrorRegister('')
  }, [values])

  useEffect(() => {
    Object.keys(currentUser).length !== 0 && navigate('/profile')
  }, [currentUser, navigate])

  return (
    <main className="register">
      <Link to="/" className="register__link-logo">
        <img src={logo} alt="Логотип Movies-explorer" className="logo" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="form-user" name="form-register" noValidate onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-user__label">Имя</label>
        <input
          required
          id="name"
          type="text"
          className="form-user__input"
          name="name"
          placeholder="Введите имя"
          onChange={handleChange}
          disabled={isFormDisabled}
        />
        <span className="form-user__error name-input-error">
          {!validators.isValidNameLength && 'Минимальная длина имени 2 знака, максимальная 30 знаков. '}
        </span>
        <span className="form-user__error name-input-error">
          {!validators.isValidName && 'Имя может содержать только латиницу, кириллицу, пробел или дефис.'}
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
          disabled={isFormDisabled}
        />
        <span className="form-user__error email-input-error">
          {!validators.isValidEmail && 'Введён не корректный e-mail'}
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
          disabled={isFormDisabled}
        />
        <span className="form-user__error password-input-error">
          {!validators.isValidPassword && 'Пароль должен содержать минимум 8 знаков'}
        </span>

        <span className="form-user__error form-user__submit-error">
          {errorRegister}
        </span>
        <button
          type="submit"
          className="form-user__submit-button"
          disabled={!isValidForm(['name', 'email', 'password']) || isFormDisabled}
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
