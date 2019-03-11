import React from "react";
import { Component } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Input } from "./controls/Input";

import { verifyCredentialsAndReturnUserName } from "../store/CredentialStore";

interface IAuthenticateProps {
    onValidCredentials: () => {};
}

export class Authenticate extends Component<IAuthenticateProps> {
    state = {
        credentials: {
            userInput: "cookies",
            tokenInput: "initial",
        },
    };

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
                <Text style={styles.text}>{dialogMessage}</Text>
                <Input
                    autoFocus={true}
                    onChangeText={this.setUserInput}
                    keyboardType={"default"}
                    placeholder="User ID"
                />
                <Input
                    autoFocus={false}
                    onChangeText={this.setTokenInput}
                    keyboardType={"default"}
                    placeholder="API token"
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.onSubmit}
                >
                    <Text style={styles.submitButton}>SUBMIT</Text>
                </TouchableOpacity>
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

    private onSubmit = async () => {
        const { userInput, tokenInput } = this.state.credentials;
        verifyCredentialsAndReturnUserName({ userId: userInput, apiToken: tokenInput })
            .then(userName => {
                if (userName === "Invalid credentials") {
                    Alert.alert("Oops", "There doesn't seem to be an account with those credentials. "
                        + "Are you sure you pasted the correct values to the correct fields?");
                } else {
                    Alert.alert(`Welcome, ${userName}!`);
                    this.props.onValidCredentials();
                }
            });
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
  },
  text: {
      textAlign: "center",
      paddingTop: 15,
  },
  button: {
      paddingRight: 8,
      minWidth: 64,
      height: 36,
  },
  submitButton: {
      textAlign: "right",
      color: "#009688",
      padding: 8,
  },
});