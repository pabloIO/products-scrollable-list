import { Stack } from '@rneui/layout';
import { Skeleton,  } from '@rneui/themed';

function ProductDetailLoader() {
    return (
        <Stack align="center" spacing={4}>
            <Skeleton animation="none" width={300} height={300} />
            <Skeleton animation="none" width={300} height={300} />
        </Stack>
    );
}

export default ProductDetailLoader;