import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer} from 'react-navigation';

import Locations from '../screens/Locations';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator({
    Locations: Locations,
    Map: MapScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white': Colors.primary,
    }
});

export default createAppContainer(PlacesNavigator);