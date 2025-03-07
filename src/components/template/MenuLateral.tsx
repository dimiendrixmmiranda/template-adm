'use client'
import { FaHome } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { PiBellSimpleRingingFill } from "react-icons/pi";
import Logo from "./Logo";
import useAuth from "@/data/hook/useAuth";

export default function MenuLateral() {
    const { logout } = useAuth()

    return (
        <aside className="flex flex-col bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-800 flex flex-col justify-center items-center">
                <Logo></Logo>
            </div>
            <ul className="flex-grow">
                <MenuItem icone={<FaHome />} texto="Home" url="/"></MenuItem>
                <MenuItem icone={<IoSettings />} texto="Ajustes" url="/ajustes"></MenuItem>
                <MenuItem icone={<PiBellSimpleRingingFill />} texto="Notificações" url="/notificacoes"></MenuItem>
            </ul>
            <ul className="">
                <MenuItem icone={<IoLogOut />} texto="Sair" onClick={logout} className="text-red-600 hover:bg-red-400 hover:text-white"></MenuItem>
            </ul>
        </aside>
    )
}