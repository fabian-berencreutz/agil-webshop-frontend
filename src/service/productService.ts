import type { Product } from '../types/product';

const API_URL = import.meta.env.VITE_PRODUCT_SERVICE_URL || 'http://localhost:8081/products';

export async function getProducts(token?: string): Promise<Product[]> {
  const authToken = token || localStorage.getItem('token') || localStorage.getItem('accessToken');

  const headers: HeadersInit = {};
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(API_URL, { headers });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Behörighet saknas för att visa produkter (du måste vara inloggad).');
    }
    throw new Error(`Kunde inte hämta produkter (status ${response.status})`);
  }

  return response.json();
}
