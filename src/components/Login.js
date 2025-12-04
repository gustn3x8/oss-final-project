import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// ★ 본인의 MockAPI 주소 (users 리소스)
const USER_API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/users';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(USER_API_URL);
      const users = response.data;

      const user = users.find(
        (u) => u.username === formData.username.trim() && String(u.password) === formData.password.trim()
      );

      if (user) {
        alert(`${user.name}님 환영합니다! 👋`);
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        navigate('/'); 
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버 연결에 실패했습니다.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
      {/* 모바일 대응: 너비 100%, 최대 너비 400px 제한 */}
      <div className="custom-card p-4 p-md-5 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-2 fw-bold" style={{ color: '#333' }}>Welcome Back! 👋</h2>
        <p className="text-center text-muted mb-4">로그인하고 운동을 기록하세요.</p>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input 
              type="text" name="username" 
              className="form-control-custom" 
              placeholder="Username" 
              value={formData.username} onChange={handleChange} 
            />
          </div>
          <div className="mb-4">
            <input 
              type="password" name="password" 
              className="form-control-custom" 
              placeholder="Password" 
              value={formData.password} onChange={handleChange} 
            />
          </div>
          <button type="submit" className="btn-custom w-100 mb-3">Login</button>
        </form>
        
        <div className="text-center">
          <span className="text-muted small">계정이 없으신가요? </span>
          <Link to="/register" className="text-decoration-none fw-bold text-primary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;