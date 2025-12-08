import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KAKAO_API_KEY = '914e3947e15dc64f3788a819c6639636'; 

const FacilitySearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return alert("검색어를 입력하세요! (예: 강남 헬스장)");

    setLoading(true);
    try {
      const res = await axios.get('/kakao-api/v2/local/search/keyword.json', {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}` 
        },
        params: {
          query: query,
          size: 15
        }
      });
      
      setPlaces(res.data.documents);

    } catch (err) {
      console.error("카카오 검색 에러:", err);
      alert("검색 중 오류가 발생했습니다. (서버 재시작 확인 필요)");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place) => {
    navigate('/create', {
      state: {
        facilityName: place.place_name,
        address: place.address_name,
        phone: place.phone,
        link: place.place_url
      }
    });
  };

  return (
    <div className="container">
      <div className="mb-4 text-center">
        <h2 className="fw-bold">Kakao Map Search 🟡</h2>
        <p className="text-muted">카카오 지도로 내 주변 운동 시설을 찾아보세요.</p>
      </div>

      <div className="custom-card p-4 mb-4">
        <form className="d-flex gap-2" onSubmit={handleSearch}>
          <input 
            className="form-control-custom" 
            placeholder="검색어 입력 (예: 홍대 헬스장, 잠실 수영장)" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-custom" style={{width: '100px'}}>검색</button>
        </form>
      </div>

      {loading && <div className="text-center my-5">카카오 검색중... ⏳</div>}

      <div className="row">
        {places.map((place) => (
          <div className="col-md-6 mb-4" key={place.id}>
            <div className="custom-card h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="fw-bold mb-0 text-truncate">{place.place_name}</h5>
                <span className="badge-custom text-truncate" style={{maxWidth: '120px', fontSize: '0.7rem'}}>
                  {place.category_group_name || '운동시설'}
                </span>
              </div>
              
              <p className="text-muted small mb-2 flex-grow-1">
                📍 {place.address_name}
              </p>
              
              <div className="small text-secondary mb-3">
                📞 {place.phone || '전화번호 없음'}
              </div>

              <div className="mt-auto d-flex gap-2">
                <button onClick={() => handleSelect(place)} className="btn btn-outline-custom w-100 fw-bold">
                  + 선택하기
                </button>
                {place.place_url && (
                  <a href={place.place_url} target="_blank" rel="noopener noreferrer" className="btn btn-light rounded-circle border d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                    ℹ️
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {!loading && places.length === 0 && (
          <div className="col-12 text-center py-5 text-muted">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default FacilitySearch;