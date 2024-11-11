import { Product } from '@models/Products';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { productsZustandStorage } from './persistStoreMmkv';

export interface ProductsState {
    products: Product[];
    setProducts: (products: Product[]) => void;
};

const INITIAL_STATE = {
    products: [],
};

const productsStore = create<ProductsState>()(
    persist(
        set => ({
            products: INITIAL_STATE.products,
            setProducts: (newProducts: Product[]) =>
                set((state) => ({
                    products: [ ...state.products, ...newProducts ], 
                })),
        }),
        {
            name: 'products-storage',
            storage: createJSONStorage(() => productsZustandStorage),
        },
    ),
);

export default productsStore;