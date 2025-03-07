'use client'
import useAppData from "@/data/hook/useAppData"
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import MenuLateral from "./MenuLateral"
import ForcarAutenticacao from "../autenticacao/forcarAutenticacao"

interface LayoutProps {
    titulo: string,
    subtitulo: string
    children?: React.ReactElement
}

export default function Layout({ titulo, subtitulo, children }: LayoutProps) {
    const { tema } = useAppData()

    return (
        <ForcarAutenticacao>
            <div className={`flex h-screen w-screen ${tema}`}>
                <MenuLateral></MenuLateral>
                <div className="flex flex-col bg-gray-300 text-black w-full h-full p-6 dark:bg-gray-900 dark:text-white">
                    <Cabecalho titulo={titulo} subtitulo={subtitulo}></Cabecalho>
                    <Conteudo>
                        {children}
                    </Conteudo>
                </div>
            </div>
        </ForcarAutenticacao>
    )
}