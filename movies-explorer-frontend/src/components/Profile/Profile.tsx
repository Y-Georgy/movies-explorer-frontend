import './Profile.css'
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function Profile() {
  return (
    <>
      <Header children={<Navigation />} bgcolor="grey"/>
      <main className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
         <form className="form-profile" name="form-profile">
          <label className="form-profile__label">
            Имя
            <input type="text" className="form-profile__input" name="name" value="Виталий" />
          </label>

          <label className="form-profile__label">
            E-mail
            <input type="email" className="form-profile__input" name="email" value="pochta@yandex.ru" />
          </label>

          <span className="form-profile__error">При обновлении профиля произошла ошибка.</span>
          <button type="submit" className="form-profile__submit-button">Редактировать</button>
        </form>
        <button type="button" className="profile__logout-button">Выйти из аккаунта</button>
      </main>
    </>
  )
}

export default Profile;
