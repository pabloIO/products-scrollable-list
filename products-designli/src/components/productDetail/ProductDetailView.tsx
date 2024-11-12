import { Button, Card, Chip, Icon, Image, Text } from "@rneui/base";
import useProductDetail from "@api/useProductDetail";
import { RootStackScreenProps } from "@models/Navigation";
import ProductDetailLoader from "./ProductDetailLoader.skeleton";
import ProductDetailError from "./ProductDetailError";
import { ScrollView } from "react-native";

import AntDesign from '@expo/vector-icons/AntDesign';

function ProductDetailView({
    navigation,
    route
}: RootStackScreenProps<'ProductDetail'>){

    const  { product, loading, error } = useProductDetail(route.params.id); 
    
    if (loading){
        return <ProductDetailLoader />
    }

    if (error) {
        return <ProductDetailError />
    }

    return (
        <Card 
        >
            <Card.Title>{product?.title}</Card.Title>
            <Card.Divider />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    product?.images.map((img) => 
                        <Image
                            key={img}
                            style={{ padding: 0, borderRadius: 20, width: 200, height: 200, marginRight: 10 }}
                            borderRadius={20}
                            resizeMode="contain"
                            source={{
                                uri: img
                            }}
                        />
                    )
                }
            </ScrollView>
            <Chip 
                containerStyle={{marginTop: 10, minWidth: 100, maxWidth: 200}}
                size="sm"
                title={product?.category.name} 
            />
            <Text style={{ margin: 10,  }}>
                { product?.description }
            </Text>
            <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 35 }}>
                Buy now for ${ product?.price }
            </Text>
            <Button
                radius={10}
            >
                Add to cart
                <AntDesign name="shoppingcart" size={20} color="#fff" style={{marginLeft: 10}}/>
            </Button>
        </Card>
    );
}

export default ProductDetailView;