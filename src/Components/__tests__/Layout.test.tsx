import React from 'react';
import { shallow } from 'enzyme';

const useRouteLoaderData = jest.fn(() => []); // retorna [] no provider
jest.mock('react-router-dom', () => ({
  __esModule: true,
  Outlet: () => null,
  Link: ({ to, children, ...p }: any) => <a href={to} {...p}>{children}</a>,
  useRouteLoaderData: () => useRouteLoaderData(),
}));

import { Layout } from '../layout';

describe('Layout', () => {
  it('Jest: componente existe', () => {
    expect(Layout).toBeDefined();
  });

  it('Enzyme: mostra o título do portal', () => {
    const w = shallow(<Layout />);
    expect(w.find('h1').text()).toContain('Ecommerce de celulares');
  });
});
