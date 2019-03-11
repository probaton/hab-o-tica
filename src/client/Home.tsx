import React from "react";
import { Alert, View } from "react-native";

import { SetCredentialsDialog } from "./dialogs/SetCredentialsDialog";
import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { TileButton } from "./TileButton";

import { listItems } from "../items/listItems";
import { getCredentials } from "../store/CredentialStore";
import { getUserData } from "../userData/userData";

export default class Home extends React.Component {
    state = {
        spamSkillDialogVisible: false,
        setCredentialsDialogVisible: false,
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
                        onPress={this.toggleSpamSkillDialog}
                    />
                    <TileButton
                        text="Set credentials"
                        onPress={this.toggleSetCredentialsDialog}
                    />
                    <TileButton
                        text="Get credentials"
                        onPress={this.getCredentials}
                    />
                </View>
                {this.renderSpamSkillDialog()}
                {this.renderSetCredentialsDialog()}
            </View>
        );
    }

    private renderSpamSkillDialog() {
        return this.state.spamSkillDialogVisible
            ? <SpamSkillDialog close={this.toggleSpamSkillDialog}/>
            : null;
    }

    private renderSetCredentialsDialog() {
        return this.state.setCredentialsDialogVisible
            ? <SetCredentialsDialog close={this.toggleSetCredentialsDialog}/>
            : null;
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

    private toggleSpamSkillDialog = () => {
        this.setState(prevState => {
            const state = ({...prevState} as any);
            state.spamSkillDialogVisible = !state.spamSkillDialogVisible;
            return state;
        });
    }

    private toggleSetCredentialsDialog = () => {
        this.setState(prevState => {
            const state = ({...prevState} as any);
            state.setCredentialsDialogVisible = !state.setCredentialsDialogVisible;
            return state;
        });
    }

    private getCredentials = async () => {
        const credentials = await getCredentials();
        Alert.alert("Credentials?", `id: ${credentials.userId} token: ${credentials.apiToken}`);
    }
}
