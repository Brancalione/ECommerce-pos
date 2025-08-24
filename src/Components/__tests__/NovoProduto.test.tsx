import React from 'react';
import { shallow } from 'enzyme';

const useLoaderData = jest.fn(() => undefined);
const useNavigate = jest.fn(() => () => {});
jest.mock('react-router-dom', () => ({
  __esModule: true,
  Form: ({ children, ...p }: any) => <form {...p}>{children}</form>,
  useLoaderData: () => useLoaderData(),
  useNavigate: () => useNavigate(),
}));

import { NovoProduto } from '../novo_produto';

describe('NovoProduto', () => {
  it('Jest: componente existe', () => {
    expect(NovoProduto).toBeDefined();
  });

  it('Enzyme: exibe título "Novo Produto" quando criando', () => {
    useLoaderData.mockReturnValueOnce(undefined);
    const w = shallow(<NovoProduto />);
    expect(w.find('h2').text()).toContain('Novo Produto');
  });
});
