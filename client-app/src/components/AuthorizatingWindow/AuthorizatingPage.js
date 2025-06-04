import React from "react";
import {useState, useContext, useEffect} from 'react'
import './Authorizating.css'
import '../../components/Main.css'
import AuthorizatingWindow from './AuthorizatingWindow'
import { LoginWindow } from "./LoginWindow";
import { RecoverPasswordWindow } from "./RecoverPasswordWindow";


const AuthorizatingPage = () =>
{
    const windows = ['Authorizating', 'Login', 'RecoverPassword']
    const [choicedWindow, setChoicedWindow] = useState('Login')
    const height = window.innerHeight;

    const handleSetChoicedWindow = (window) =>
    {
        setChoicedWindow(window)
    }


    return(
        <div className="vertical-column-container">
            <div className="center-setter">
                <div className="window-container" style={{height: height}}>
                    <div className='window'>
                        {(choicedWindow === windows[0]) && (
                            <AuthorizatingWindow handleSetChoicedWindow={handleSetChoicedWindow}/>
                        )}
                        {choicedWindow === windows[1] && (
                            <LoginWindow handleSetChoicedWindow={handleSetChoicedWindow}/>
                        )}
                        {choicedWindow === windows[2] && (
                            <RecoverPasswordWindow handleSetChoicedWindow={handleSetChoicedWindow}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthorizatingPage;