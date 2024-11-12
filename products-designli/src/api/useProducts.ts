import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Product, UseProductsResult } from '@models/Products';
import useProductsStore from '@store/productsStore';

const useProducts = (initialOffset: number = 0, initialLimit: number = 10): UseProductsResult => {
    // const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState<number>(initialOffset);
    const [limit, setLimit] = useState<number>(initialLimit);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const setProducts = useProductsStore((state) => state.setProducts);
    const updateProducts = useProductsStore((state) => state.updateProducts);
  
    // Function to fetch products lazily
    const fetchProducts = useCallback(async (customOffset: number = 0, customLimit: number = limit) => {
        // Add a check to avoid re-fetching if data is already present
        // if (productsStore.length > 0 && customOffset === 0) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Product[]>(`${process.env.EXPO_PUBLIC_API_URL}/products`, {
                params: {
                    offset: customOffset,
                    limit: customLimit,
                },
            });
            console.log(response.data);
            if (response.data && response.data.length > 0) {
                setProducts(response.data);
                setOffset(customOffset + customLimit); // Update the offset for the next fetch
            }
        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to fetch more data (for pagination)
    const fetchMore = async () => {
        setIsFetchingMore(true);
        setError(null);
        try {
          const response = await axios.get<Product[]>(`${process.env.EXPO_PUBLIC_API_URL}/products`, {
            params: {
              offset,
              limit,
            },
          });
          updateProducts(response.data);
          setOffset(offset + limit); // Increment the offset for subsequent calls
        } catch (err) {
          setError('Error fetching more products');
        } finally {
          setIsFetchingMore(false);
        }
    };
  
    return { isFetchingMore, loading, error, fetchProducts, fetchMore };
  };
  
  export default useProducts;