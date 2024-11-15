import { ActivityIndicator, FlatList } from "react-native";
import useProductsStore from "@store/productsStore";
import { Product } from "@models/Products";
import { RootStackScreenProps } from "@models/Navigation";
import { useEffect, useState } from "react";
import useProducts from "@api/useProducts";
import ProductSearch from "./ProductSearch";
import useProductSearch from "@api/useProductSearch";
import ProductListLoader from "./ProductListLoader.skeleton";
import ProductsListError from "./ProductsListError";
import ProductCard from "./ProductCard";
import ProductsListEmpty from "./ProductListEmpty";

function ProductList({
    navigation,
    route
}: RootStackScreenProps<'Products'>){

    // init get products hook
    const { isFetchingMore, loading, error, fetchProducts, fetchMore } = useProducts();
    // init search products hook
    const { products: productSearch, loading: productSearchLoading, fetchProductsByTitle } 
        = useProductSearch();
    const [filteredResults, setFilteredResults] = useState<Product[]>([]);
    const [searchActive, setSearchActive] = useState(false);
    // store
    const productsStore = useProductsStore((state) => state.products);

    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {
        if (productSearch && productSearch.length > 0) {
            setFilteredResults(productSearch);
        } else {
            setFilteredResults([]);
        }
    }, [productSearch]);

    function handleNavigation(id: number, title: string){
        navigation.navigate('ProductDetail', { id, title })
    }

    // Load more products function for pagination
    function handleLoadMore() {
        if (
            productSearch.length > 0 && filteredResults.length > 0 ){
            return;
        }
        if (productSearchLoading || searchActive){
            return;
        }
        if (!isFetchingMore) {
            fetchMore();
        }
    }

    function handleSearch (query: string){
        if (query === ''){
            setSearchActive(false);
            setFilteredResults([]);
        } else {
            setSearchActive(true);
            fetchProductsByTitle(query);
        }
    }

    function renderItem({item }: { item: Product }){
        return (
            <ProductCard {...item} handleNavigation={handleNavigation}/>
        );
    }

    if (error && productsStore.length === 0){
        return (
            <ProductsListError/>
        );
    }

    const displayData = searchActive ? filteredResults : (filteredResults.length > 0 ? filteredResults : productsStore);

    return (
        <FlatList
            testID="product-list-flatlist"
            data={displayData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEventThrottle={1}
            onEndReached={handleLoadMore}  // Trigger loadMore when end is reached
            onEndReachedThreshold={0.5} 
            ListHeaderComponent={
                <ProductSearch loading={productSearchLoading} handleSearch={handleSearch}/>
            }
            ListEmptyComponent={
                loading ? <ProductListLoader /> : (
                    !productSearchLoading && filteredResults.length === 0 && <ProductsListEmpty />
                  ) || null
            }
            ListFooterComponent={
                isFetchingMore ? <ActivityIndicator size="large" /> : null
            }
        />
    );
}

export default ProductList;