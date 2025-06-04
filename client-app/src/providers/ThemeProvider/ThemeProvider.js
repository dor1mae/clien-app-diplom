import { createContext, useEffect, useState } from "react";


export const ThemeContext = createContext();


export function ThemeProvider({children})
{
    const [theme, setTheme] = useState('dark')

    useEffect(() =>
    {
        if(theme === 'light')
        {
            document.body.classList.add('light')
        }
        else
        {
            document.body.classList.remove('light')
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}