import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../Main.css';
import Header from '../Header/Header.js';
import './TitlePage.css';
import {ReactComponent as LikeIcon} from '../icons/heart.svg';
import {ReactComponent as ViewsIcon} from '../icons/read.svg';
import Chapter from '../sub-components/Chapter.js';

function TitlePage() {
  const categories = ['Описание', 'Главы'];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const { id } = useParams();
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [country, setCountry] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5004/api/titles/${id}`)
      .then(res => res.json())
      .then(data => setTitle(data));
  }, [id]);

  useEffect(() => {
    if(title && title.authorId) {
      fetch(`http://localhost:5004/api/authors/${title.authorId}`)
        .then(res => res.json())
        .then(data => setAuthor(data));
    }
  }, [title]);

  useEffect(() => {
    if(title && title.authorId) {
      fetch(`http://localhost:5004/api/countries/${title.countryId}`)
        .then(res => res.json())
        .then(data => setCountry(data));
    }
  }, [title]);

  useEffect(() => {
    if(title && title.id) {
      fetch(`http://localhost:5004/api/chapters/${title.id}/chapters`)
        .then(res => res.json())
        .then(data => data.sort((a, b) => a.number - b.number))
        .then(data => setChapters(data));
    }
  }, [title]);

  useEffect(() => {
    if (title && title.id) {
      // Первый запрос — получаем массив тегов
      fetch(`http://localhost:5004/api/titletag/${title.id}/tags`)
        .then(res => res.json())
        .then(arraytags => {
          if (!arraytags || arraytags.length === 0) {
            setTags([]); // Нет тегов — очищаем
            return;
          }
  
          // Проверяем, что у тегов есть поле id
          const idsArr = arraytags.map(tag => tag.id).filter(id => id !== undefined && id !== null);
          if (idsArr.length === 0) {
            setTags([]);
            return;
          }
  
          // Формируем строку запроса для второго запроса
          const params = idsArr.map(id => `ids=${id}`).join('&');
          const apirequest = `http://localhost:5004/api/tag?${params}`;
  
          // Второй запрос — получаем сами теги
          fetch(apirequest)
            .then(res => res.json())
            .then(data => setTags(data))
            .catch(() => setTags([])); // обработка ошибок второго запроса
        })
        .catch(() => setTags([])); // обработка ошибок первого запроса
    } else {
      setTags([]); // если title или title.id нет — очищаем теги
    }
  }, [title]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  if (!title) return <div>Загрузка...</div>;

  return (
    <div className='vertical-column-container'>
        <Header />
        <div className='center-setter'>
          <div className='title-borderless-vertical-box'>
            <div className='title-page-background-cover'>
              <img src={`http://localhost:5004/api/image/${title.backgroundCoverId}`} alt='Обложка' />
              <div className='title-page-background-cover-overlay'></div>
            </div>
            <div className='general-margin'>
              <div className='title-page-main-box'>
                <div className='title-info-vertical-box'>
                    <div className='title-cover-box'>
                      <img src={`http://localhost:5004/api/image/${title.coverId}`} alt='Обложка' />
                    </div>
                    <div className='title-button'>
                      <button>Начать читать</button>
                    </div>
                    <div className='title-button'>
                      <button>В закладки</button>
                    </div>
                      <div className='title-info-list'>
                          <div className='title-info-list-item'>
                            <div className='title-info-list-item-title'>Страна</div>
                            <div className='title-info-list-item-value'>{country ? country.title : 'Заглушка'}</div>
                          </div>
                          <div className='title-info-list-item'>
                            <div className='title-info-list-item-title'>Статус</div>
                            <div className='title-info-list-item-value'>{title.status}</div>
                          </div>
                          <div className='title-info-list-item'>
                            <div className='title-info-list-item-title'>Главы</div>
                            <div className='title-info-list-item-value'>{chapters ? chapters.length : 'Заглушка'}</div>
                          </div>
                          <div className='title-info-list-item'>
                            <div className='title-info-list-item-title'>Автор</div>
                            <div className='title-info-list-item-value'>{author ? author.nickname : 'Заглушка'}</div>
                          </div>
                          <div className='title-info-list-item'>
                            <div className='title-info-list-item-title'>Художник</div>
                            <div className='title-info-list-item-value'>{title.artist ? title.artist : 'Нет'}</div>
                          </div>
                    </div>
                </div>
                <div className='title-main-vertical-box'>
                  <div className='title-header-box'>
                    <div className='title-header-box-title'>{title.name}</div>
                    <div className="title-rate-button">
                      <button>Оценить</button>
                    </div>
                  </div>
                  <div className='title-main-box'>
                    <div className='title-main-box-tabs'>
                      {categories.map((category, index) => (
                        <button key={index} onClick={() => handleCategoryChange(category)}>
                          {category}
                        </button>
                      ))}
                    </div>
                    <div className='title-content-container'>
                      {activeCategory === categories[0] && (
                        <div>
                          <div className='title-main-box-description'>{title.description}</div>
                          <div className='title-main-box-genres'>
                            {tags.length > 0 ? tags.map((tag, index) => (
                              <div className='title-main-box-genres-item' key={index}>{tag.name}</div>
                            )) : ''}
                          </div>
                        </div>
                      )}
                      {activeCategory === categories[1] && (
                        <div className='title-main-box-chapters'>
                          {chapters.map((chapter, index) => (
                            <Chapter chapter={chapter} key={index} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default TitlePage;