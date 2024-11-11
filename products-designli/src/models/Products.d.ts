export interface ProductCategory {
    id: number;
    name: string;
    image: string;
};
  
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: ProductCategory;
    images: string[];
};
  
export interface UseProductResult {
    product: Product | null;
    loading: boolean;
    error: string | null;
};

interface UseProductsResult {
    products: Product[] | null;
    loading: boolean;
    error: string | null;
};