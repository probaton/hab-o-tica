import React from "react";
import { Alert, StyleSheet, View } from "react-native";

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
            <View style={styles.container}>
                <View style={styles.column}>
                    <TileButton
                        text="Habit"
                        onPress={this.getUserHabit}
                    />
                    <TileButton
                        text="List 'em"
                        onPress={this.listPets}
                    />
                </View>

                <View style={styles.column}>
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
        this.setState({ spamSkillDialogVisible: !this.state.spamSkillDialogVisible });
    }

    private toggleSetCredentialsDialog = () => {
        this.setState({ setCredentialsDialogVisible: !this.state.setCredentialsDialogVisible });
    }

    private getCredentials = async () => {
        const credentials = await getCredentials();
        Alert.alert("Credentials?", `id: ${credentials.userId} token: ${credentials.apiToken}`);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#432874",
        flex: 1,
        flexDirection: "row",
    },
    column: {
        flex: 1,
    },
});
