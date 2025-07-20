import '../ComponentsCss/cartao_prod.css';
import { Produto } from '../inteface/produtos';

export const Cartao_produtos: React.FC<{ produto: Produto }> = ({ produto }) => {
  return (
    <div className='containerPrincipal'>
      <section className="sectionPrincipal">
        <div className="imagem">
          <img src= {produto.pictureUrl} ></img>
        </div>
        <div className="texto">
          <h3> {produto.name} </h3>
          <p> {produto.category} </p>
          <p>R$ {produto.price} </p>
        </div>
        <div className="botoes">
          <button id="btn-editar">Editar</button>
          <button id="btn-excluir">Excluir</button>
        </div>
      </section>
    </div>
  )
}