import React from "react";
import { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import Input from "./controls/Input";
import TouchButton from "./controls/TouchButton";

import { verifyCredentialsAndReturnUserData } from "../store/CredentialStore";
import IHabiticaData from "../userData/IHabiticaData";

interface IAuthenticateProps {
    onValidCredentials: (userData: Promise<IHabiticaData>) => void;
}

interface IAuthenticateState {
    credentials: { userInput: string, tokenInput: string };
}

export default class Authenticate extends Component<IAuthenticateProps, IAuthenticateState> {
    private tokenInput = React.createRef<TextInput>();

    constructor(props: IAuthenticateProps) {
        super(props);
        this.state = {
            credentials: {
                userInput: "",
                tokenInput: "",
            },
        };
    }

    render() {
        const dialogMessage =
            "Link this app to your Habitica account by providing your user ID and API token. "
            + "These can both be found in your Habitica settings.\n\n"
            + "This information will be stored locally on your device "
            + "and won't be shared with anyone or anything except to communicate with Habitica.";

        return (
            <View
                style={styles.container}
            >
                <Text style={styles.title}>Authenticate</Text>
                <Input
                    autoFocus={true}
                    onChangeText={this.setUserInput}
                    placeholder="User ID"
                    dark={true}
                    onSubmitEditing={this.focusNext}
                    returnKeyType="next"
                    stayOpenOnSubmit={true}
                />
                <Input
                    onChangeText={this.setTokenInput}
                    placeholder="API token"
                    dark={true}
                    inputRef={this.tokenInput}
                    returnKeyType="done"
                    onSubmitEditing={this.onSubmit}
                />
                <Text style={styles.text}>{dialogMessage}</Text>
                <TouchButton
                    onPress={this.onSubmit}
                    caption="SUBMIT"
                    buttonStyle={styles.submitButton}
                    captionStyle={styles.submitButton}
                />
            </View>
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

    private focusNext = () => {
        const node = this.tokenInput.current;
        if (node) {
            node.focus();
        }
    }

    private onSubmit = async () => {
        const { userInput, tokenInput } = this.state.credentials;
        const userData = verifyCredentialsAndReturnUserData({ userId: userInput.trim(), apiToken: tokenInput.trim() });
        this.props.onValidCredentials(userData);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 30,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "left",
        color: "#F9F9F9",
        marginBottom: 20,
    },
    text: {
        textAlign: "center",
        paddingTop: 15,
        color: "#F9F9F9",
    },
    button: {
        paddingRight: 8,
        minWidth: 64,
        height: 36,
    },
    submitButton: {
        textAlign: "right",
        color: "#F9F9F9",
        padding: 8,
        marginBottom: 5,
    },
});
