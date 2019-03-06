import React from "react";
import { Alert, View } from "react-native";

import { InputDialog } from "./InputDialog";
import { TileButton } from "./TileButton";

import { listItems } from "./items/listItems";
import { useSkillOnHighestValueHabit } from "./skills/useSkill";
import { getUserData } from "./userData/userData";

export default class App extends React.Component {
    state = {
        showUseSkillInput: false,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            showUseSkillInput: false,
        };
    }

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
                        text="Pop pop"
                        onPress={this.getDialogInput}
                    />
                    <TileButton text="Awesome"/>
                </View>
                <InputDialog
                    visible={this.state.showUseSkillInput}
                    onPress={this.closeDialogInput}
                />
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

    private getDialogInput = () => {
        this.setState({ showUseSkillInput: true });
    }

    private closeDialogInput = () => {
        this.setState({ showUseSkillInput: false });
    }
}
