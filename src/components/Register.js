import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// ★ 본인의 MockAPI 주소 (users 리소스)
const USER_API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/users';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.name) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(USER_API_URL);
      const existingUsers = response.data;
      
      const isDuplicate = existingUsers.some(u => u.username === formData.username);
      
      if (isDuplicate) {
        alert("이미 존재하는 아이디입니다.");
        return;
      }

      await axios.post(USER_API_URL, formData);
      alert("가입 성공! 🎉 로그인해주세요.");
      navigate('/login');

    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
      {/* 모바일 대응: 너비 100%, 최대 너비 450px */}
      <div className="custom-card p-4 p-md-5 shadow" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 className="text-center mb-2 fw-bold">Create Account 🚀</h2>
        <p className="text-center text-muted mb-4">운동 여정을 시작해보세요.</p>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input type="text" name="username" className="form-control-custom" value={formData.username} onChange={handleChange} placeholder="Username" />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control-custom" value={formData.password} onChange={handleChange} placeholder="Password" />
          </div>
          <div className="mb-3">
            <input type="text" name="name" className="form-control-custom" value={formData.name} onChange={handleChange} placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <input type="email" name="email" className="form-control-custom" value={formData.email} onChange={handleChange} placeholder="Email (Optional)" />
          </div>
          
          <button type="submit" className="btn-custom w-100 mb-3">Sign Up</button>
        </form>

        <div className="text-center">
          <span className="text-muted small">이미 계정이 있으신가요? </span>
          <Link to="/login" className="text-decoration-none fw-bold text-primary">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;