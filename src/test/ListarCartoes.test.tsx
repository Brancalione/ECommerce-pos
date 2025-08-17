import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ListarCartoes } from '../Components/listar_carotes';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => [
    { id: 1, nome: 'Produto A' },
    { id: 2, nome: 'Produto B' }
  ],
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

jest.mock('../Components/cartao_produtos', () => ({
  Cartao_produtos: ({ produto }: any) => <div>{produto.nome}</div>,
}));

describe('ListarCartoes', () => {
  beforeEach(() => {
    jest.useFakeTimers(); 
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('exibe produtos vindos do loader', () => {
    render(<ListarCartoes />, { wrapper: MemoryRouter });

    expect(screen.getByText('Produto A')).toBeInTheDocument();
    expect(screen.getByText('Produto B')).toBeInTheDocument();
  });

  test('filtra corretamente o produto por ID', async () => {
    render(<ListarCartoes />, { wrapper: MemoryRouter });

    const input = screen.getByPlaceholderText('Código');
    fireEvent.change(input, { target: { value: '1' } });

    await act(() => {
      jest.advanceTimersByTime(5000);
      return Promise.resolve();
    });

    expect(screen.getByText('Produto A')).toBeInTheDocument();
    expect(screen.queryByText('Produto B')).not.toBeInTheDocument();
  });
});
