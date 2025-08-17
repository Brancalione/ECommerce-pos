import { Form, Link } from "react-router-dom";
import '../ComponentsCss/novo_produto.css';

export const NovoProduto = () => {
  return (
    <>
      <h2>Formulário de Produto</h2>
      <Form method="post" className="formulario-produto">
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
      </Form>
    </>
  );
};
