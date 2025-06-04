import {React, useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchWindow.css';
import '../../Main.css';
import Novella from '../../sub-components/Novella.js';


function SearchWindow() {
    const ref = useRef();
    const categories = ['Тайтлы', 'Пользователи', 'Люди'];

    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Тайтлы');

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false)
        handleChange({target: {name: 'search', value: ''}})
    };

    const filtered = searchResults.filter(result => (
        (activeCategory === 'Тайтлы' && searchResults)||
        (activeCategory === 'Пользователи' && searchResults) ||
        (activeCategory === 'Люди' && searchResults)
    ));

    const navigate = useNavigate();

    const handleChange = async (e) => {
        const value = e.target.value;
        setSearch(value);

        if(value.length > 0)
        {
            if(activeCategory === 'Тайтлы')
            {
                setIsOpen(value.length > 0);
                const response = await fetch(`http://localhost:5004/api/titles/search?name=${value}`);
                if(response.ok)
                {
                    const data = await response.json();
                    setSearchResults(data);
                }
            }
        }
        else
        {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


  

    return (
        <div ref={ref} style={{display: 'inline-block', position: 'relative'}}>
            <div className='search-window-input'>
                <input 
                type="text" 
                name="search" 
                value={search} 
                onChange={handleChange} 
                placeholder='Поиск...' 
                onClick={handleOpen}
                autoComplete='off'
                />
            </div>
            {isOpen && (
                <div>
                    <div className="overlay" onClick={handleClose}></div>
                    <div className="search-window">
                        <div className="search-window-column">
                            <div className='search-window-categories'>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        className={activeCategory === cat ? 'active' : ''}
                                        onClick={() => {
                                            setActiveCategory(cat)
                                            handleChange({target: {name: 'search', value: ''}})
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className='search-window-results-column'>
                                {filtered.map(result => (
                                    <div key={result.id}>
                                        {activeCategory === 'Тайтлы' && <>
                                            <Novella Id={result.id}/>
                                        </>}
                                        {activeCategory === 'Пользователи' && <>
                                            <img src={result.image} alt='аватар' className='search-window-inresult-image'/>
                                            <div className='search-window-inresult-column'>
                                                <div className='search-window-inresult-title'>{result.nickname}</div>
                                            </div>
                                        </>}
                                        {activeCategory === 'Люди' && <>
                                            <img src={result.image} alt='аватар' className='search-window-inresult-image'/>
                                            <div className='search-window-inresult-column'>
                                                <div className='search-window-inresult-title'>{result.nickname}</div>
                                            </div>
                                        </>}
                                    </div>
                                ))}
                                {filtered.length === 0 && (
                                    <div className='search-window-result-empty'>
                                        <span className='search-window-result-empty-text'>Расширенный поиск находится в</span>
                                        <span className='search-window-link'>
                                            <button onClick={() => navigate(`/catalog`)}>каталоге</button>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchWindow;

