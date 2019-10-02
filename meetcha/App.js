import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meetcha!</Text>
      <Button title="Change Text"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'yellow',
    fontSize: 90,
    fontStyle: "italic"
  }
});
