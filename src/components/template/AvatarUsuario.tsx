import useAuth from "@/data/hook/useAuth";
import Image from "next/image";
import Link from "next/link";

interface AvatarUsuarioProps{
    className?: string
}

export default function AvatarUsuario({className}: AvatarUsuarioProps) {
    const { usuario } = useAuth()
    return (
        <Link href={'/perfil'}>
            <Image src={usuario?.imagemURL ? usuario?.imagemURL :  '/images/avatar.svg'} alt="avatar do usuario logado" width={35} height={35} className={`rounded-full cursor-pointer ${className}`}></Image>
        </Link>
    )
}