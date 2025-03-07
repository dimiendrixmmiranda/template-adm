interface AuthInputProps {
    label: string
    valor: string
    obrigatorio: boolean
    tipo: 'text' | 'email' | 'password'
    valorMudou: (novoValor: string) => void
}

export default function AuthInput({ label, valor, tipo, obrigatorio, valorMudou }: AuthInputProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor="">{label}</label>
            <input type={tipo ?? 'text'} value={valor} onChange={(e) => valorMudou(e.target.value)} required={obrigatorio} className="px-4 py-2 rounded-lg bg-gray-300 my-2 focus:border-blue-500 focus:outline-none"/>
        </div>
    )
}