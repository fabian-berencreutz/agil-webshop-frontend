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

  it('visar produktinformation (namn, beskrivning, pris och lager)', () => {
    const mockOnAdd = vi.fn();
    render(<ProductCard product={mockProduct} onAdd={mockOnAdd} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Testprodukt' })).toBeInTheDocument();
    expect(screen.getByText('En fantastisk testprodukt')).toBeInTheDocument();
    expect(screen.getByText('299 kr')).toBeInTheDocument();
    expect(screen.getByText('Lager: 5')).toBeInTheDocument();
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
});
