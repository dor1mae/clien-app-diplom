import { useEffect, useState } from "react";
import '../Header/SearchWindow/SearchWindow';
import { useNavigate } from "react-router-dom";


function Novella({ Id}) {
  const [novella, setNovella] = useState(null);
  const [author, setAuthor] = useState(null);
  const [cover, setCover] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5004/api/titles/${Id}`)
      .then(res => res.json())
      .then(data => setNovella(data));
  }, [Id]);

  useEffect(() => {
    if(novella && novella.authorId)
    {
        fetch(`http://localhost:5004/api/authors/${novella.authorId}`)
        .then(res => res.json())
        .then(data => setAuthor(data));
    }
  }, [novella]);

  if (!novella || !author) return <div>Загрузка...</div>;

  return (
    <button onClick={() => navigate(`/novella/${novella.id}`)} className='search-window-result'>
        <img src={`http://localhost:5004/api/image/${novella.coverId}`} alt='аватар' className='search-window-inresult-image'/>
        <div className='search-window-inresult-column'>
            <div className='search-window-inresult-title'>{novella.name}</div>
            <div className='search-window-inresult-subtitle'>{author.nickname ? author.nickname : 'Нет'}</div>
        </div>
    </button>
  );
}

export default Novella;