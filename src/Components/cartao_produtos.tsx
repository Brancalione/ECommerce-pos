import '../ComponentsCss/cartao_prod.css';
import { Produto } from '../inteface/produtos';
import { Form, Link } from "react-router-dom";

interface CartaoProps {
  produto: Produto;
}

export const Cartao_produtos: React.FC<CartaoProps> = ({ produto }) => {

  return (
    <div className='containerPrincipal'>
      <section className="sectionPrincipal">
        <div className="imagem">
          <img src={produto.pictureUrl} alt={produto.name} />
        </div>
        <div className="texto">
          <h3> {produto.name} </h3>
           <p> {produto.id} </p>
          <p> {produto.category} </p>
          <p>R$ {produto.price} </p>
        </div>
        <div className="botoes">
          <Link to={`/listar/editar/${produto.id}`}>
            <button id="btn-editar">Editar</button>
          </Link>
          <Form
            method="post"
            action={`/listar/excluir/${produto.id}`}
            onSubmit={(e) => {
              const ok = window.confirm("Você quer mesmo excluir este produto?");
              if (!ok) e.preventDefault();
            }}
          >
            <button id="btn-excluir" type="submit">Excluir</button>
          </Form>       
        </div>
      </section>
    </div>
  );
}