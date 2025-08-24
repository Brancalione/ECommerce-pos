import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { Produto, ProdutoSemID } from "../inteface/produtos";
import '../ComponentsCss/novo_produto.css';

export const NovoProduto: React.FC = () => {
  const navigate = useNavigate();

  const produtoExistente = useLoaderData() as Produto | undefined;

  return (
    <div>
      <h2>{produtoExistente ? "Editar Produto" : "Novo Produto"}</h2>
      <Form method="post" className="formulario-produto">
        <div>
          <input
            placeholder="Nome"
            type="text"
            name="name"
            defaultValue={produtoExistente?.name ?? ""}
            required
          />
        </div>
        <div>
          <input
            placeholder="Descrição"
            type="text"
            name="description"
            defaultValue={produtoExistente?.description ?? ""}
            required
          />
        </div>
        <div>
          <input
            placeholder="Preço"
            type="number"
            name="price"
            defaultValue={produtoExistente?.price ?? ""}
            required
          />
        </div>
        <div>
          <input
            placeholder="Categoria"
            type="text"
            name="category"
            defaultValue={produtoExistente?.category ?? ""}
            required
          />
        </div>
        <div>
          <input
            placeholder="URL Imagem"
            type="text"
            name="pictureUrl"
            defaultValue={produtoExistente?.pictureUrl ?? ""}
            required
          />
        </div>
        <button type="submit" className="botao-salvar">
          {produtoExistente ? "Salvar " : "Cadastrar "}
        </button>
        <button type="button" onClick={() => navigate("/listar")}>
          Cancelar
        </button>
      </Form>
    </div>
  );
};
