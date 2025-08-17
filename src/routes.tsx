import { createBrowserRouter, redirect } from "react-router-dom";
import { PageInicial } from "./Components/page_inicial"; 
import { ListarCartoes } from "./Components/listar_carotes";
import { UploadArquivos } from "./Components/upload_arquivos";
import { Layout } from "./Components/layout";
import { NovoProduto } from "./Components/novo_produto";
import { Produto, ProdutoSemID } from "./inteface/produtos";
import { carregarJson } from "./data/carregar_json";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    id: "id",

    children: [
      { path: '', element: <PageInicial /> },

      {
        path: 'listar',
        element: <ListarCartoes />,
        loader: carregarJson, 
      },

      {
        path: 'listar/novo',
        element: <NovoProduto />,
        action: async ({ request }) => { 
          const formData = await request.formData();

          const novoProduto: ProdutoSemID = {
            name: String(formData.get("name")),
            description: String(formData.get("description")),
            price: Number(formData.get("price")),
            category: String(formData.get("category")),
            pictureUrl: String(formData.get("pictureUrl")),
          };
          console.log(novoProduto)  
          await fetch("http://localhost:3001/api/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoProduto),
          });
          console.log("AQ2")  
          return redirect("/listar");
        },
      },

      { path: 'upload', element: <UploadArquivos /> },
    ],
  },
]);
