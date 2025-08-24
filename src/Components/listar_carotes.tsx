import { useState, useEffect } from "react";
import { Produto } from "../inteface/produtos";
import { Cartao_produtos } from "./cartao_produtos";
import '../ComponentsCss/input_filtrar.css';
import { Link, useLoaderData } from "react-router-dom";

export const ListarCartoes: React.FC = () => {
    const produtosIniciais = useLoaderData() as Produto[];

    const [produtosExibidos, setProdutosExibidos] = useState<Produto[]>(produtosIniciais);
    const [idFiltro, setIdFiltro] = useState<string>('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (idFiltro) {
                const idNumerico = parseInt(idFiltro, 10);
                const produtosFiltrados = produtosIniciais.filter((produto) => produto.id === idNumerico);
                setProdutosExibidos(produtosFiltrados);
            } else {
                setProdutosExibidos(produtosIniciais);
            }
        }, 500);
        return () => {
            clearTimeout(timerId);
        };
    }, [idFiltro, produtosIniciais]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdFiltro(event.target.value);
    };

    const handleProductDeleted = (idToDelete: number) => {
      const updatedList = produtosExibidos.filter(produto => produto.id !== idToDelete);
      setProdutosExibidos(updatedList);
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
                <Cartao_produtos 
                    key={produto.id} 
                    produto={produto} 
                />
            ))}
        </>
    )
}