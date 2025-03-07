import Link from "next/link"

interface MenuItemProps {
    texto: string
    icone: React.ReactElement
    className?: string,
    url?: string
    onClick?: (evento: React.MouseEvent<HTMLLIElement>) => void
}

export default function MenuItem({ url, texto, icone, className, onClick }: MenuItemProps) {
    function renderizarLink() {
        return (
            <div className={`flex flex-col justify-center items-center h-20 w-20  ${className}`}>
                <div className="text-2xl">
                    {icone}
                </div>
                <p className="text-xs font-light">
                    {texto}
                </p>
            </div>
        )
    }
    return (
        <li className="hover:bg-gray-800 hover:text-gray-200 text-black cursor-pointer dark:text-gray-400 dark:hover:text-gray-800 dark:hover:bg-gray-300" onClick={ onClick }>
            {
                url ? (
                    <Link href={url} className="flex flex-col justify-center items-center w-20 h-20">
                        {renderizarLink()}
                    </Link>
                ) : (
                    renderizarLink()
                )
            }
        </li>
    )
}