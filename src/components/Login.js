import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const USER_API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/users';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(USER_API_URL);
      const user = response.data.find(u => u.username === formData.username.trim() && String(u.password) === formData.password.trim());
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        navigate('/'); 
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) { alert("서버 연결 실패"); }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
      <div className="custom-card p-4 p-md-5 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-2 fw-bold" style={{color:'#333'}}>Welcome to FitLog!</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3"><input type="text" name="username" className="form-control-custom" placeholder="ID" onChange={e => setFormData({...formData, username: e.target.value})} /></div>
          <div className="mb-4"><input type="password" name="password" className="form-control-custom" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} /></div>
          <button type="submit" className="btn-custom w-100 mb-3">Login</button>
        </form>
        <div className="text-center"><Link to="/register" className="fw-bold text-primary text-decoration-none">Sign Up</Link></div>
      </div>
    </div>
  );
};
export default Login;