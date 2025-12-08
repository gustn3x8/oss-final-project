import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css'; // 기본 CSS
import '../App.css'; // ★ 커스텀 스타일 적용 (App.css)

// ★ 본인의 MockAPI 주소 (exercises 리소스)
const API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/exercises';

const CalendarView = () => {
  const [value, setValue] = useState(new Date());
  const [exercises, setExercises] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(API_URL).then(res => {
      // ★ 필터링: 내 기록만 캘린더에 저장
      const myData = res.data.filter(item => item.username === user.username);
      setExercises(myData);
    });
  }, [user.username]);

  const handleDateClick = (date) => {
    setValue(date);
    const dateString = date.toLocaleDateString('en-CA');
    const logs = exercises.filter(ex => ex.date === dateString);
    setSelectedLogs(logs);
  };

  // ★ 날짜 타일에 점 찍기 (디자인 수정됨)
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toLocaleDateString('en-CA');
      if (exercises.find(ex => ex.date === dateString)) {
        return (
          <div className="d-flex justify-content-center mt-1">
            {/* 눈에 잘 띄는 핑크색 점으로 변경 */}
            <div style={{ 
              width: '8px', 
              height: '8px', 
              backgroundColor: '#ff7675', /* Hot Pink 색상 */
              borderRadius: '50%' 
            }}></div>
          </div>
        );
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* 달력 영역 */}
        <div className="col-md-6 mb-4">
          <div className="custom-card h-100 p-4">
            <h3 className="fw-bold mb-4" style={{ color: '#333' }}>Calendar </h3>
            <Calendar 
              onChange={setValue} 
              value={value} 
              onClickDay={handleDateClick}
              tileContent={tileContent}
              className="w-100 border-0"
              locale="en-EN" // 영어 달력 (원하시면 ko-KR로 변경 가능)
            />
          </div>
        </div>

        {/* 선택한 날짜 기록 영역 */}
        <div className="col-md-6 mb-4">
          <div className="custom-card h-100 p-4">
            <h3 className="fw-bold mb-4">
              {value.toLocaleDateString()} Logs
            </h3>
            
            {selectedLogs.length > 0 ? (
              <div className="list-group list-group-flush">
                {selectedLogs.map(log => (
                  <div key={log.id} className="list-group-item border-0 mb-3 p-3 shadow-sm" style={{ backgroundColor: '#fff', borderRadius: '15px', borderLeft: '5px solid #6c5ce7' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold mb-1 text-dark">{log.exercise_type}</h5>
                      <span className="badge-custom">{log.body_part}</span>
                    </div>
                    <div className="mt-2 text-muted small">
                      <span className="me-3">🔄 {log.sets} sets</span>
                      <span className="me-3">⏱ {log.duration} min</span>
                      <span className="fw-bold text-primary">🔥 {log.calories} kcal</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🛌</div>
                <p className="text-muted fw-bold">휴식도 훈련의 일부입니다.</p>
                <p className="small text-secondary">기록이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;