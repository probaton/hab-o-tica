import React from "react";
import { Alert, View } from "react-native";

import { InputDialog } from "./InputDialog";
import { TileButton } from "./TileButton";

import { listItems } from "./items/listItems";
import { spamSkill } from "./skills/useSkill";
import { getUserData } from "./userData/userData";

export default class App extends React.Component {
    state = {
        showUseSkillInput: false,
    };

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
                    <TileButton
                        text="Awesome"
                        onPress={this.walabble}
                    />
                </View>
                <InputDialog
                    visible={this.state.showUseSkillInput}
                    dialogTitle="How many pew pew?"
                    dialogText="How many times would you like to cast Fireball?"
                    close={this.closeInputDialog}
                    onSubmit={this.onSubmit}
                />
            </View>
        );
    }

    private fireBall = async () => {
        spamSkill("fireball", 1).then((responseJson) => {
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

    private closeInputDialog = () => {
        this.setState({ showUseSkillInput: false });
    }

    private onSubmit = async (input: string) => {
        spamSkill("fireball", +input)
            .then(responseJson => {
                Alert.alert("Fireball", JSON.stringify(responseJson));
            }).catch(e => {
                throw new Error(e);
            });
    }

    private walabble = async () => {
        Alert.alert("Fireball", await spamSkill("fireball", 2));
    }
}
