import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Authenticate } from "./Authenticate";

import { getVerifiedCredentials } from "../store/CredentialStore";
import Home from "./Home";

export default class App extends React.Component {
    state = {
        view: "loading",
    };

    componentDidMount() {
        this.setViewState();
    }

    render() {
        switch (this.state.view) {
            case "loading": {
                return this.renderLoading();
            }
            case "login": {
                return <Authenticate onValidCredentials={this.setViewState}/>;
            }
            case "home": {
                return <Home/>;
            }
        }
    }

    private setViewState = async () => {
        const view = await getVerifiedCredentials() ? "home" : "login";
        this.setState({ view });
    }

    private renderLoading = () => {
        return (
            <View
                style={styles.container}
            >
                <Text>Loading...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
