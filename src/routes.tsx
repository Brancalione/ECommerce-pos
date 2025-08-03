// routes.jsx
import { createBrowserRouter } from "react-router-dom";
import { PageInicial } from "./Components/page_inicial"; 
import { ListarCartoes } from "./Components/listar_carotes";
import { UploadArquivos } from "./Components/upload_arquivos";
import { Layout } from "./Components/layout";
import { NovoProduto } from "./Components/novo_produto";
import { carregarJson } from "./data/carregar_json";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    id: "id",
    loader: carregarJson,
    children: [
      { path: '', element: <PageInicial /> }, 
      { path: 'listar', element: <ListarCartoes /> },
      { path: 'listar/novo', element: <NovoProduto /> }, 
      { path: 'upload', element: <UploadArquivos /> },
    ],
  },
]);