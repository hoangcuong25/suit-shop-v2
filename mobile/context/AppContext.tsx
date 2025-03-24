import { createContext, ReactNode, useEffect, useState } from "react"
import * as Keychain from 'react-native-keychain';

interface AdminContextType {
    token: string | false
    setToken: React.Dispatch<React.SetStateAction<string | false>>
}

export const AdminContext = createContext<AdminContextType>({
    token: false,
    setToken: () => { },
})

interface AdminContextProviderProps {
    children: ReactNode
}

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {

    const [token, setToken] = useState<string | false>(false)

    const loadToken = async () => {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) setToken(credentials.password);
    }

    const value = {
        token, setToken,
    }

    useEffect(() => {
        loadToken()
    }, [])

    return (
        <AdminContext.Provider value={value} >
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider