import React, { useState } from 'react';
import './NotificationsWindow.css';
import {ReactComponent as BellOnIcon} from '../../icons/bell_on.svg';

const notificationsMock = [
  { id: 1, type: 'Главы', user: 'Пользователь', time: '5 часов назад', text: 'добавил 157 главу', title: 'Название' },
  { id: 2, type: 'Ответы', user: 'Пользователь', time: '5 часов назад', text: 'Оставил комментарий к тайтлу', title: 'Название', comment: 'Начало комментария' },
  { id: 3, type: 'Другое', user: 'Пользователь', time: '5 часов назад', text: 'Привязал ваш тайтл', title: 'Название 1 глава' },
  { id: 4, type: 'Главы', user: 'Кто-то', time: '6 часов назад', text: 'Что сделал', title: 'Где: Название' },
];

const categories = ['Все', 'Главы', 'Ответы', 'Другое'];

const NotificationsWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [hoveredId, setHoveredId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [notifications, setNotifications] = useState(notificationsMock);

  const handleOpen = () => setIsOpen(prev => !prev);
  const handleClose = () => setIsOpen(false);

  const filtered = activeCategory === 'Все'
    ? notifications
    : notifications.filter(n => n.type === activeCategory);

  const handleDelete = (id) => setConfirmId(id);
  const confirmDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    setConfirmId(null);
  };
  const cancelDelete = () => setConfirmId(null);

  return (
    <div style={{display: 'inline-block', position: 'relative'}}>
      <button onClick={handleOpen} className='notifications-button'>
        <BellOnIcon className='notifications-icon'/>
      </button>
      {isOpen && (
        <div>
            <div className='overlay' onClick={handleClose}></div>
            <div className="notifications-window">
                <div className="notifications-header">
                    <div className="notifications-title">Уведомления</div>
                    <div className="notifications-tabs">
                        {categories.map(cat => (
                        <button
                            key={cat}
                            className={activeCategory === cat ? 'active' : ''}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                        ))}
                    </div>
                </div>
                <div className="notifications-list">
                {filtered.map(n => (
                    <div
                    key={n.id}
                    className={`notification-item${hoveredId === n.id ? ' hovered' : ''}`}
                    onMouseEnter={() => setHoveredId(n.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    >
                    <div className="notification-avatar" />
                    <div className="notification-content">
                        <div className="notification-row">
                          <span className="notification-text">{n.user}</span>
                          <span className="notification-time">{n.time}</span>
                        </div>
                        <div className="notification-row">
                          {n.type === 'Главы' && <>
                            <span className="notification-text">добавил</span>
                            <span className="notification-link">{n.text.replace('добавил ', '')}</span>
                            <span className="notification-text">в тайтл</span>
                            <span className="notification-link">{n.title}</span>
                          </>}
                          {n.type === 'Ответы' && <>
                            <span className="notification-text">Оставил комментарий к тайтлу</span>
                            <span className="notification-link">{n.title}</span>
                          </>}
                          {n.type === 'Другое' && <>
                            <span className="notification-text">Привязал ваш тайтл</span>
                            <span className="notification-link">{n.title}</span>
                          </>}
                        </div>
                        {n.comment && <div className="notification-comment">{n.comment}</div>}
                    </div>
                    {hoveredId === n.id && confirmId !== n.id && (
                        <button className="notification-delete-btn" onClick={() => handleDelete(n.id)}>
                        Удалить
                        </button>
                    )}
                    {confirmId === n.id && (
                        <div className="notification-confirm">
                        <div>Подтвердите действие</div>
                        <div className='notification-column'>
                          <button onClick={() => confirmDelete(n.id)} className="confirm-btn">Подтвердить</button>
                          <button onClick={cancelDelete} className="cancel-btn">Отменить</button>
                        </div>
                        </div>
                    )}
                    </div>
                ))}
                {filtered.length === 0 && <div className="no-notifications">Нет уведомлений</div>}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsWindow; 