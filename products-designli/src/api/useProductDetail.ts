import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, UseProductResult } from '@models/Products';

const useProduct = (productId: number): UseProductResult => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${productId}`);
            setProduct(response.data);
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

        fetchProduct();
    }, [productId]);

    return { product, loading, error };
};

export default useProduct;
