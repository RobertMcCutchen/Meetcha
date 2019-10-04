import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const MapScreen  = () => {
    const storedCoords = useSelector(state => state.places)
    console.log('MapScreen')
    console.log(storedCoords)
    return (
        <View>
            <Text>{storedCoords}</Text>
            <Text>MapScreen</Text>
        </View>
    )
};

const styles = StyleSheet.create({});

export default MapScreen;