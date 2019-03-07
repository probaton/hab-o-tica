import React from "react";
import { Alert, View } from "react-native";

import { InputDialog } from "./InputDialog";
import { TileButton } from "./TileButton";

import { listItems } from "./items/listItems";
import { spamSkill } from "./skills/useSkill";
import { getUserData } from "./userData/userData";

export default class App extends React.Component {
    state = {
        fireballDialogVisible: false,
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
                        text="Burst of Flames"
                        onPress={this.showFireballDialog}
                    />
                    <TileButton
                        text="Awesome"
                    />
                </View>
                <InputDialog
                    visible={this.state.fireballDialogVisible}
                    dialogTitle="Burst of Flames"
                    dialogText="How many times do you wish to cast Burst of Flames?"
                    close={this.closeInputDialog}
                    onSubmit={this.onSkillSubmit}
                />
            </View>
        );
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

    private showFireballDialog = () => {
        this.setState({ fireballDialogVisible: true });
    }

    private closeInputDialog = () => {
        this.setState({ fireballDialogVisible: false });
    }

    private onSkillSubmit = async (input: string) => {
        Alert.alert("Burst of Flames", await spamSkill("fireball", +input));
    }
}
