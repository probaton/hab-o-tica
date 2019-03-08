import React from "react";
import { Alert, View } from "react-native";

import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { TileButton } from "./TileButton";

import { listItems } from "../items/listItems";
import { spamSkill } from "../skills/useSkill";
import { getCredentials, setCredentials } from "../store/CredentialStore";
import { getUserData } from "../userData/userData";

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
                        text="Set credentials"
                        onPress={this.setCredentials}
                    />
                    <TileButton
                        text="Get credentials"
                        onPress={this.getCredentials}
                    />
                </View>
                {this.renderSpamSkillDialog()}
            </View>
        );
    }

    private renderSpamSkillDialog() {
        if (this.state.fireballDialogVisible) {
            return (
                <SpamSkillDialog
                    close={this.closeInputDialog}
                    onSubmit={this.onSkillSubmit}
                />
            );
        } else {
            return null;
        }
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

    private setCredentials = async () => {
        await setCredentials("doops", "loops");
        Alert.alert("Done!");
    }

    private getCredentials = async () => {
        const credentials = await getCredentials();
        Alert.alert("Credentials?", `id: ${credentials.userId} token: ${credentials.apiToken}`);
    }
}
