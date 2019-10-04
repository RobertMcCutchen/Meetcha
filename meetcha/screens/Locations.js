import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { View, Text, TextInput, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { addPlace } from '../store/places-actions';
import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions'
import ENV from '../environs'

const fetchFonts = () => {
    Font.loadAsync({
        'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    });
}

const Locations = props => {
    const [yourAddress, setYourAddress] = useState('');
    const [yourCity, setYourCity] = useState('');
    const [yourState, setYourState] = useState('');
    const [theirAddress, setTheirAddress] = useState('');
    const [theirCity, setTheirCity] = useState('');
    const [theirState, setTheirState] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false)

    if(!dataLoaded) {
        return (
            <AppLoading 
            startAsync={fetchFonts} 
            onFinish={() => setDataLoaded(true)}
            onError={(err) => console.log(err)}
            />
        );
    }

    const mapLocations = () => {
        getYourLocation();
        getTheirLocation();
        props.navigation.navigate('Map');
    }

    const getYourLocation = () => {
        yourAddress.trim().replace(' ', '+');
        yourCity.trim().replace(' ', '+');
        yourState.trim().toUpperCase();
        url = `https://maps.googleapis.com/maps/api/geocode/json?address=${yourAddress},
        +${yourCity},+${yourState}&key=X`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let yourCoord = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng}
                // props.onAddPlace(yourCoord)
                    dispatch(addPlace(yourCoord));
            })
    };

    const getTheirLocation = () => {
        theirAddress.trim().replace(' ', '+');
        theirCity.trim().replace(' ', '+');
        theirState.trim().toUpperCase();
        url = `https://maps.googleapis.com/maps/api/geocode/json?address=${theirAddress},
        +${theirCity},+${theirState}&key=X`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let theirCoord = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng}
                // props.onAddPlace(theirCoord)
                dispatch(addPlace(theirCoord))
            })
    };

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.addressForm}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Your Address</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.addressInput} 
                        placeholder={'Address'}
                        onChangeText={text => setYourAddress(text)}
                    />
                    <TextInput 
                        style={styles.addressInput} 
                        placeholder={'City'}
                        onChangeText={text => setYourCity(text)}
                    />
                    <TextInput 
                        style={styles.addressInput} 
                        placeholder={'State'}
                        onChangeText={text => setYourState(text)}
                    />
                </View>
                <Button title={'Set to Current Location'}/>
            </View>
            <View style={styles.addressForm}>
                <View style={styles.titleContainer}>    
                    <Text style={styles.title}>Their Address</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.addressInput} 
                        placeholder={'Address'}
                        onChangeText={text => setTheirAddress(text)}
                    />
                    <TextInput 
                        style={styles.addressInput}
                        placeholder={'City'}
                        onChangeText={text => setTheirCity(text)}
                    />
                    <TextInput 
                        style={styles.addressInput} 
                        placeholder={'State'}
                        onChangeText={text => setTheirState(text)}
                    />
                </View>
            </View>
            <Button 
                style={styles.button} 
                title={'Submit'} 
                onPress={mapLocations}/>
        </View>
    )
};

Locations.navigationOptions = navData => {
    return { 
        headerTitle: 'Locations',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title='Locations' iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {navData.navigation.navigate('NewPlace');}}
                    />
            </HeaderButtons> 
    };
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
        width: '100%',
        backgroundColor: '#E63462',
    },
    addressForm: {
        width: 300,
        height: 225,
        maxWidth: '80%',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 6,
        backgroundColor: 'white',
        elevation: 1,
        marginVertical: 20,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    addressInput: {
        fontSize: 23,
        marginVertical: 7,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        width: '90%',
        borderRadius: 5,
        fontFamily: 'open-sans-regular'
    },
    button: {
        fontSize: 40,
        fontFamily: 'open-sans-bold'
    },
});

export default Locations;