import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'; // 디자인 파일

// 컴포넌트들
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ExerciseList from './components/ExerciseList';
import ExerciseCreate from './components/ExerciseCreate';
import ExerciseUpdate from './components/ExerciseUpdate';
import CalendarView from './components/CalendarView';
import Recommend from './components/Recommend';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      window.location.href = '/'; 
    }
  };

  // ★ [추가됨] 모바일 메뉴 닫기 함수
  const handleClose = () => {
    // 1. 네비게이션 메뉴 DOM을 찾습니다.
    const navMenu = document.getElementById('navbarNav');
    const btn = document.querySelector('.navbar-toggler');
    
    // 2. 메뉴가 열려있다면('show' 클래스가 있다면) 닫습니다.
    if (navMenu && navMenu.classList.contains('show')) {
      navMenu.classList.remove('show'); // 메뉴 닫기
      // 햄버거 버튼 상태도 '닫힘'으로 돌려놓기 (선택사항)
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
          <nav className="navbar navbar-expand-lg navbar-dark navbar-custom mb-5">
            <div className="container">
              {/* 로고를 눌러도 메뉴가 닫히게 설정 */}
              <Link className="navbar-brand fw-bold fs-4" to="/" onClick={handleClose}>
                💪 오운완 System
              </Link>
              
              <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto align-items-center">
                  <li className="nav-item">
                    {/* ★ 모든 Link에 onClick={handleClose} 추가 */}
                    <Link className="nav-link mx-2" to="/" onClick={handleClose}>대시보드</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/list" onClick={handleClose}>기록목록</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/create" onClick={handleClose}>기록추가</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/calendar" onClick={handleClose}>캘린더</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/recommend" onClick={handleClose}>추천루틴</Link>
                  </li>
                  <li className="nav-item ms-3">
                    <button 
                      onClick={() => { handleLogout(); handleClose(); }} 
                      className="btn btn-light rounded-pill px-4 fw-bold text-primary shadow-sm"
                    >
                      로그아웃
                    </button>
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
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;