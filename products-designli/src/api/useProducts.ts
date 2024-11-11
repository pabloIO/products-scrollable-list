import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, UseProductsResult } from '@models/Products';

const useProducts = (): UseProductsResult => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products');
            setProducts(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
            setError(err.message);
            } else {
            setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useProducts;