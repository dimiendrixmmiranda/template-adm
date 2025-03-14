'use client'
import AuthInput from "@/components/autenticacao/AuthInput";
import ImagemAleatoria from "@/components/imagemAleatoria/ImagemAleatoria";
import useAuth from "@/data/hook/useAuth";
import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { FaGoogle } from "react-icons/fa";

export default function Page() {

    const { loginGoogle, cadastrar, login } = useAuth()

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState<string | null>(null)


    async function submeter() {
        if (!cadastrar) return;
    
        if (modo === "login") {
            if (email && senha) {
                if (!login) {
                    exibirErro("O login ainda não está disponível. Tente novamente mais tarde.")
                    return
                }
                try {
                    // Aguarda a execução do login e trata qualquer erro
                    await login(email, senha)
                    console.log("Login realizado com sucesso")
                } catch (error) {
                    console.error("Erro ao fazer login:", error)
                    exibirErro("Ocorreu um erro no login. Verifique suas credenciais.")
                }
            } else {
                exibirErro("Preencha todos os campos!")
            }
        } else {
            if (email && senha) {
                try {
                    await cadastrar(email, senha)
                    console.log("Cadastro realizado com sucesso")
                } catch (error) {
                    console.error("Erro ao cadastrar:", error)
                    exibirErro("Ocorreu um erro no cadastro")
                }
            } else {
                exibirErro("Preencha todos os campos!")
            }
        }
    }



    function exibirErro(msg: string, tempoEmSegundos: number = 5) {
        console.log("Erro definido:", msg); // Verifica se o erro foi atualizado
        setErro(msg);
        setTimeout(() => setErro(null), tempoEmSegundos * 1000);
    }


    return (
        <div className="bg-zinc-200 text-black flex justify-center items-center w-screen h-screen md:grid md:grid-cols-2 lg:grid-cols-3">
            <ImagemAleatoria></ImagemAleatoria>

            <div className="w-full p-4 lg:p-8 lg:col-start-2 lg:col-end-4 xl:max-w-[800px] xl:mx-auto">
                <h1 className="text-xl font-bold mb-5">{modo === 'login' ? 'Entre com sua conta' : 'Cadastre na plataforma'}</h1>
                {
                    erro ? (
                        <div className="bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg flex items-center gap-2">
                            <CgDanger />
                            <span>{erro}</span>
                        </div>
                    ) : ''
                }

                <AuthInput label="Email" valor={email} valorMudou={setEmail} tipo="email" obrigatorio></AuthInput>
                <AuthInput label="Senha" valor={senha} valorMudou={setSenha} tipo="password" obrigatorio></AuthInput>
                <button onClick={submeter} className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3">
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button onClick={loginGoogle} className="w-full flex items-center gap-1 bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3">
                    Entrar com o Google <FaGoogle />
                </button>

                {
                    modo === 'login' ? (
                        <p className="mt-8">
                            Novo por aqui? <a onClick={() => setModo('cadastro')} className="text-blue-700 cursor-pointer font-semibold">
                                Cadastre-se gratuitamente
                            </a>
                        </p>
                    ) : (
                        <p className="mt-8">
                            Ja faz parte da nossa comunidade? <a onClick={() => setModo('login')} className="text-blue-700 cursor-pointer font-semibold">
                                Entre com suas credenciais
                            </a>
                        </p>
                    )
                }
            </div>
        </div>
    )
}