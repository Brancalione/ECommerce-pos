import { createBrowserRouter, redirect } from "react-router-dom";
import { PageInicial } from "./Components/page_inicial"; 
import { ListarCartoes } from "./Components/listar_carotes";
import { UploadArquivos } from "./Components/upload_arquivos";
import { Layout } from "./Components/layout";
import { NovoProduto } from "./Components/novo_produto";
import { Produto, ProdutoSemID } from "./inteface/produtos";
import { carregarJson } from "./data/carregar_json";
import axios from 'axios';

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

          try {
            await axios.post("http://localhost:3001/api/product", novoProduto);
          } catch (error: any) {
          }
          return redirect("/listar");
        },
      },

      {
        path: 'listar/editar/:id',
        element: <NovoProduto />,
        loader: async ({ params }) => {
          const { id } = params;
          try {
            const res = await axios.get(`http://localhost:3001/api/product/${id}`);
            return res.data;
          } catch (error: any) {
            throw new Error("Erro ao carregar produto: " + (error.response?.data || error.message));
          }
        },
        action: async ({ request, params }) => {
          const { id } = params; // vem da URL
          const formData = await request.formData();

          const produtoAtualizado = {
            // id: Number(id),  <-- REMOVER esta linha
            name: String(formData.get("name")),
            description: String(formData.get("description")),
            price: Number(formData.get("price")),
            category: String(formData.get("category")),
            pictureUrl: String(formData.get("pictureUrl")),
          };

          try {
            await axios.put(`http://localhost:3001/api/product/${id}`, produtoAtualizado);
          } catch (error: any) {
            alert("Erro ao atualizar: " + (error.response?.data || error.message));
          }
          return redirect("/listar");
        },
      },

      {
        path: 'listar/excluir/:id',
        action: async ({ params }) => {
          const { id } = params as { id: string };
          try {
            await axios.delete(`http://localhost:3001/api/product/${id}`);
          } catch (error: any) {
          }
          return redirect("/listar");
        },
      },
      { path: 'upload', element: <UploadArquivos /> },
    ],
  },
]);
