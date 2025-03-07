'use client'
import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    tema?: string,
    alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

interface AppProviderProps {
    children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
    const [tema, setTema] = useState<string>('light')
    function alternarTema() {
        setTema(tema === 'light' ? 'dark' : 'light')
        localStorage.setItem('tema', tema === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        if (temaSalvo) {
            setTema(temaSalvo); // Garante que o tema sempre será uma string válida
        }
    }, [])

    return (
        <AppContext.Provider value={{
            tema: tema,
            alternarTema: alternarTema
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext