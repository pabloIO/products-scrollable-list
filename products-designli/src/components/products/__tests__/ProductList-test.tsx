import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductList from '../ProductList';
import useProducts from '@api/useProducts';
import useProductSearch from '@api/useProductSearch';
import useProductsStore from '@store/productsStore';

// Mock hooks and navigation
jest.mock('@api/useProducts', () => ({
    __esModule: true, // if using ES modules
    default: jest.fn(),
}));
jest.mock('@api/useProductSearch', () => ({
    __esModule: true, // if using ES modules
    default: jest.fn(),
}));
jest.mock('@store/productsStore', () => ({
    __esModule: true, // if using ES modules
    default: jest.fn(),
}));

describe('ProductList Component', () => {
  let mockNavigation: any;
  let mockRoute: any;
  let mockFetchProducts: jest.Mock;
  let mockFetchMore: jest.Mock;
  let mockFetchProductsByTitle: jest.Mock;

  beforeEach(() => {
    // Mock navigation object
    mockNavigation = {
      navigate: jest.fn(),
    };

    mockRoute = {
      params: jest.fn(),
    };

    // Mock hook behavior
    mockFetchProducts = jest.fn();
    mockFetchMore = jest.fn();
    mockFetchProductsByTitle = jest.fn();

    // Mock return values for useProducts
    (useProducts as jest.Mock).mockReturnValue({
      isFetchingMore: false,
      loading: false,
      error: null,
      fetchProducts: jest.fn(),
      fetchMore: jest.fn(),
    });

    (useProductSearch as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      fetchProductsByTitle: mockFetchProductsByTitle,
    });

    (useProductsStore as jest.Mock).mockReturnValue([]);
  });

  it('renders the component and fetches products on mount', async () => {
    // const { getByText } = render   
    render(<ProductList navigation={mockNavigation} route={mockRoute} />);
    expect(useProducts().fetchProducts).toHaveBeenCalled();
  });

  it('displays an error message when there is an error fetching products and store is empty', () => {
    (useProducts as jest.Mock).mockReturnValue({
      isFetchingMore: false,
      loading: false,
      error: 'Error fetching products',
      fetchProducts: mockFetchProducts,
      fetchMore: mockFetchMore,
    });
    (useProductsStore as jest.Mock).mockReturnValue([]);

    const { getByText } = render(<ProductList navigation={mockNavigation} route={mockRoute} />);
    expect(getByText('Something went wrong while loading the products, try again')).toBeTruthy(); // Assumes the error component renders this text
  });

  it('calls fetchMore when onEndReached is triggered', () => {
    const { getByTestId } = render(<ProductList navigation={mockNavigation} route={mockRoute} />);
    const flatList = getByTestId('product-list-flatlist');

    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { y: 100 },
        contentSize: { height: 1000 },
        layoutMeasurement: { height: 500 },
      },
    });

    fireEvent(flatList, 'onEndReached');
    expect(useProducts().fetchMore).toHaveBeenCalled();
  });

  it('filters products when a search query is entered', async () => {
    const { getByPlaceholderText } = render(<ProductList navigation={mockNavigation} route={mockRoute} />);
    const searchInput = getByPlaceholderText('Search products...');

    fireEvent.changeText(searchInput, 'test query');
    await waitFor(() => expect(useProductSearch().fetchProductsByTitle).toHaveBeenCalledWith('test query'));
  });

  it('handles navigation when a product card is clicked', () => {
    const mockProduct: any = { 
      id: 1, 
      title: 'Test Product', 
      description: 'Description', 
      price: 100, 
      images: ['https://images.co/12'],
      category: {id: 1, name: 'test'}
    };

    (useProductsStore as jest.Mock).mockReturnValue([
      mockProduct
    ]);

    const { getByText } = render(<ProductList navigation={mockNavigation} route={mockRoute} />);
    fireEvent.press(getByText('View more'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetail', { id: 1, title: 'Test Product' });
  });

});
