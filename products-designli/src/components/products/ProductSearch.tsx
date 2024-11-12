import { SearchBar } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { useDebounceInput } from '@utils/useDebounce';

interface IProductSearchProps {
    loading: boolean;
    handleSearch: (text: string) => void;
};

function ProductSearch({
    loading,
    handleSearch,
}: IProductSearchProps){

    const [query, setQuery] = useState('');

    // Debounce the query state
    const debouncedQuery = useDebounceInput(query, 500); 

    // Effect to call handleSearch whenever debouncedQuery changes
    useEffect(() => {
        handleSearch(debouncedQuery);
    }, [debouncedQuery]);

    function handleChangeText(text: string){
        setQuery(text);
    }

    return (
        <SearchBar
            lightTheme
            placeholder="Search products..."
            onChangeText={handleChangeText}
            value={query}
            showLoading={loading}
        />
    );
}   

export default ProductSearch;