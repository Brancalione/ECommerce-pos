import React from 'react';
import { shallow } from 'enzyme';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Link: ({ to, children, ...p }: any) => <a href={to} {...p}>{children}</a>,
  Form: ({ children, ...p }: any) => <form {...p}>{children}</form>,
}));

import { Cartao_produtos } from '../cartao_produtos';

describe('Cartao_produtos', () => {
  it('Jest: componente existe', () => {
    expect(Cartao_produtos).toBeDefined();
  });

  it('Enzyme: renderiza o nome do produto no <h3>', () => {
    const produto = { id: '1', name: 'Celular X', description: '', price: 1000, category: 'Smart', pictureUrl: '' };
    const w = shallow(<Cartao_produtos produto={produto as any} />);
    expect(w.find('h3').text()).toContain('Celular X');
  });
});
