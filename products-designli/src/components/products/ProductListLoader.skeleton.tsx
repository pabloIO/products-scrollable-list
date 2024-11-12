import { Stack } from '@rneui/layout';
import { Skeleton,  } from '@rneui/themed';

function ProductListLoader() {
    return (
        <Stack align="center" spacing={4}>
            {
                [...Array(8).keys()].map((item) => 
                    <Skeleton key={item} animation="none" width={300} height={400} />
                )
            }
            
        </Stack>
    );
}

export default ProductListLoader;