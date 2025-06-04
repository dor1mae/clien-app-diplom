import {React, useState, createContext, useContext, useEffect} from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>
{
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    

    const login = async (login, password) =>
    {
        const response = await fetch(`http://localhost:5004/api/user/login`, {
            method:'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Login: login, Password: password, Nickname:"", Email:""})
        })
        const data = await response.json()
        if(data.token)
        {
            setIsAuthenticated(true)
        }
        return data
    }

    const registration = async (login, password, nickname, email) =>
    {
        const response = await fetch(`http://localhost:5004/api/user/newuser`, {
            method:'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Login: login, Password: password, Nickname:nickname, Email:email})
        })
        const data = await response.json()
        return data
    }

    const getUser = async () =>
    {
        try{
            const response = await fetch(`http://localhost:5004/api/user/user`, {
                method:'GET',
                credentials:'include'
            })
            if(!response.ok) {
                throw new Error("Ошибка запроса")
            }
            const data = await response.json()
            return [data, response.ok]
            
        }
        catch(e)
        {
            console.error("Error: ", e)
            return e
        }
    }

    const logout = async () =>
    {
        await fetch(`http://localhost:5004/api/user/logout`,
            {
                method:"POST",
                credentials:"include"
            }
        )
        .catch(error => console.error('Error: ', error))
    }

    useEffect(()=>
    {
        const fetchUser = async () =>
        {
            try
            {
                const [user, response]= await getUser()
                if(response)
                {
                    setIsAuthenticated(true)
                }
                else
                {
                    setIsAuthenticated(false)
                }

                setUser(user)
                console.log(user, " ", response)
            }
            catch(e)
            {
                console.error("Error: ", e)
            }
        }

        fetchUser()
        console.log(`Auth: ${isAuthenticated}`)
    }, [isAuthenticated])

    return(
        <AuthContext.Provider value={{ login, logout, getUser, 
                                        user, setUser, 
                                        registration, isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export const useAuthContext = () => useContext(AuthContext)