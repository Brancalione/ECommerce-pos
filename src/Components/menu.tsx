import { Link } from "react-router-dom";
import '../ComponentsCss/menu.css';


export const Menu = () => {
  return (
    <nav id="nav_menu">
      <Link to="/" className="itens_menu">Início</Link>
      <Link to="/listar" className="itens_menu">Listar Cartões</Link>
      <Link to="/upload" className="itens_menu">Upload</Link>
    </nav>
  );
};