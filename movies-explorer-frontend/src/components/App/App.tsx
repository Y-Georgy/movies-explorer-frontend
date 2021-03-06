import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import NavAuth from '../NavAuth/NavAuth';
import Navigation from '../Navigation/Navigation';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { mainApi } from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export interface IDataLogin { email: string, password: string }

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({})
  const [errorLoginMessage, setErrorLoginMessage] = useState<string>('')
  const [loggedIn, setLoggedIn] = useState<boolean>(true)
  const [isLoginFormDisabled, setIsLoginFormDisabled] = useState<boolean>(false)

  const contextValue = { currentUser, setCurrentUser }

  function handleSubmitLogin({ email, password }: IDataLogin) {
    setErrorLoginMessage('')
    setIsLoginFormDisabled(true)
    mainApi.login({ email, password })
    .then(res => {
      checkUserToken();
      setLoggedIn(true);
      navigate('/movies');
    })
    .catch(err => {
      setErrorLoginMessage(err)
    })
    .finally(() => setIsLoginFormDisabled(false))
  }

  function checkUserToken() {
    mainApi.getProfile()
      .then(res => {
        setLoggedIn(true)
        setCurrentUser(res.data)
      })
      .catch(err => {
        setLoggedIn(false)
        setCurrentUser({})
      })
  }

  // ПРОВЕРКА ПОЛЬЗОВАТЕЛЯ ПРИ ВХОДЕ
  useEffect(() => {
    checkUserToken();
  },[])

  return (
    <>
      <CurrentUserContext.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={
            <>
              <Header
                children={loggedIn ? <Navigation /> : <NavAuth />}
                bgcolor="blue"
              />
              <Main />
              <Footer />
            </>
          } />
          <Route
            path="/movies"
            element={<ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
            />}
          />
          <Route
            path="/saved-movies"
            element={<ProtectedRoute
              loggedIn={loggedIn}
              component={SavedMovies}
            />}
          />
          <Route path="/signup" element={<Register onSubmit={handleSubmitLogin} errorLoginMessage={errorLoginMessage}/>} />
          <Route path="/signin" element={<Login onSubmit={handleSubmitLogin} errorLoginMessage={errorLoginMessage} isFormDisabled={isLoginFormDisabled} />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
