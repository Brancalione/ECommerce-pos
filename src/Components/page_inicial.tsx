import { Link } from "react-router-dom";

export const PageInicial = () => {
  return (
    <div>
      <main >
        <h2>Bem-vindo!</h2>
        <p>Não tive criatividade para desenvolver essa página ;/</p>
        <Link to="https://www.pudim.com.br/">PUDIM</Link>
      </main>
    </div>
  );
};