import './Profile.css'
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { UserFormValidator } from '../UserFormValidator/UserFormValidator';
import { useNavigate } from 'react-router-dom';

interface Props {
  setLoggedIn: (value: boolean) => void
}

function Profile( {setLoggedIn }: Props ) {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext)
  const { values, setValues, validators, handleChange, isValidForm } = UserFormValidator()
  const [errorSubmitEditPrifile, setErrorSubmitEditPrifile] = useState<String>('')
  const [seccessMessageSubmit, setSeccessMessageSubmit] = useState<String>('')
  const navigate = useNavigate();

  useEffect(() => {
    setValues({ ...values, name: currentUser.name, email: currentUser.email })
  }, [])

  function handleSubmitEditProfile(evt: any) {
    evt.preventDefault();
    setErrorSubmitEditPrifile('')
    const userData = {
      name: values.name,
      email: values.email
    }
    mainApi.updateProfile( userData )
      .then(res => {
        setCurrentUser(res.data)
        setSeccessMessageSubmit('Профиль успешно изменён')
        setTimeout(() => {setSeccessMessageSubmit('')}, 3000)
      })
      .catch(err => {
        setErrorSubmitEditPrifile(err)
      })
  }

  function handleSignOut() {
    mainApi.signOut()
      .then(res => {
        setLoggedIn(false)
        setCurrentUser({})
        navigate('/')
      })
      .catch(console.log)
  }

  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
         <form className="form-profile" name="form-profile" onSubmit={handleSubmitEditProfile} noValidate>
          <label className="form-profile__label">
            Имя
            <input
              type="text"
              className="form-profile__input"
              name="name"
              placeholder="Ваше имя"
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

          <span className="form-profile__error">{errorSubmitEditPrifile && errorSubmitEditPrifile}</span>
          <span className="form-profile__success-message">{seccessMessageSubmit && seccessMessageSubmit}</span>
          <button
            type="submit"
            className="form-profile__submit-button"
            disabled={!isValidForm() || values.name === '' || values.email === '' || (values.name === currentUser.name && values.email === currentUser.email )}
          >
            Сохранить
          </button>
        </form>
        <button type="button" className="profile__logout-button" onClick={handleSignOut}>Выйти из аккаунта</button>
      </main>
    </>
  )
}

export default Profile;
