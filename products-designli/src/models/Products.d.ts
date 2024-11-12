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
    loading: boolean;
    isFetchingMore: boolean;
    error: string | null;
    fetchProducts: (offset?: number, limit?: number) => Promise<void>;
    fetchMore: () => Promise<void>;
};

interface UseProductsByTitleResponse {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProductsByTitle: (title: string) => Promise<void>;
};