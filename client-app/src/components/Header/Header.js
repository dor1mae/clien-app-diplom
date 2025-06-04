import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Main.css';
import '../icons/Icon.css'
import { ReactComponent as SquarePlusIcon } from '../icons/square_plus.svg';
import ProfileWindow from './ProfileWindow/ProfileWindow';
import NotificationsWindow from './NotificationsWindow/NotificationsWindow';
import SearchWindow from './SearchWindow/SearchWindow';
import ThemeButton from './ThemeButton/ThemeButton';


const Header = () => {
    const navigate = useNavigate();

    return (
        <header className='header'>
            <div className='center-setter'>
                <div className='header-element'>
                    <div className='site-icon'>
                        <button className='site-icon-button' onClick={() => navigate('/home')}>NovelSite</button>
                    </div>
                </div>
                <div className='header-element'>
                    <SearchWindow></SearchWindow>
                </div>
                <div className='header-element'>
                    <div className='horizontal-container'>
                        <SquarePlusIcon className='icon icon-color '></SquarePlusIcon>
                        <NotificationsWindow ></NotificationsWindow>
                        <ThemeButton />
                        <ProfileWindow></ProfileWindow>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;