import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import Header from './Header/Header';
import BestAuthor from './BestAuthor/BestAuthor';
import NovellaList from './NovellaList/NovellaList';
import PopularUpdates from './PopularUpdates/PopularUpdates';
import AuthorNewbies from './AuthorNewbies/AuthorNewbies';
import LikesWeek from './LikesWeek/LikesWeek';

const Home = () => {
  const books = useState();
  const novellas=[
    {
      title:"Новелла", author:"Автор", genres:"Жанры"
    },
    {
      title:"Новелла", author:"Автор", genres:"Жанры"
    },
    {
      title:"Новелла", author:"Автор", genres:"Жанры"
    }
  ]

  return (
    <div className="vertical-column-container">
      <Header />
      <div className='center-setter'>
        <div className='borderless-vertical-box'>
          <div className='general-margin'>
            <h1 className='h1'>Лучшие 3 автора недели</h1>
            <div className='horizontal-container'>
              <BestAuthor></BestAuthor>
              <BestAuthor></BestAuthor>
              <BestAuthor></BestAuthor>
            </div>
            <h1 className='h1'>Популярное</h1>
            <div className='horizontal-container'>
              <NovellaList title="За день" novellas={novellas}></NovellaList>
              <NovellaList title="За неделю" novellas={novellas}></NovellaList>
              <NovellaList title="За месяц" novellas={novellas}></NovellaList>
            </div>
            <h1 className='h1'>Последние обновления</h1>
            <div className="horizontal-container">
              <PopularUpdates />
            </div>
            <div className='horizontal-container'>
              <AuthorNewbies></AuthorNewbies>
              <LikesWeek></LikesWeek>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;