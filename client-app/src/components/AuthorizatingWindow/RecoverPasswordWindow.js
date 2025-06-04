import {React, useState, useEffect} from 'react'



export const RecoverPasswordWindow = (props) =>
{
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')

    const handleChangeWindow = (window) =>
    {
        props.handleSetChoicedWindow(window)
    }


    return(
        <div>
            <div className='window-header'>Восстановление пароля</div>
            <div className='input-box'>
                <div className='input-header'>Логин</div>
                <input className='input'
                type='text'
                placeholder='Введите логин'
                value={login}
                onChange={setLogin}/>
            </div>
            <div className='input-box'>
                <div className='input-header'>Email</div>
                <input className='input'
                type='text'
                placeholder='Введите почту'
                value={email}
                onChange={setEmail}/>
            </div>
            <div className='href-section'>
                <button className='href-button' onClick={() => {handleChangeWindow('Authorizating')}}>Регистрация</button>
                <button className='href-button' onClick={() => {handleChangeWindow('Login')}}>Войти</button>
            </div>
            <button className='auth-button'>Восстановить пароль</button>
        </div>
    )
}