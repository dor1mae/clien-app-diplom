import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import '../Main.css'
import './CatalogPage.css'
import Header from "../Header/Header"
import {ReactComponent as ChevDown} from '../icons/circle_chev_down.svg'
import NovellaCard from "../sub-components/NovellaCard"



function CatalogPage () {
    const statuses = ['Продолжается', 'Заморожен', 'Закончен', 'Брошен']
    const [activeStatuses, setActiveStatuses] = useState([])

    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    //Оценка
    const [fromRate, setFromRate] = useState('')
    const [beforeRate, setBeforeRate] = useState('')

    const [fromChapters, setFromChapters] = useState('')
    const [beforeChapters, setBeforeChapters] = useState('')

    const [genres, setGenres] = useState([])
    const [activeGenres, setActiveGenres] = useState([])
    const [isGenreOpen, setIsGenreOpen] = useState(false)

    useEffect (() => {
        fetch(`http://localhost:5004/api/tag/tags`)
        .then(response => response.json())
        .then(data => setGenres(data))
        fetch(`http://localhost:5004/api/titles`)
        .then(response => response.json())
        .then(data => setSearchResults(data))
    }, []);

    const handleChange = async (e) =>
    {
        switch (e.target.name)
        {
            case 'search':
                setSearch(e.target.value)
                break
            case 'fromRate':
                if(e.target.value >=0 && e.target.value <= 10)
                {
                    setFromRate(e.target.value)
                }
                break
            case 'beforeRate':
                if(e.target.value >=0 && e.target.value <= 10)
                {
                    setBeforeRate(e.target.value)
                }
                break
            case 'fromChapters':
                if(e.target.value >=0)
                {
                    setFromChapters(e.target.value)
                }
                break
            case 'beforeChapters':
                if(e.target.value >=0)
                {
                    setBeforeChapters(e.target.value)
                }
                break
        }
    }

    const handleActiveStatus = (s) => {
        if (activeStatuses.includes(s)) {
            const newActiveStatuses = activeStatuses.filter(status => status !== s);
            setActiveStatuses(newActiveStatuses);
        } else {
            const newActiveStatuses = [...activeStatuses, s];
            setActiveStatuses(newActiveStatuses);
        }
    }
    
    const handleActiveGenres = (s) => {
        if (activeGenres.includes(s)) {
            const newActiveGenres = activeGenres.filter(genre => genre !== s);
            setActiveGenres(newActiveGenres);
        } else {
            const newActiveGenres = [...activeGenres, s];
            setActiveGenres(newActiveGenres);
        }
    }

    const handleGenreOpening = () =>
    {
        setIsGenreOpen(!isGenreOpen)
    }

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearch(value);

        if(value.length > 0)
        {
            const response = await fetch(`http://localhost:5004/api/titles/search?name=${value}`);
            if(response.ok)
            {
                const data = await response.json();
                setSearchResults(data);
            }
        }
        else
        {
            const response = await fetch(`http://localhost:5004/api/titles`)
            if(response.ok)
            {
                const data = await response.json();
                setSearchResults(data);
            }
        }
    };

    if(genres == [] && searchResults == []) return <div>Загрузка...</div>

    return (
        <div className="vertical-column-container">
            <Header></Header>
            <div className="center-setter">
                <div className="borderless-vertical-box">
                    <div className='general-margin'>
                        <div className='catalog-horizontal-box'>
                            <div className='catalog-results-area'>
                                <div className='catalog-results-area-header'>
                                    <div className="catalog-header">Каталог</div>
                                    <select className='catalog-select-sort'>
                                        <option value='by-popularity'>По популярности</option>
                                        <option value='by-views'>По просмотрам</option>
                                        <option value='by-rating'>По рейтингу</option>
                                        <option value='by-chapters'>По количеству глав</option>
                                    </select>
                                </div>
                                <input
                                className="catalog-search-input"
                                value={search}
                                type='text'
                                autoComplete="off"
                                onChange={handleChange}
                                placeholder="Поиск по названию"
                                name='search'/>
                                <div className="catalog-results-box">
                                    {searchResults.map((t, index) => (
                                        <NovellaCard key={index} id={t.id} name={t.name} coverId={t.coverId} authorId={t.authorId}></NovellaCard>
                                    ))}
                                </div>
                            </div>
                            <div className='catalog-parameters-area'>
                                <div className='catalog-parameters-item'>
                                    <div className='catalog-parameter-header'>По оценке</div>
                                    <div className='catalog-parameter-row-box'>
                                        <span>От</span>
                                        <input className="catalog-parameter-input"
                                        type='number'
                                        value={fromRate}
                                        onChange={handleChange}
                                        name='fromRate'/>
                                        <span>До</span>
                                        <input className="catalog-parameter-input"
                                        type='number'
                                        value={beforeRate}
                                        onChange={handleChange}
                                        name='beforeRate'/>
                                    </div>
                                </div>
                                <div className='catalog-parameters-item'>
                                    <div className='catalog-parameter-header'>По количеству глав</div>
                                        <div className='catalog-parameter-row-box'>
                                            <span>От</span>
                                            <input className="catalog-parameter-input"
                                            type='number'
                                            value={fromChapters}
                                            onChange={handleChange}
                                            name='fromChapters'/>
                                            <span>До</span>
                                            <input className="catalog-parameter-input"
                                            type='number'
                                            value={beforeChapters}
                                            onChange={handleChange}
                                            name='beforeChapters'/>
                                        </div>
                                </div>
                                <div className='catalog-parameters-item'>
                                    <div className='catalog-parameter-header'>По статусу</div>
                                    <div className="catalog-parameter-buttons-box">
                                        {statuses.map(status => (
                                            
                                                <button 
                                                className={activeStatuses.includes(status) ? 'catalog-button-active' : 'catalog-button'} 
                                                onClick={() => {
                                                    handleActiveStatus(status)
                                                }}
                                                key={status}>
                                                    {status}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className='catalog-parameters-item'>
                                    <div className='catalog-parameter-row-box'>
                                        <div className='catalog-parameter-header'>По жанру</div>
                                        <ChevDown className="catalog-button-icon" onClick={handleGenreOpening}></ChevDown>
                                    </div>
                                    {isGenreOpen && (
                                        <div className="catalog-parameter-buttons-box">
                                            {genres.map(genre => (
                                                <button
                                                className={activeGenres.includes(genre) ? 'catalog-button-active' : 'catalog-button'}
                                                onClick={() => {
                                                    handleActiveGenres(genre)
                                                }}
                                                key={genre.name}>
                                                    {genre.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className='catalog-parameters-item'>
                                    <div className='catalog-parameter-header'>По стране</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogPage