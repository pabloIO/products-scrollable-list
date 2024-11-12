import { SearchBar } from '@rneui/themed';
import { useState } from 'react';

interface IProductSearchProps {
    loading: boolean;
    handleSearch: (text: string) => void;
};

function ProductSearch({
    loading,
    handleSearch,
}: IProductSearchProps){

    const [query, setQuery] = useState('');

    function handleChangeText(text: string){
        setQuery(text);
    }

    return (
        <SearchBar
            lightTheme
            placeholder="Search products..."
            onChangeText={handleChangeText}
            value={query}
            onEndEditing={() => handleSearch(query)}
            showLoading={loading}
        />
    );
}   

export default ProductSearch;