import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { TileButton } from "./TileButton";
import { getUserData } from './userData/userData';
import { useSkillOnHighestValueHabit } from './skills/useSkill';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <TileButton
                        text="Habit"
                        onPress={this.getUserHabit}
                    />
                </View>
                
                <View style={{ flex: 1 }}>
                    <TileButton text="w00t"/>
                    <TileButton text="Awesome"/>
                </View>
            </View>
        );
    }

    private fireBall = async () => {
        useSkillOnHighestValueHabit("fireball", 1).then((responseJson) => {
            Alert.alert("Response", JSON.stringify(responseJson));
        })
    }

    private getUserHabit = async () => {
        getUserData().then(userData => {
            Alert.alert("Response", JSON.stringify(userData.tasks.habits[0].text));
        })
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#c0ffee',
  },
});
