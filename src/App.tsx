import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSkillOnHighestValueHabit } from "./skills/useSkill";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <button onClick={this.fireBall}>Fuego!</button>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }

  private fireBall = () => {
    useSkillOnHighestValueHabit("fireball", 1, "Fuego!");
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
