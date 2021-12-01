import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import NavAuth from '../NavAuth/NavAuth';
import Register from '../Register/Register';
import Login from '../Login/Login';
import './App.css';
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path="/movies" element={<Movies />} />
        <Route path="/" element={
          <>
            <Header children={<NavAuth />} bgcolor="blue" />
            <Main />
            <Footer />
          </>
        } />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
