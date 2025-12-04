import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// ★ 스타일뿐만 아니라 JS 기능도 불러와야 모바일 메뉴가 동작합니다.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 👈 이 줄 추가!
import 'react-calendar/dist/Calendar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);