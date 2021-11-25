import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import './App.css';
import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path="/movies" element={<Movies />} />
        <Route path="/" element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;
