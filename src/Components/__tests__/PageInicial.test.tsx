import React from 'react';
import { shallow } from 'enzyme';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Link: ({ to, children, ...p }: any) => <a href={to} {...p}>{children}</a>,
}));

import { PageInicial } from '../page_inicial';

describe('PageInicial', () => {
  it('Jest: componente existe', () => {
    expect(PageInicial).toBeDefined();
  });

  it('Enzyme: mostra "Bem-vindo!"', () => {
    const w = shallow(<PageInicial />);
    expect(w.find('h2').text()).toContain('Bem-vindo!');
  });
});
