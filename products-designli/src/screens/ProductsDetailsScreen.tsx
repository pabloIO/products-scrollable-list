import { useEffect } from "react";
import type { RootStackScreenProps } from "@models/Navigation";
import ProductDetailView from "@components/productDetail/ProductDetailView";

function ProductsDetailsScreen({
    navigation,
    route
}: RootStackScreenProps<'ProductDetail'>){

    useEffect(() => {
        navigation.setOptions({
          headerTitle: route.params.title
        });
    }, [route.params]);

    return (
        <ProductDetailView
            navigation={navigation}
            route={route}
        />
    );
}

export default ProductsDetailsScreen;