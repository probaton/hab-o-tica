import React from "react";
import { Component } from "react";
import { setCredentials } from "../../store/CredentialStore";
import { Input } from "../controls/Input";
import { BaseInputDialog } from "./BaseInputDialog";

interface ISetCredentialsDialogProps {
    close: () => void;
}

export class SetCredentialsDialog extends Component<ISetCredentialsDialogProps> {
    state = {
        credentials: {
            userInput: "cookies",
            tokenInput: "initial",
        },
    };

    render() {
        const dialogMessage =
            "Link this app to your Habitica account by providing your user ID and API token. "
            + "These can both be found in your Habitica settings.\n"
            + "This information will be stored locally on your device "
            + "and won't be shared with anyone or anything except to communicate with Habitica.";

        return (
            <BaseInputDialog
                dialogTitle="Authorization"
                dialogText={dialogMessage}
                close={this.props.close}
                onSubmit={this.onSubmit}
            >
                <Input
                    autoFocus={true}
                    onChangeText={this.setUserInput}
                    keyboardType={"numeric"}
                />
                <Input
                    autoFocus={false}
                    onChangeText={this.setTokenInput}
                    keyboardType={"numeric"}
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
        await setCredentials(userInput, tokenInput);
        this.props.close();
    }
}
