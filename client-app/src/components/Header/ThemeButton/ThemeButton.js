import {useState, useEffect, useContext} from 'react'
import react from 'react'
import { ThemeContext } from '../../../providers/ThemeProvider/ThemeProvider'
import {ReactComponent as LightTheme} from '../../icons/light.svg'
import {ReactComponent as DarkTheme} from '../../icons/dark.svg'
import './ThemeButton.css'
import '../../Main.css'


const ThemeButton = () =>
{
    const [theme, setTheme] = useContext(ThemeContext)

    const changeTheme = () =>
    {
        setTheme(theme == 'dark' ? 'light' : 'dark')
    }

    return(
        <button className='theme-button' onClick={changeTheme}>
            {(theme == "dark" &&
            (
                <DarkTheme className='theme-icon'>

                </DarkTheme>
            )) ||
            (theme == 'light' &&
            (
                <LightTheme className='theme-icon'>

                </LightTheme>
            ))}
        </button>
    )
}

export default ThemeButton;