import type { RootStackScreenProps } from "@models/Navigation";
import ProductList from "@components/products/ProductList";

function ProductsScreen({
    navigation,
    route
}: RootStackScreenProps<'Products'>){
    return (
        <ProductList
            navigation={navigation}
            route={route}
        />
    );
}

export default ProductsScreen;