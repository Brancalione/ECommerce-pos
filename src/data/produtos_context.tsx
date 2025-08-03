import React, { createContext, useContext, useState } from 'react';
import { Produto , ProdutosContextType } from '../inteface/produtos';

const ProdutosContext = createContext<ProdutosContextType | undefined>(undefined);

export const useProdutos = () => {
  const context = useContext(ProdutosContext);
  if (!context) {
    throw new Error("useProdutos deve ser usado dentro de ProdutosProvider");
  }
  return context;
};

export const ProdutosProvider: React.FC<{ children: React.ReactNode; dadosIniciais: Produto[] }> = ({ children, dadosIniciais }) => {
  const [produtos, setProdutos] = useState<Produto[]>(dadosIniciais);

  const adicionarProduto = (produto: Produto) => {
    setProdutos((prev) => [...prev, produto]);
  };

  return (
    <ProdutosContext.Provider value={{ produtos, adicionarProduto }}>
      {children}
    </ProdutosContext.Provider>
  );
};