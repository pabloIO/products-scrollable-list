import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, UseProductsByTitleResponse } from '@models/Products';

const useProductSearch = (initialTitle: string = ''): UseProductsByTitleResponse => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch products by title
    const fetchProductsByTitle = async (title: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Product[]>(
                `${process.env.EXPO_PUBLIC_API_URL}/products/?title=${encodeURIComponent(title)}`
            );
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, fetchProductsByTitle };
};

export default useProductSearch;
