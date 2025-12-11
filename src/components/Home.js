import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaFire, FaClock } from 'react-icons/fa';

const API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/exercises';

const Home = () => {
  const [stats, setStats] = useState({ count: 0, calories: 0, duration: 0 });
  const [recentLogs, setRecentLogs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { name: '회원', username: '' };

  useEffect(() => {
    axios.get(API_URL).then(res => {
      const data = res.data;
      const myData = data.filter(item => item.username === user.username);

      setStats({
        count: myData.length,
        calories: myData.reduce((acc, cur) => acc + Number(cur.calories), 0),
        duration: myData.reduce((acc, cur) => acc + Number(cur.duration), 0)
      });
      setRecentLogs(myData.slice(-5).reverse());
    });
  }, [user.username]);

  return (
    <div className="container">
      <div className="mb-5"><h2 className="fw-bold">Hello, {user.name}! 👋</h2></div>
      <div className="row mb-4">
        <div className="col-md-4"><div className="custom-card d-flex align-items-center"><div className="icon-box icon-purple me-3"><FaDumbbell/></div><div><div className="text-muted small">Total Workout</div><h3 className="fw-bold mb-0">{stats.count}회</h3></div></div></div>
        <div className="col-md-4"><div className="custom-card d-flex align-items-center"><div className="icon-box icon-green me-3"><FaFire/></div><div><div className="text-muted small">Calories</div><h3 className="fw-bold mb-0">{stats.calories} kcal</h3></div></div></div>
        <div className="col-md-4"><div className="custom-card d-flex align-items-center"><div className="icon-box icon-blue me-3"><FaClock/></div><div><div className="text-muted small">Time</div><h3 className="fw-bold mb-0">{stats.duration}분</h3></div></div></div>
      </div>
      <div className="custom-card">
        <div className="table-responsive">
          <table className="table table-custom">
            <thead><tr><th>Date</th><th>Exercise</th><th>Sets</th><th>Kcal</th></tr></thead>
            <tbody>{recentLogs.map(log => <tr key={log.id}><td>{log.date}</td><td className="fw-bold">{log.exercise_type}</td><td>{log.sets} set</td><td>{log.calories} kcal</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Home;