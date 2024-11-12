import { Product } from "@models/Products";
import { Button, Card, Chip, Text } from "@rneui/base";
import { Stack } from "@rneui/layout";
import { View } from "react-native";

interface IProductCardProps extends Product {
    handleNavigation: (id: number, title: string) => void;
};

function ProductCard({
    id,
    title,
    category,
    description,
    images,
    price,
    handleNavigation,
}: IProductCardProps){
    return (
        <Card 
            containerStyle={{marginHorizontal: 50}}
        >
            <Card.Title>{title}</Card.Title>
            <Card.Divider />
            <View>
                <Card.Image
                    style={{ padding: 0, borderRadius: 20 }}
                    borderRadius={20}
                    resizeMode="contain"
                    source={{
                        uri: images[0]
                    }}
                />
                <Chip 
                    size="sm"
                    title={category.name} 
                    containerStyle={{ marginVertical: 15, position: 'absolute', bottom: 0, right: 20 }} 
                />
            </View>
            
            <Text numberOfLines={2} style={{ margin: 10,  }}>
                { description }
            </Text>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 40 }}>
                ${ price }
            </Text>
            <Button
                onPress={() => handleNavigation(id, title)}
                title="View more"
                radius={10}
            />
        </Card>
    );
}

export default ProductCard;