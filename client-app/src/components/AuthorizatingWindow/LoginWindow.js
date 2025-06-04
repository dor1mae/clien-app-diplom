import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/AuthProvider';

export const LoginWindow = (props) => {
    const [userlogin, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {login, isAuthenticated} = useAuthContext();
    const nav = useNavigate();

    const handleInputChange = async (e) => {
        switch (e.target.name) {
            case 'login':
                setLogin(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    };

    const handleChangeWindow = (window) => {
        props.handleSetChoicedWindow(window);
    };

    const handleLogin = async (inputlogin, inputpassword) => {
        try {
            const data = await login(inputlogin, inputpassword);
        } catch (e) {
            console.error("Error: ", e);
        }
    };

    useEffect(() =>
    {
        if(isAuthenticated === true)
        {
            console.log("Хук стработал")
            nav(`/home`)
        }
        else
        {
            console.log("Хук не стработал")
        }
    })

    

    return (
        <div>
            <div className='window-header'>Авторизация</div>
            <div className='input-box'>
                <div className='input-header'>Логин</div>
                <input className='input'
                name='login'
                type='text'
                placeholder='Введите логин'
                value={userlogin}
                onChange={handleInputChange}/>
            </div>
            <div className='input-box'>
                <div className='input-header'>Пароль</div>
                <input className='input'
                name='password'
                type='text'
                placeholder='Введите пароль'
                value={password}
                onChange={handleInputChange}/>
            </div>
            <div className='href-section'>
                <button className='href-button' onClick={() => {handleChangeWindow('Authorizating')}}>Регистрация</button>
                <button className='href-button' onClick={() => {handleChangeWindow('RecoverPassword')}}>Восстановить пароль</button>
            </div>
            <button className='auth-button'
            onClick= {async () => {
                await handleLogin(userlogin, password);
            }}>Войти</button>
        </div>
    );
};