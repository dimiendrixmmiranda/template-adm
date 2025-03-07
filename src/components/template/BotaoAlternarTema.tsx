import { FaMoon, FaSun } from "react-icons/fa"

interface BotaoAlternarTemaProps {
    tema: string,
    alternarTema: () => void
}

export default function BotaoAlternarTema({ tema, alternarTema }: BotaoAlternarTemaProps) {
    return tema === 'dark' ? (
        <div onClick={alternarTema} className="bg-gradient-to-r from-yellow-300 to-yellow-600 w-14 h-8 flex items-center gap-1 cursor-pointer p-1 rounded-full lg:w-24">
            <div className="flex justify-center items-center w-6 h-6 rounded-full bg-white text-yellow-600">
                <FaSun />
            </div>
            <div className="justify-center items-center hidden flex-1 text-center lg:flex">
                <span>Claro</span>
            </div>
        </div>
    ) : (
        <div onClick={alternarTema} className="bg-gradient-to-r from-gray-600 to-gray-900 w-14 h-8 flex items-center gap-1 cursor-pointer p-1 rounded-full text-white lg:w-24">
            <div className="justify-center items-center hidden flex-1 text-center lg:flex">
                <span>Escuro</span>
            </div>
            <div className="flex justify-center items-center w-6 h-6 rounded-full bg-black text-yellow-600">
                <FaMoon />
            </div>
        </div>
    )
}