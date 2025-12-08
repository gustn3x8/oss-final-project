import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = 'https://692ae5787615a15ff24e076c.mockapi.io/exercises';

// 운동 목록
const exerciseOptions = {
  "가슴": ["벤치프레스", "푸쉬업", "딥스", "인클라인 벤치프레스"],
  "등": ["데드리프트", "풀업", "랫 풀 다운", "바벨 로우"],
  "하체": ["스쿼트", "런지", "레그 프레스", "레그 익스텐션"],
  "어깨": ["오버헤드 프레스", "사이드 레터럴 레이즈", "프론트 레이즈"],
  "팔": ["바벨 컬", "덤벨 컬", "트라이셉스 익스텐션"],
  "복근": ["플랭크", "크런치", "레그 레이즈"],
  "유산소": ["러닝머신", "사이클", "버피", "천국의 계단"],
  "기타": ["직접입력"] 
};

const CALORIES_DB = {
  // 가슴
  "벤치프레스": { perSet: 15, perMin: 1.5 },
  "푸쉬업": { perSet: 5, perMin: 2 },
  "딥스": { perSet: 8, perMin: 2 },
  "인클라인 벤치프레스": { perSet: 15, perMin: 1.5 },
  
  // 등
  "데드리프트": { perSet: 20, perMin: 2 },
  "풀업": { perSet: 10, perMin: 2 },
  "랫 풀 다운": { perSet: 12, perMin: 1.5 },
  "바벨 로우": { perSet: 18, perMin: 2 },

  // 하체
  "스쿼트": { perSet: 18, perMin: 3 },
  "런지": { perSet: 10, perMin: 4 },
  "레그 프레스": { perSet: 20, perMin: 2 },
  "레그 익스텐션": { perSet: 10, perMin: 1.5 },

  // 어깨
  "오버헤드 프레스": { perSet: 15, perMin: 1.5 },
  "사이드 레터럴 레이즈": { perSet: 8, perMin: 1 },
  "프론트 레이즈": { perSet: 8, perMin: 1 },

  // 팔
  "바벨 컬": { perSet: 10, perMin: 1 },
  "덤벨 컬": { perSet: 8, perMin: 1 },
  "트라이셉스 익스텐션": { perSet: 8, perMin: 1 },

  // 복근
  "플랭크": { perSet: 3, perMin: 5 }, 
  "크런치": { perSet: 4, perMin: 3 },
  "레그 레이즈": { perSet: 5, perMin: 3 },

  // 유산소 (세트 개념보다는 시간 비중이 큼)
  "러닝머신": { perSet: 0, perMin: 10 },
  "사이클": { perSet: 0, perMin: 8 },
  "버피": { perSet: 5, perMin: 10 },
  "천국의 계단": { perSet: 0, perMin: 15 },
  
  // 기타
  "직접입력": { perSet: 0, perMin: 0 } 
};

const ExerciseCreate = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const user = JSON.parse(localStorage.getItem('user'));

  // 초기값 설정
  const [form, setForm] = useState(() => {
    const initialState = {
      date: new Date().toISOString().split('T')[0],
      body_part: '', 
      exercise_type: '', 
      sets: 0, 
      calories: 0, 
      duration: 0,
      memo: ''
    };

    if (location.state && location.state.facilityName) {
      const { facilityName, address, phone, link } = location.state;
      return {
        ...initialState,
        body_part: '기타', 
        exercise_type: '직접입력',
        memo: `[시설 방문] 🟡 ${facilityName}\n📍 주소: ${address}\n📞 전화: ${phone}\n🔗 링크: ${link}`
      };
    }
    return initialState;
  });

  useEffect(() => {
    if (!user) { alert("로그인이 필요합니다."); navigate('/login'); }
  }, [user, navigate]);

  // 칼로리 계산 함수
  const calculateCalories = (type, sets, duration) => {
    if (type && CALORIES_DB[type]) {
      const metric = CALORIES_DB[type];
      return Math.round((Number(sets) * metric.perSet) + (Number(duration) * metric.perMin));
    }
    return 0;
  };

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'body_part') {
      setForm({ ...form, body_part: value, exercise_type: '', sets: 0, duration: 0, calories: 0 });
    } else {
      const nextForm = { ...form, [name]: value };

      if (['exercise_type', 'sets', 'duration'].includes(name)) {
        if (CALORIES_DB[nextForm.exercise_type]) {
          nextForm.calories = calculateCalories(
            nextForm.exercise_type, 
            nextForm.sets, 
            nextForm.duration
          );
        }
      }
      setForm(nextForm);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.exercise_type || !form.body_part) return alert("운동 정보를 입력해주세요.");

    try {
      const dataToSend = {
        ...form,
        username: user.username,
        sets: Number(form.sets),
        calories: Number(form.calories),
        duration: Number(form.duration)
      };
      
      await axios.post(API_URL, dataToSend);
      alert(`저장 완료! 🔥`);
      navigate('/list');
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const isAutoCalc = CALORIES_DB[form.exercise_type] !== undefined;

  return (
    <div className="d-flex justify-content-center">
      <div className="custom-card p-4 p-md-5" style={{ width: '100%', maxWidth: '600px' }}>
        <h3 className="fw-bold mb-4 text-center">New Workout 💪</h3>
        
        {location.state && location.state.facilityName && (
          <div className="alert alert-warning py-2 mb-4 small">
             🟡 <strong>{location.state.facilityName}</strong> 방문 기록을 남깁니다.
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="fw-bold text-muted ps-2 mb-2">Date</label>
            <input type="date" name="date" className="form-control-custom" value={form.date} onChange={handleChange} />
          </div>

          <div className="mb-4">
            <label className="fw-bold text-muted ps-2 mb-2">Part</label>
            <select name="body_part" className="form-control-custom" value={form.body_part} onChange={handleChange}>
              <option value="">Select Part</option>
              {Object.keys(exerciseOptions).map(part => <option key={part} value={part}>{part}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="fw-bold text-muted ps-2 mb-2">Exercise</label>
            <select name="exercise_type" className="form-control-custom" value={form.exercise_type} onChange={handleChange} disabled={!form.body_part}>
              <option value="">Select Exercise</option>
              {form.body_part && exerciseOptions[form.body_part]?.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          <div className="row mb-4">
            <div className="col-6">
              <label className="fw-bold text-muted ps-2 mb-2">Sets</label>
              <input type="number" name="sets" className="form-control-custom" placeholder="0" value={form.sets} onChange={handleChange} />
            </div>
            <div className="col-6">
              <label className="fw-bold text-muted ps-2 mb-2">Time(min)</label>
              <input type="number" name="duration" className="form-control-custom" placeholder="0" value={form.duration} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-4">
            <label className="fw-bold text-muted ps-2 mb-2">Memo / Facility Info</label>
            <textarea 
              name="memo" 
              className="form-control-custom" 
              rows="3" 
              value={form.memo} 
              onChange={handleChange}
              placeholder="메모를 입력하세요."
              style={{ borderRadius: '20px' }}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="fw-bold text-muted ps-2 mb-2">
              Calories {isAutoCalc ? "(Auto)" : "(Manual)"}
            </label>
            <input 
              type="number" 
              name="calories" 
              className="form-control-custom fw-bold text-primary" 
              style={{ backgroundColor: isAutoCalc ? '#e3f2fd' : '#fff' }} 
              value={form.calories} 
              onChange={handleChange}
              readOnly={isAutoCalc} 
              placeholder="0"
            />
          </div>

          <button type="submit" className="btn-custom w-100 mt-2">Save Workout</button>
        </form>
      </div>
    </div>
  );
};

export default ExerciseCreate;