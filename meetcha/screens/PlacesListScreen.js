import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const PlacesListScreen  = props => {
    return (
        <View style={styles.container}>
            <View style={styles.addressForm}>
                <Text style={styles.title}>Your Address</Text>
                <View style={styles.addressInput}>
                    <TextInput style={styles.addressInput} placeholder={'Address'}/>
                    <TextInput style={styles.addressInput} placeholder={'City'}/>
                    <TextInput style={styles.addressInput} placeholder={'State'}/>
                </View>
            </View>
            <View style={styles.addressForm}>
                <Text style={styles.title}>Their Address</Text>
                <View style={styles.addressInput}>
                    <TextInput style={styles.addressInput} placeholder={'Address'}/>
                    <TextInput style={styles.addressInput} placeholder={'City'}/>
                    <TextInput style={styles.addressInput} placeholder={'State'}/>
                </View>
            </View>
            <Button title={'Submit'}/>
        </View>
    )
};

PlacesListScreen.navigationOptions = navData => {
    return { 
        headerTitle: 'Locations',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Locations' iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
                navData.navigation.navigate('NewPlace');
            }}
            />
        </HeaderButtons> 
    };
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
    },
    addressForm: {
        width: 300,
        height: 200,
        maxWidth: '80%',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 6,
        backgroundColor: 'white',
        elevation: 1,
        marginVertical: 20,
    },
    title: {
        fontSize: 40,
    },
    addressInput: {
        fontSize: 23,
        flexDirection: 'row',
    }
});

export default PlacesListScreen;