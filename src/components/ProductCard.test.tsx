import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Testprodukt',
    description: 'En fantastisk testprodukt',
    price: 299,
    quantity: 5,
  };

  it('visar produktinformation (namn, beskrivning, pris)', () => {
    const mockOnAdd = vi.fn();
    render(<ProductCard product={mockProduct} onAdd={mockOnAdd} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Testprodukt' })).toBeInTheDocument();
    expect(screen.getByText('En fantastisk testprodukt')).toBeInTheDocument();
    expect(screen.getByText('299 kr')).toBeInTheDocument();
  });

  it('anropar onAdd med rätt produkt vid klick på knappen "Lägg i kundvagnen"', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<ProductCard product={mockProduct} onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: 'Lägg i kundvagnen' });
    await user.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(mockProduct);
  });

  it('visar "Slutsåld", inaktiverar knappen och anropar inte onAdd när produkten är slut i lager', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    const outOfStockProduct: Product = {
      ...mockProduct,
      quantity: 0,
    };

    render(<ProductCard product={outOfStockProduct} onAdd={mockOnAdd} />);

    const button = screen.getByRole('button', { name: 'Slutsåld' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-red-600');

    await user.click(button);
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
