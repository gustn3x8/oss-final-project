import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const USER_API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/users';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', name: '', email: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.name) return alert("필수 입력 항목이 비어있습니다.");
    try {
      const res = await axios.get(USER_API_URL);
      if (res.data.some(u => u.username === form.username)) return alert("이미 존재하는 아이디입니다.");
      await axios.post(USER_API_URL, form);
      alert("가입 성공! 로그인해주세요.");
      navigate('/login');
    } catch (error) { alert("오류 발생"); }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
      <div className="custom-card p-4 p-md-5 shadow" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 className="text-center mb-4 fw-bold">Create Account 🚀</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3"><input name="username" className="form-control-custom" placeholder="ID" onChange={e => setForm({...form, username: e.target.value})} /></div>
          <div className="mb-3"><input name="password" type="password" className="form-control-custom" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} /></div>
          <div className="mb-3"><input name="name" className="form-control-custom" placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div className="mb-4"><input name="email" className="form-control-custom" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} /></div>
          <button className="btn-custom w-100 mb-3">Sign Up</button>
        </form>
        <div className="text-center"><Link to="/login" className="fw-bold text-primary text-decoration-none">Login</Link></div>
      </div>
    </div>
  );
};
export default Register;