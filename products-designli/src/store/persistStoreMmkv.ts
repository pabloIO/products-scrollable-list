
import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const productsStorage = new MMKV({
  id: 'products-storage',
})

export const productsZustandStorage: StateStorage = {
    setItem: (name: string, value: string) => {
        return productsStorage.set(name, value)
    },
    getItem: (name: string) => {
        const value = productsStorage.getString(name)
        return value ?? null
    },
    removeItem: (name: string) => {
        return productsStorage.delete(name)
    },
}