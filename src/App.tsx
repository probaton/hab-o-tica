import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getUserData } from './userData/userData';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.fireBall}>Fuego!</Text>
      </View>
    );
  }

  private fireBall = async () => {
    getUserData().then((responseJson) => {
        Alert.alert("Response", JSON.stringify(responseJson));
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0ffee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
