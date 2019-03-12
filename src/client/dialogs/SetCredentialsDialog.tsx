import React from "react";
import { Component } from "react";
import { Alert, NativeComponent } from "react-native";

import { Input } from "../controls/Input";
import { BaseInputDialog } from "./BaseInputDialog";

import { verifyCredentialsAndReturnUserName } from "../../store/CredentialStore";

interface ISetCredentialsDialogProps {
    close: () => void;
}

export class SetCredentialsDialog extends Component<ISetCredentialsDialogProps> {
    tokenInput: NativeComponent | undefined = undefined;

    state = {
        credentials: {
            userInput: "",
            tokenInput: "",
        },
    };

    render() {
        const dialogMessage =
            "Link this app to your Habitica account by providing your user ID and API token. "
            + "These can both be found in your Habitica settings.\n\n"
            + "This information will be stored locally on your device "
            + "and won't be shared with anyone or anything except to communicate with Habitica.";

        return (
            <BaseInputDialog
                dialogTitle="Authentication"
                dialogText={dialogMessage}
                close={this.props.close}
                onSubmit={this.onSubmit}
            >
                <Input
                    autoFocus={true}
                    onChangeText={this.setUserInput}
                    keyboardType={"default"}
                    placeholder="User ID"
                    onSubmitEditing={() => { this.tokenInput!.focus(); }}
                    returnKeyType="next"
                />
                <Input
                    autoFocus={false}
                    onChangeText={this.setTokenInput}
                    keyboardType={"default"}
                    placeholder="API token"
                    setNextInput={(input) => this.tokenInput = input}
                    returnKeyType="done"
                    onSubmitEditing={this.onSubmit}
                />
            </BaseInputDialog>
        );
    }

    private setTokenInput = (tokenInput: string) => {
        this.setState(previousState => {
            const state = ({...previousState} as any);
            state.credentials.tokenInput = tokenInput;
            return state;
        });
    }

    private setUserInput = (userInput: string) => {
        this.setState(previousState => {
            const state = ({...previousState} as any);
            state.credentials.userInput = userInput;
            return state;
        });
    }

    private onSubmit = async () => {
        const { userInput, tokenInput } = this.state.credentials;
        verifyCredentialsAndReturnUserName({ userId: userInput, apiToken: tokenInput })
            .then(userName => {
                if (userName === "Invalid credentials") {
                    Alert.alert("Oops", "There doesn't seem to be an account with those credentials. "
                        + "Are you sure you pasted the correct values to the correct fields?");
                } else {
                    Alert.alert(`Welcome, ${userName}!`);
                    this.props.close();
                }
            });
    }
}
