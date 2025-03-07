'use client'
import Layout from "@/components/template/Layout";
import { AppProvider } from "@/data/context/AppContext";

export default function Home() {
	return (
		<AppProvider>
			<Layout titulo="Pagina inicial" subtitulo="Estamos construindo um template adm">
				<h2>Um conteudo bem legal</h2>
			</Layout>
		</AppProvider>
	);
}
