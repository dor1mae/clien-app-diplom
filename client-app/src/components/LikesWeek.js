import React from 'react';
import './Main.css';

const LikesWeek = () => {
  return (
    <div className="likes-week-block" style={{background:'#161616', borderRadius: '10px', padding: '20px', width: '100%', maxWidth: '420px'}}>
      <div style={{color:'#e05a43', fontSize:'22px', fontWeight:'bold', marginBottom:'10px'}}>Наибольшее число лайков за неделю</div>
      {[...Array(10)].map((_, idx) => (
        <div key={idx} style={{display:'flex', alignItems:'flex-start', marginBottom:'10px'}}>
          <div style={{color:'#8eca82', fontSize:'2rem', width:'32px', textAlign:'center'}}>{idx+1}</div>
          <div style={{background:'#807f7f', width:'48px', height:'48px', borderRadius:'8px', marginRight:'10px'}}></div>
          <div>
            <div style={{color:'#e05a43', fontWeight:'bold'}}>Название новеллы</div>
            <div style={{color:'#e05a43', fontSize:'0.95rem'}}>Автор (страна)</div>
            <div style={{color:'#e05a43', fontSize:'0.95rem'}}>Основные жанры</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikesWeek; 