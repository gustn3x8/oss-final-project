import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// ★ 본인의 MockAPI 주소 (exercises 리소스)
const API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/exercises';

const exerciseOptions = {
  "가슴": ["벤치프레스", "푸쉬업", "딥스", "인클라인 벤치프레스"],
  "등": ["데드리프트", "풀업", "랫 풀 다운", "바벨 로우"],
  "하체": ["스쿼트", "런지", "레그 프레스", "레그 익스텐션"],
  "어깨": ["오버헤드 프레스", "사이드 레터럴 레이즈", "프론트 레이즈"],
  "팔": ["바벨 컬", "덤벨 컬", "트라이셉스 익스텐션"],
  "복근": ["플랭크", "크런치", "레그 레이즈"],
  "유산소": ["러닝머신", "사이클", "버피", "천국의 계단"]
};

// 운동별 칼로리 기준표
const CALORIES_DB = {
  "벤치프레스": { perSet: 15, perMin: 1 },
  "푸쉬업": { perSet: 5, perMin: 2 },
  "딥스": { perSet: 8, perMin: 2 },
  "데드리프트": { perSet: 20, perMin: 2 },
  "풀업": { perSet: 10, perMin: 2 },
  "스쿼트": { perSet: 18, perMin: 3 },
  "런지": { perSet: 10, perMin: 4 },
  "러닝머신": { perSet: 0, perMin: 10 },
  "사이클": { perSet: 0, perMin: 8 },
  "버피": { perSet: 5, perMin: 10 },
  "플랭크": { perSet: 3, perMin: 5 },
  "크런치": { perSet: 4, perMin: 3 }
};

const ExerciseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: '', body_part: '', exercise_type: '', sets: 0, calories: 0, duration: 0
  });

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then(res => setForm(res.data));
  }, [id]);

  useEffect(() => {
    if (form.exercise_type) {
      const metric = CALORIES_DB[form.exercise_type] || { perSet: 5, perMin: 3 };
      const setCal = Number(form.sets) * metric.perSet;
      const timeCal = Number(form.duration) * metric.perMin;
      setForm(prev => ({ ...prev, calories: setCal + timeCal }));
    }
  }, [form.exercise_type, form.sets, form.duration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'body_part') {
      setForm({ ...form, body_part: value, exercise_type: '', sets: 0, duration: 0, calories: 0 });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      const dataToSend = {
        ...form,
        sets: Number(form.sets),
        calories: Number(form.calories),
        duration: Number(form.duration)
      };
      await axios.put(`${API_URL}/${id}`, dataToSend);
      alert("수정 완료! ✅");
      navigate('/list');
    } catch (error) {
      console.error(error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      {/* 모바일 대응 */}
      <div className="custom-card p-4 p-md-5" style={{ width: '100%', maxWidth: '600px' }}>
        <h3 className="fw-bold mb-4 text-center">Edit Workout ✏️</h3>
        
        <div className="mb-3">
          <label className="fw-bold mb-2 ps-2 text-muted">Date</label>
          <input type="date" name="date" className="form-control-custom" value={form.date} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="fw-bold mb-2 ps-2 text-muted">Part</label>
          <select name="body_part" className="form-control-custom" value={form.body_part} onChange={handleChange}>
            <option value="">Select Part</option>
            {Object.keys(exerciseOptions).map(part => <option key={part} value={part}>{part}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label className="fw-bold mb-2 ps-2 text-muted">Exercise</label>
          <select name="exercise_type" className="form-control-custom" value={form.exercise_type} onChange={handleChange}>
            <option value="">Select Exercise</option>
            {form.body_part && exerciseOptions[form.body_part].map(ex => <option key={ex} value={ex}>{ex}</option>)}
          </select>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <label className="fw-bold mb-2 ps-2 text-muted">Sets</label>
            <input type="number" name="sets" className="form-control-custom" value={form.sets} onChange={handleChange} />
          </div>
          <div className="col-6">
            <label className="fw-bold mb-2 ps-2 text-muted">Time(min)</label>
            <input type="number" name="duration" className="form-control-custom" value={form.duration} onChange={handleChange} />
          </div>
        </div>

        <div className="mb-4">
          <label className="fw-bold mb-2 ps-2 text-muted">Total Calories</label>
          <input type="number" name="calories" className="form-control-custom fw-bold text-primary" style={{ backgroundColor: '#e3f2fd' }} value={form.calories} readOnly />
        </div>

        <button onClick={handleUpdate} className="btn-custom w-100">
          Update Workout
        </button>
      </div>
    </div>
  );
};
export default ExerciseUpdate;