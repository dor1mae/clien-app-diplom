import { useEffect, useState } from "react";
import '../Header/SearchWindow/SearchWindow';
import { useNavigate } from "react-router-dom";
import {ReactComponent as LikeIcon} from '../icons/heart.svg';
import {ReactComponent as ViewsIcon} from '../icons/read.svg';
import '../TitlePage/TitlePage';

function Chapter({ chapter}) {
    const navigate = useNavigate();
    
    if(!chapter) return <div>Загрузка...</div>;

    return (
        <button onClick={() => navigate(`/novella/chapter/${chapter.id}`)} className='title-main-box-chapters-box'>
            <div className='title-main-box-chapters-box-name'>Глава {chapter.number} - {chapter.name}</div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <div className='title-main-box-chapters-box-views'>
                <ViewsIcon className='title-main-box-chapters-icon'></ViewsIcon>
                {chapter.views}
                </div>
                <div className='title-main-box-chapters-box-likes'>
                <LikeIcon className='title-main-box-chapters-icon'></LikeIcon>
                {chapter.likes}
                </div>
            </div>
        </button>
    );
}

export default Chapter;
