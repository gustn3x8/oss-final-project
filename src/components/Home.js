import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaFire, FaClock, FaCalendarCheck } from 'react-icons/fa'; // 아이콘 추가

// ★ 본인의 API 주소 확인
const API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/exercises';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCount: 0, totalCalories: 0, totalDuration: 0 });
  const [recentLogs, setRecentLogs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { name: '회원' };

  useEffect(() => {
    // ... (fetchData 로직 기존과 동일하게 유지) 
    // (여기서는 지면 관계상 생략, 기존 코드 그대로 쓰세요)
    fetchData(); 
  }, []);
  
  // (fetchData 함수도 기존과 동일)
  const fetchData = async () => { /* ... */ setLoading(false); };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container">
      {/* 1. 인사말 영역 */}
      <div className="mb-5">
        <h2 className="fw-bold" style={{ color: '#333' }}>Hello, {user.name}! 👋</h2>
        <p className="text-muted">오늘도 득근할 준비 되셨나요?</p>
      </div>

      {/* 2. 통계 카드 (Soft UI 스타일) */}
      <div className="row mb-5">
        <div className="col-md-4">
          <div className="custom-card d-flex align-items-center">
            <div className="icon-box icon-purple me-3"><FaDumbbell /></div>
            <div>
              <div className="text-muted small">Total Workout</div>
              <h3 className="fw-bold mb-0">{stats.totalCount}회</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="custom-card d-flex align-items-center">
            <div className="icon-box icon-green me-3"><FaFire /></div>
            <div>
              <div className="text-muted small">Calories Burned</div>
              <h3 className="fw-bold mb-0">{stats.totalCalories.toLocaleString()} kcal</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="custom-card d-flex align-items-center">
            <div className="icon-box icon-blue me-3"><FaClock /></div>
            <div>
              <div className="text-muted small">Total Time</div>
              <h3 className="fw-bold mb-0">{stats.totalDuration}분</h3>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 최근 기록 테이블 (카드 안에 넣기) */}
      <div className="custom-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Recent Activity 📉</h5>
          <Link to="/list" className="text-decoration-none fw-bold text-primary">View All</Link>
        </div>
        
        <table className="table table-custom">
          <thead>
            <tr>
              <th>Date</th>
              <th>Exercise</th>
              <th>Part</th>
              <th>Sets</th>
              <th>Kcal</th>
            </tr>
          </thead>
          <tbody>
            {recentLogs.map((log) => (
              <tr key={log.id}>
                <td className="text-muted">{log.date}</td>
                <td className="fw-bold">{log.exercise_type}</td>
                <td><span className="badge-custom">{log.body_part}</span></td>
                <td>{log.sets} set</td>
                <td>{log.calories} kcal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;