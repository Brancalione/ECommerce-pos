import { FormEvent, useState } from "react";
import { Produto } from "../inteface/produtos";
import '../ComponentsCss/novo_produto.css';
import { Link, useNavigate } from "react-router-dom";
import { useProdutos } from "../data/produtos_context";

export const NovoProduto = () => {
   const { adicionarProduto } = useProdutos();
   const navigate = useNavigate();

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const novoProduto: Produto = {
      id: Number(data.get("id")),
      name: String(data.get("name")),
      description: String(data.get("description")),
      price: Number(data.get("price")),
      category: String(data.get("category")),
      pictureUrl: String(data.get("pictureUrl")),
    };

    adicionarProduto(novoProduto);
    navigate("/listar");
  };
 return (
    <>
      <h2>Formulário de Produto</h2>
      <form onSubmit={handleSave} className="formulario-produto">
        <input type="number" name="id" placeholder="Código" required />
        <input type="text" name="name" placeholder="Nome" required />
        <textarea name="description" placeholder="Descrição" required />
        <input type="number" name="price" placeholder="Preço" step="0.01" required />
        <input type="text" name="category" placeholder="Categoria" required />
        <input type="text" name="pictureUrl" placeholder="URL da Imagem" required />

        <div className="botoes-formulario">
          <button className="botao-salvar" type="submit">Salvar</button>
          <Link to="../listar">
            <button type="button">Cancelar</button>
          </Link>
        </div>
      </form>
    </>
  );
};