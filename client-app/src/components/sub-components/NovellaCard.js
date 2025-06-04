import { useEffect } from "react";
import { useState } from "react";
import './NovellaCard.css'


function NovellaCard ({id, coverId, authorId, name})
{
    const title = name
    const [author, setAuthor] = useState(null)
    const [cover, setCover] = useState(null)

    useEffect(() =>
    {
        if(authorId)
        {
            fetch(`http://localhost:5004/api/authors/${authorId}`)
            .then(response => response.json())
            .then(data => setAuthor(data))
        }
    }, [coverId, authorId])

    if(author == null) return <div>Загрузка</div>;

    return (
        <div className='novella-card-body'>
            <div className='novella-card-cover-container'>
                <img src={`http://localhost:5004/api/image/${coverId}`} alt="Обложка"></img>
            </div>
            <div className='novella-card-title-header'>
                <div className='novella-card-title'>{title}</div>
                <div className='novella-card-author'>{author.nickname ? author.nickname : "Загрузка"}</div>
            </div>
        </div>
    );
}

export default NovellaCard