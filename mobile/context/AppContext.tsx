import { createContext, ReactNode, useEffect, useState } from "react"
import * as Keychain from 'react-native-keychain';

interface AppContextType {
    token: string | false
    setToken: React.Dispatch<React.SetStateAction<string | false>>
}

export const AppContext = createContext<AppContextType>({
    token: false,
    setToken: () => { },
})

interface AdminContextProviderProps {
    children: ReactNode
}

const AppContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {

    const [token, setToken] = useState<string | false>(false)

    const loadToken = async () => {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                setToken(credentials.password);
            }
        } catch (error) {
            console.error("Error loading token:", error);
        }
    }

    const value = {
        token, setToken,
    }

    useEffect(() => {
        loadToken()
    }, [])

    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider