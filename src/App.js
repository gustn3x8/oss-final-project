import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'; 

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ExerciseList from './components/ExerciseList';
import ExerciseCreate from './components/ExerciseCreate';
import ExerciseUpdate from './components/ExerciseUpdate';
import CalendarView from './components/CalendarView';
import Recommend from './components/Recommend';
import FacilitySearch from './components/FacilitySearch';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      window.location.href = '/'; 
    }
  };

  const handleClose = () => {
    const navMenu = document.getElementById('navbarNav');
    const btn = document.querySelector('.navbar-toggler');
    if (navMenu && navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
      if (btn) btn.classList.add('collapsed');
    }
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark navbar-custom mb-4">
            <div className="container">
              <Link className="navbar-brand fw-bold fs-4" to="/" onClick={handleClose}>
                FitLog
              </Link>
              
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto align-items-center">
                  <li className="nav-item"><Link className="nav-link mx-2" to="/" onClick={handleClose}>대시보드</Link></li>
                  <li className="nav-item"><Link className="nav-link mx-2" to="/search" onClick={handleClose}>시설찾기</Link></li>
                  <li className="nav-item"><Link className="nav-link mx-2" to="/list" onClick={handleClose}>기록목록</Link></li>
                  <li className="nav-item"><Link className="nav-link mx-2" to="/create" onClick={handleClose}>기록추가</Link></li>
                  <li className="nav-item"><Link className="nav-link mx-2" to="/calendar" onClick={handleClose}>캘린더</Link></li>
                  <li className="nav-item"><Link className="nav-link mx-2" to="/recommend" onClick={handleClose}>추천루틴</Link></li>
                  <li className="nav-item ms-3">
                    <button onClick={() => { handleLogout(); handleClose(); }} className="btn btn-light rounded-pill px-4 fw-bold text-primary shadow-sm">로그아웃</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container pb-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<ExerciseList />} />
              <Route path="/create" element={<ExerciseCreate />} />
              <Route path="/update/:id" element={<ExerciseUpdate />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/recommend" element={<Recommend />} />
              <Route path="/search" element={<FacilitySearch />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}
export default App;