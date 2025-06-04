import React, { useState } from 'react';
import '../../Main.css';
import './ProfileWindow.css';
import { useNavigate } from 'react-router-dom';
import FumoJpg from '../../icons/fumo.jpg';
import {ReactComponent as BellOnIcon} from '../../icons/bell_on.svg';
import {ReactComponent as ChatIcon} from '../../icons/chat_1.svg';
import {ReactComponent as HistoryIcon} from '../../icons/redo.svg';
import {ReactComponent as FavoriteIcon} from '../../icons/bookmark.svg';
import {ReactComponent as SettingsIcon} from '../../icons/settings.svg';
import {ReactComponent as LogoutIcon} from '../../icons/logout.svg';
import {ReactComponent as ChevRightIcon} from '../../icons/circle_chev_right.svg';
import { useAuthContext } from '../../../providers/AuthProvider';


const ProfileWindow = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const {logout} = useAuthContext()

    const handleOpen = () => setIsOpen(prev => !prev);
    const handleClose = () => setIsOpen(false);
    
    const {user} = useAuthContext()

    return (
        <div style={{display: 'inline-block'}}>
            <button onClick={handleOpen} className='profile-button header-button-elem'>
                <img src={`http://localhost:5004/api/image/${1}`} alt='profile' className='profile-avatar'/>
            </button>
            {isOpen && (
                <div>
                    <div className='overlay' onClick={handleClose}></div>
                    <div className='profile-window'>
                        <div className='profile-window-header'>
                            <button className='profile-mini-link'
                            onClick={() => {
                                navigate(`/profile`)
                            }}>
                                <div>Мой профиль</div>
                                <ChevRightIcon className='profile-icon'/>
                            </button>
                            <div className='profile-window-header-title'>Название профиля</div>
                        </div> 
                        <div className='profile-window-body'>
                            <button className='profile-link'>
                                <ChatIcon className='profile-icon'/>
                                <div>Комментарии</div>
                            </button>
                            <button className='profile-link'>
                                <HistoryIcon className='profile-icon'/>
                                <div>История просмотра</div>
                            </button>
                            <button className='profile-link'>
                                <FavoriteIcon className='profile-icon'/>
                                <div>Избранное</div>
                            </button>
                            <button className='profile-link'>
                                <SettingsIcon className='profile-icon'/>
                                <div>Настройки</div>
                            </button>
                            <button className='profile-link' onClick={logout}>
                                <LogoutIcon className='profile-icon'/>
                                <div>Выход</div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileWindow;
