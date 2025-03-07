'use client'
import useAppData from "@/data/hook/useAppData"
import BotaoAlternarTema from "./BotaoAlternarTema"
import Titulo from "./Titulo"
import AvatarUsuario from "./AvatarUsuario"

interface CabecalhoProps {
    titulo: string,
    subtitulo: string
}

export default function Cabecalho({ titulo, subtitulo }: CabecalhoProps) {
    const { tema, alternarTema } = useAppData()

    return (
        <div className="flex">
            <Titulo titulo={titulo} subtitulo={subtitulo}></Titulo>
            {tema && alternarTema && (
                <div className="flex flex-grow justify-end items-center gap-2">
                    <BotaoAlternarTema alternarTema={alternarTema} tema={tema} />
                    <AvatarUsuario></AvatarUsuario>
                </div>
            )}
        </div>
    )
}