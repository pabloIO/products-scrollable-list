import { Box, Stack } from "@rneui/layout";
import { Text } from "@rneui/themed";


function ProductDetailError(){
    return (
        <Stack
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}   
        >
            <Text h2>Oops...</Text>
            <Text style={{padding: 5, textAlign: 'center'}}>
                Something went wrong while loading the products, try again
            </Text>
        </Stack>
    );
}

export default ProductDetailError;

