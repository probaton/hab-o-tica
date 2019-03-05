import React from "react";
import { Alert, View } from "react-native";

import { TileButton } from "./TileButton";

import { listItems } from "./items/listItems";
import { useSkillOnHighestValueHabit } from "./skills/useSkill";
import { getUserData } from "./userData/userData";

export default class App extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <TileButton
                        text="Habit"
                        onPress={this.getUserHabit}
                    />
                    <TileButton
                        text="List 'em"
                        onPress={this.listPets}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <TileButton
                        text="w00t"
                        onPress={this.getDialogInput}
                    />
                    <TileButton text="Awesome"/>
                </View>
            </View>
        );
    }

    private fireBall = async () => {
        useSkillOnHighestValueHabit("fireball", 1).then((responseJson) => {
            Alert.alert("Response", JSON.stringify(responseJson));
        });
    }

    private getUserHabit = async () => {
        getUserData().then(userData => {
            Alert.alert("Response", JSON.stringify(userData.tasks.habits[0].text));
        });
    }

    private listPets = () => {
        listItems("pets").then(items => {
            Alert.alert("Response", JSON.stringify(items));
        });
    }
}
