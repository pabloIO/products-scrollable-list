import { Box, Stack } from "@rneui/layout";
import { Text } from "@rneui/themed";


function ProductsListEmpty(){
    return (
        <Stack
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}   
        >
            <Text h2>Hey dude!</Text>
            <Text style={{padding: 5, textAlign: 'center'}}>
                No products match your search or filter criteria
            </Text>
        </Stack>
    );
}

export default ProductsListEmpty;

