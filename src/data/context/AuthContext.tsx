'use client'

import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Usando o useRouter corretamente
import { auth } from "@/lib/firebase"; // Importando a instância do Firebase auth
import { signInWithPopup, GoogleAuthProvider, User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; // Importando funções de autenticação
import Cookies from 'js-cookie';
import Usuario from "@/model/Usuario"; // Certifique-se de que o modelo de usuário está correto

interface AuthContextProps {
    usuario?: Usuario | null;
    children?: React.ReactNode;
    carregando?: boolean
    login?: (email: string, senha: string) => Promise<void>;
    cadastrar?: (email: string, senha: string) => Promise<void>;
    loginGoogle?: () => Promise<void>;
    logout?: () => Promise<void>;

}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken();
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName || "",
        email: usuarioFirebase.email || "",
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId || "",
        imagemURL: usuarioFirebase.photoURL || "",
    };
}

export function AuthProvider({ children }: AuthContextProps) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const router = useRouter(); // Usando useRouter corretamente

    async function configurarSessao(usuarioFirebase: User | null) {
        if (usuarioFirebase && usuarioFirebase.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            gerenciarCookie(false)
            setUsuario(null)
            setCarregando(false)
            return false
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await auth.signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    async function loginGoogle() {
        const provider = new GoogleAuthProvider()

        try {
            setCarregando(true)
            const result = await signInWithPopup(auth, provider)
            configurarSessao(result.user)
            router.push('/')
            console.log("Usuário logado:", result.user)
        } catch (error) {
            console.error("Erro ao autenticar com Google:", error)
        } finally {
            setCarregando(false)
        }
    }
    async function login(email: string, senha: string) {
        try {
            setCarregando(true)
            const result = await signInWithEmailAndPassword(auth, email, senha)
            configurarSessao(result.user)
            router.push('/')
            console.log("Usuário logado:", result.user)
        } catch (error) {
            console.error("Erro ao autenticar com Google:", error)
        } finally {
            setCarregando(false)
        }
    }
    async function cadastrar(email: string, senha: string) {
        try {
            setCarregando(true)
            const result = await createUserWithEmailAndPassword(auth, email, senha)
            configurarSessao(result.user)
            router.push('/')
            console.log("Usuário logado:", result.user)
        } catch (error) {
            console.error("Erro ao autenticar com Google:", error)
        } finally {
            setCarregando(false)
        }
    }

    function gerenciarCookie(logado: boolean) {
        if (logado) {
            Cookies.set('admin-auth', JSON.stringify(logado), {
                expires: 7
            })
        } else {
            Cookies.remove('admin-auth')
        }
    }

    // Recuperando o usuário do cookie ou localStorage na inicialização
    useEffect(() => {
        // Verificando se o cookie contém informações de autenticação
        const usuarioAuth = Cookies.get('admin-auth');
        if (usuarioAuth) {
            // Aqui você poderia adicionar a lógica para recuperar o token do Firebase
            auth.onIdTokenChanged((user) => {
                if (user) {
                    configurarSessao(user);
                } else {
                    setCarregando(false);
                }
            });
        } else {
            setCarregando(false); // Se não houver usuário no cookie, termina o carregamento
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            usuario, carregando, loginGoogle, logout, login, cadastrar
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
