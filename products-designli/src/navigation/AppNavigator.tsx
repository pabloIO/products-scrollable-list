import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// PRODUCTS SCREENS
import ProductsScreen from '@screens/ProductsScreen';
import ProductsDetailsScreen from '@screens/ProductsDetailsScreen';
// types
import type { RootStackParamList } from '@models/Navigation';

const RootStack = createStackNavigator<RootStackParamList>();

function AppNavigator() {

    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName='Products'
            >
                {/* auth */}
                <RootStack.Screen 
                    name='Products' 
                    component={ProductsScreen}  
                />
                <RootStack.Screen 
                    name={'ProductDetail'} 
                    component={ProductsDetailsScreen}
                />
            </RootStack.Navigator>        
        </NavigationContainer>
    )
}

export default AppNavigator;
