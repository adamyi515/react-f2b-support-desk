import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Components
import Header from './components/header.component';


// Pages
import HomePage from './pages/home-page.component';
import LoginPage from './pages/login-page.component';
import RegisterPage from './pages/register-page.component';


function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
