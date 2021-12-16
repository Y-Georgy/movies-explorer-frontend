import './Profile.css'
import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { UserFormValidator } from '../UserFormValidator/UserFormValidator';

function Profile() {
  const currentUser = React.useContext(CurrentUserContext)
  const { values, setValues, validators, handleChange, isValidForm } = UserFormValidator()

  useEffect(() => {
    setValues({ ...values, name: currentUser.name, email: currentUser.email })
  }, [])

  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
         <form className="form-profile" name="form-profile">
          <label className="form-profile__label">
            Имя
            <input
              type="text"
              className="form-profile__input"
              name="name"
              placeholder="Ваше имя"
              minLength={2}
              maxLength={30}
              value={values.name}
              onChange={handleChange}
            />
          </label>

          <label className="form-profile__label">
            E-mail
            <input
              type="email"
              className="form-profile__input"
              name="email"
              placeholder="Ваш e-mail"
              value={values.email}
              onChange={handleChange}
            />
          </label>
          <span className="form-profile__input-error">
            {!validators.isValidName && 'Имя может содержать только латиницу, кириллицу, пробел или дефис'}
          </span>
          <span className="form-profile__input-error">
            {!validators.isValidEmail && 'Введён не корректный e-mail'}
          </span>

          <span className="form-profile__error"></span>
          <button
            type="submit"
            className="form-profile__submit-button"
            disabled={!isValidForm() || values.name === '' || values.email === '' || (values.name === currentUser.name && values.email === currentUser.email )}
          >
            Редактировать
          </button>
        </form>
        <button type="button" className="profile__logout-button">Выйти из аккаунта</button>
      </main>
    </>
  )
}

export default Profile;
