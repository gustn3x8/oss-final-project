import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/exercises';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // 로그인 유저 정보

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(API_URL);
      // ★ 핵심: 내 아이디(username)와 같은 기록만 남기기 + 날짜 내림차순 정렬
      const myData = response.data.filter(item => item.username === user.username);
      const sortedData = myData.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setExercises(sortedData);
    } catch (error) {
      console.error("로딩 실패:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까? 🗑️")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setExercises(exercises.filter(ex => ex.id !== id));
      } catch (error) {
        alert("삭제 실패");
      }
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0">My Workout Logs 📋</h3>
          <p className="text-muted small mb-0">{user.name}님의 기록입니다.</p>
        </div>
        <Link to="/create" className="btn-custom text-decoration-none shadow-sm">+ New</Link>
      </div>

      <div className="custom-card">
        <div className="table-responsive">
          <table className="table table-custom table-hover">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>Date</th>
                <th style={{ width: '10%' }}>Part</th>
                <th style={{ width: '25%' }}>Exercise</th>
                <th style={{ width: '15%' }}>Sets</th>
                <th style={{ width: '15%' }}>Kcal</th>
                <th style={{ width: '20%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exercises.length > 0 ? (
                exercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td className="text-muted">{exercise.date}</td>
                    <td><span className="badge-custom">{exercise.body_part}</span></td>
                    <td className="fw-bold text-dark">{exercise.exercise_type}</td>
                    <td>{exercise.sets} set</td>
                    <td className="text-primary fw-bold">{exercise.calories} kcal</td>
                    <td>
                      <Link to={`/update/${exercise.id}`} className="btn btn-light btn-sm rounded-circle me-2 shadow-sm">✏️</Link>
                      <button onClick={() => handleDelete(exercise.id)} className="btn btn-light btn-sm rounded-circle text-danger shadow-sm">🗑️</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <p className="text-muted mb-0">아직 기록이 없습니다. 💪</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExerciseList;