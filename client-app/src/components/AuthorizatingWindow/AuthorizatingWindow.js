import {React, useState, useContext} from 'react'
import { useAuthContext } from '../../providers/AuthProvider'
import {useNavigate} from 'react-router-dom'



const AuthorizatingWindow = (props) =>
{
    const [userlogin, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [reppassword, setRepPassword] = useState('')
    const {registration, isAuthenticated, setToken, setIsAuthenticated} = useAuthContext()

    const nav = useNavigate()

    const handleChangeWindow = (window) =>
    {
        props.handleSetChoicedWindow(window)
    }

    const handleInputChange = async (e) =>
    {
        switch (e.target.name)
        {
            case 'login':
                setLogin(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            case 'reppassword':
                setRepPassword(e.target.value)
                break
            case 'nickname':
                setNickname(e.target.value)
                break
        }
    }

    const handleAuth = async(inputlogin, inputpassword, inputnickname, inputemail) =>
    {
        try
        {
            const data = await registration(inputlogin, inputpassword, inputnickname, inputemail)
            setToken(data.token)
            setIsAuthenticated(true)
        }
        catch(e)
        {
            console.error("Error: ", e)
        }
    }

    return(
        <div>
            <div className='window-header'>Регистрация</div>
            <div className='input-box'>
                <div className='input-header'>Логин</div>
                <input className='input'
                name='login'
                type='text'
                autoComplete='false'
                placeholder='Введите логин'
                value={userlogin}
                onChange={handleInputChange}/>
            </div>
            <div className='input-box'>
                <div className='input-header'>Email</div>
                <input className='input'
                name='email'
                type='email'
                placeholder='Введите email'
                autoComplete='false'
                value={email}
                onChange={handleInputChange}/>
            </div>
            <div className='input-box'>
                <div className='input-header'>Имя пользователя</div>
                <input className='input'
                name='nickname'
                type='text'
                placeholder='Введите имя пользователя'
                autoComplete='false'
                value={nickname}
                onChange={handleInputChange}/>
            </div>
            <div className='input-box'>
                <div className='input-header'>Пароль</div>
                <div className='password-auth-box'>
                <input className='input'
                name='password'
                type='password'
                placeholder='Введите пароль'
                value={password}
                autoComplete='false'
                onChange={handleInputChange}/>
                <input className='input'
                name='reppassword'
                type='password'
                placeholder='Повторите пароль'
                value={reppassword}
                autoComplete='false'
                onChange={handleInputChange}/>
                </div>
            </div>
            <div className='href-section'>
                <button className='href-button' onClick={() => {handleChangeWindow('Login')}}>Войти</button>
                <button className='href-button' onClick={() => {handleChangeWindow('RecoverPassword')}}>Восстановить пароль</button>
            </div>
            <button className='auth-button'
            onClick={() =>
                {
                    if(password === reppassword)
                    {
                        handleAuth(userlogin, password, nickname, email)
                        nav(`/home`)
                    }
                    else
                    {
                        setPassword('')
                        setRepPassword('')
                    }
                }
            }>
                Зарегистрироваться
            </button>
        </div>
    )
}

export default AuthorizatingWindow