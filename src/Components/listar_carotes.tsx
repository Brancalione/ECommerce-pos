import { useState, useEffect } from "react";
import { Produto } from "../inteface/produtos";
import { Cartao_produtos } from "./cartao_produtos";
import '../ComponentsCss/input_filtrar.css';
import { Link, useLoaderData } from "react-router-dom";

export const ListarCartoes: React.FC = () => {
    const produtos = useLoaderData() as Produto[];

    const [todosProdutos] = useState<Produto[]>(produtos);
    const [produtosExibidos, setProdutosExibidos] = useState<Produto[]>(produtos);
    const [idFiltro, setIdFiltro] = useState<string>(''); 

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (idFiltro) {
                const idNumerico = parseInt(idFiltro, 10);
                const produtosFiltrados = todosProdutos.filter((produto) => produto.id === idNumerico);
                setProdutosExibidos(produtosFiltrados);
            } else {
                setProdutosExibidos(todosProdutos);
            }
        }, 5000); 
        return () => {
            clearTimeout(timerId);
        };
    }, [idFiltro, todosProdutos]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdFiltro(event.target.value);
    };

    return (
        <>
            <div className="botoes_topo">
                <div className="input_filtrar">
                    <input id="input_filtrar"
                        type="number"
                        placeholder="Código"
                        value={idFiltro}
                        onChange={handleChange} />
                </div>
                <Link to="/listar/novo">
                    <button className="botao_cadastrar">Novo Produto</button>
                </Link>
            </div>
            {produtosExibidos.map((produto: Produto) => (
                <Cartao_produtos key={produto.id} produto={produto} />
            ))}
        </>
    )
}