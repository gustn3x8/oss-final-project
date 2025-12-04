import React, { useState } from 'react';

// 정적 데이터 (백과사전)
const guideData = [
  { id: 1, name: "벤치프레스", part: "가슴", desc: "가슴 근육 발달에 최고의 운동입니다.", tips: "허리를 아치형으로 만들고 견갑골을 고정하세요." },
  { id: 2, name: "스쿼트", part: "하체", desc: "하체 근력과 전신 균형을 잡아줍니다.", tips: "무릎이 발끝보다 많이 나가지 않도록 주의하세요." },
  { id: 3, name: "데드리프트", part: "등", desc: "전신 후면 근육을 강화합니다.", tips: "허리가 굽지 않도록 코어에 힘을 주세요." },
  { id: 4, name: "오버헤드 프레스", part: "어깨", desc: "어깨 전체의 볼륨감을 키워줍니다.", tips: "반동을 쓰지 말고 어깨 힘으로만 미세요." },
  { id: 5, name: "플랭크", part: "복근", desc: "코어 근육을 단련하는 버티기 운동입니다.", tips: "엉덩이가 처지거나 솟지 않게 일자를 유지하세요." },
  { id: 6, name: "런지", part: "하체", desc: "엉덩이와 허벅지 라인을 다듬어줍니다.", tips: "상체를 곧게 세우고 앉으세요." },
];

const Recommend = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = guideData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="mb-4 text-center">
        <h2 className="fw-bold">Workout Guide 📘</h2>
        <p className="text-muted">운동 방법을 검색하고 꿀팁을 확인하세요.</p>
      </div>

      {/* 검색창 */}
      <div className="d-flex justify-content-center mb-5">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <input 
            className="form-control-custom" 
            placeholder="🔍 Search workout name..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className="row">
        {filtered.map(item => (
          <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
            <div className="custom-card h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">{item.name}</h5>
                <span className="badge-custom">{item.part}</span>
              </div>
              <p className="text-muted flex-grow-1">{item.desc}</p>
              
              <div className="mt-3 p-3" style={{ backgroundColor: '#fff3cd', borderRadius: '15px', color: '#856404' }}>
                <small><strong>💡 Tip:</strong> {item.tips}</small>
              </div>
            </div>
          </div>
        ))}
        
        {filtered.length === 0 && (
          <div className="col-12 text-center py-5">
             <p className="text-muted">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Recommend;