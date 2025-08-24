import React from 'react';
import { shallow } from 'enzyme';

const useLoaderData = jest.fn();
jest.mock('react-router-dom', () => ({
  __esModule: true,
  Link: ({ to, children, ...p }: any) => <a href={to} {...p}>{children}</a>,
  useLoaderData: () => useLoaderData(),
}));

import { ListarCartoes } from '../listar_carotes';

describe('ListarCartoes', () => {
  it('Jest: componente existe', () => {
    expect(ListarCartoes).toBeDefined();
  });

  it('Enzyme: renderiza 2 cartões quando o loader retorna 2 produtos', () => {
    useLoaderData.mockReturnValueOnce([
      { id: 1, name: 'P1', description: '', price: 10, category: 'A', pictureUrl: '' },
      { id: 2, name: 'P2', description: '', price: 20, category: 'B', pictureUrl: '' },
    ]);
    const w = shallow(<ListarCartoes />);
    // Como é shallow, contamos o componente filho diretamente
    expect(w.find('Cartao_produtos')).toHaveLength(2);
  });
});
