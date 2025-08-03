import { Outlet, Link, useRouteLoaderData } from 'react-router-dom';
import '../ComponentsCss/layout.css';
import { Menu } from './menu';
import { Produto } from '../inteface/produtos';
import { ProdutosProvider } from '../data/produtos_context';


export const Layout: React.FC = () => {
      const dados = useRouteLoaderData("id") as Produto[];
  
  return (
    <ProdutosProvider dadosIniciais={dados}>
      <div className="layout">
        <header className="header">
          <h1>Ecommerce de celulares</h1>
        </header>
        <div className="main-container">
          <Menu />
          <main className="content">
            <Outlet /> 
          </main>
        </div>
      </div>
    </ProdutosProvider>
  );
};