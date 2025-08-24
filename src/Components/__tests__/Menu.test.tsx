import { shallow } from 'enzyme';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Link: ({ to, children, ...p }: any) => <a href={to} {...p}>{children}</a>,
}));

import { Menu } from '../menu';
import { describe } from 'node:test';

describe('Menu', () => {
  it('Jest: componente existe', () => {
    expect(Menu).toBeDefined();
  });

  it('Enzyme: possui 3 links', () => {
    const w = shallow(<Menu />);
    expect(w.find('a')).toHaveLength(3);
  });
});
