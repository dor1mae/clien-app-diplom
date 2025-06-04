import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './ChapterPage.css';
import '../Main.css';
import { useNavigate } from "react-router-dom";
import {ReactComponent as SettingIcon} from '../icons/settings.svg';
import {ReactComponent as HeartIcon} from '../icons/heart.svg'
import {ReactComponent as ReadIcon} from '../icons/read.svg'


function ChapterPage() {
    const navigate = useNavigate();

    const { chapterId } = useParams();

    const [title, setTitle] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [paragraphs, setParagraphs] = useState([]);
    const [fontSize, setFontSize] = useState(16);
    const [paragraphSpacing, setParagraphSpacing] = useState(16);
    const [indent, setIndent] = useState(16);
    const [comment, setComment] = useState('');
    const [nextChapter, setNextChapter] = useState(null)
    const [lastChapter, setLastChapter] = useState(null)

    const [isOpenSettings, setIsOpenSettings] = useState(false);

    useEffect(() => {
        if(chapterId) {
            fetch(`http://localhost:5004/api/chapters/${chapterId}`)
                .then(response => response.json())
                .then(data => {
                    setChapter(data);
                    handleUpdateViews(data);
                    setParagraphs(data.content.split(/\r?\n/).filter(p => p.trim() !== ""));
                })
        }
    }, [chapterId]);

    useEffect(() => {
        if(chapter) {
            fetch(`http://localhost:5004/api/titles/${chapter.titleId}`)
                .then(response => response.json())
                .then(data => 
                {
                    setTitle(data)
                }
                );
        }
    }, [chapter]);

    useEffect(() => {
        if(chapter)
        {
            setFontSize(24);
        }
    }, [chapter])

    useEffect(() => {
    if (chapter) {
        fetch(`http://localhost:5004/api/chapters/${chapter.titleId}/chapters`)
            .then(response => response.json())
            .then(data => {
                const nextChapter = data.find(item => item.number === chapter.number + 1);
                const lastChapter = data.find(item => item.number === chapter.number - 1);
                setNextChapter(nextChapter);
                setLastChapter(lastChapter);
            })
            .catch(error => console.error('Error:', error));
    }
}, [chapter]);


    const handleUpdateViews = (chapter) => {
    if (chapter.views !== null && chapter.views !== undefined) {
        const url = `http://localhost:5004/api/chapters/${chapter.id}/views/update`;
        const patchDoc = [
            {
                "op": "replace",
                "path": "/views",
                "value": chapter.views + 1
            }
        ];

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify(patchDoc)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
};


    const handleCommentChange = () => {
        setComment(comment)
    }

    const handleCommentSubmit = () => {

    }

    if (!chapter || !title) {
        return <div>Loading...</div>;
    }

    return (
        <div className="vertical-column-container">
            <div className='navigation-bar'>
                {lastChapter && (
                    <button 
                    className='navigation-bar-button' 
                    style={{left:300}} 
                    onClick={() => navigate(`/novella/chapter/${lastChapter.id}`)}>Назад</button>
                )}
                <div className='navigation-bar-title-box'>
                    <button className='navigation-bar-title-box-title' onClick={() => navigate(`/novella/${title.id}`)}>{title.name ? title.name : 'Название тайтла отсутствует'}</button>
                    <button className='navigation-bar-title-box-chapter'>{chapter.name ? 'Глава ' + chapter.number + ': ' + chapter.name : 'Название главы отсутствует'}</button>
                </div>
                {nextChapter && (
                    <button className='navigation-bar-button' 
                    style={{right:300}}
                    onClick={() => navigate(`/novella/chapter/${nextChapter.id}`)}>Вперед</button>
                )}
            </div>
            <button className='chapter-page-settings' onClick={() => setIsOpenSettings(!isOpenSettings)}>
                <SettingIcon className='chapter-page-settings-icon' />
            </button>
            {isOpenSettings && (
                <div className='chapter-page-settings-menu'>
                    <div className='chapter-page-settings-menu-title'>Настройки</div>
                    <div className='chapter-page-settings-menu-item'>
                        <div className='chapter-page-settings-menu-item-title'>Размер шрифта: {fontSize}px</div>
                        <input type='range' min='16' max='50' className="chapter-page-settings-menu-item-input" onChange={(e) => setFontSize(e.target.value)} />
                    </div>
                    <div className='chapter-page-settings-menu-item'>
                        <div className='chapter-page-settings-menu-item-title'>Отступ: {indent}px</div>
                        <input type='range' min='16' max='50' className="chapter-page-settings-menu-item-input" onChange={(e) => setIndent(e.target.value)} />
                    </div>
                    <div className='chapter-page-settings-menu-item'>
                        <div className='chapter-page-settings-menu-item-title'>Расстояние между абзацами: {paragraphSpacing}px</div>
                        <input type='range' min='16' max='50' className="chapter-page-settings-menu-item-input" onChange={(e) => setParagraphSpacing(e.target.value)} />
                    </div>
                </div>
            )}
            <div className="chapter-center-setter">
                <div className='chapter-title'>{chapter.name ? chapter.name : 'Название главы отсутствует'}</div>
                <div className='chapter-content'>
                    <div className='chapter-content-text'>
                        {paragraphs.map((paragraph, index) => (
                            <p key={index} className='chapter-content-text-paragraph' style={{fontSize: `${fontSize}px`, marginBottom: `${paragraphSpacing}px`, textIndent: `${indent}px`}}>{paragraph}</p>
                        ))}
                    </div>
                </div>
                <div className="chapter-user-panel">
                    <div className='chapter-user-panel-title'>
                        <ReadIcon className='chapter-user-panel-icon'></ReadIcon>
                        {chapter.views}
                    </div>
                    <button className="chapter-user-panel-like">Оценить</button>
                    <div className='chapter-user-panel-title'>
                        <HeartIcon className='chapter-user-panel-icon'></HeartIcon>
                        {chapter.likes}
                    </div>
                </div>
                <div className='user-social-box'>
                    <div className='user-comment-container'>
                        <button className='user-sort-comment-button'>Сортировать</button>
                        <input className="user-input-comment"
                        type='text'
                        name='comment-input'
                        value={comment}
                        placeholder="Введите комментарий..."
                        autoComplete="false"
                        onChange={handleCommentChange}
                        onSubmit={handleCommentSubmit}
                        ></input> 
                        <button className='user-input-submit-button' onClick={handleCommentSubmit}>Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChapterPage;
