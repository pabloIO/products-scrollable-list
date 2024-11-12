import { Product } from '@models/Products';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { productsZustandStorage } from './persistStoreMmkv';

export interface ProductsState {
    products: Product[];
    setProducts: (products: Product[]) => void;
    updateProducts: (products: Product[]) => void;
};

const INITIAL_STATE = {
    products: [],
};

const useProductsStore = create<ProductsState>()(
    persist(
        set => ({
            products: INITIAL_STATE.products,
            setProducts: (products: Product[]) =>
                set((state) => ({
                  products,  
                })),
            updateProducts: (newProducts: Product[]) =>
                set((state) => {
                    // Check for new data before updating state to avoid unnecessary re-renders
                    const isDataNew = newProducts.some(
                        newProduct => !state.products.some(existing => existing.id === newProduct.id)
                    );
                    return isDataNew ? { products: [...state.products, ...newProducts] } : state;
                }),
        }),
        {
            name: 'products-storage',
            storage: createJSONStorage(() => productsZustandStorage),
        },
    ),
);

export default useProductsStore;