import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Authenticate } from "./Authenticate";

import { getVerifiedCredentials } from "../store/CredentialStore";
import Home from "./Home";
import Logo from "./images/Logo";
import LogoutIcon from "./images/LogoutIcon";

export default class App extends React.Component {
    state = {
        view: "loading",
    };

    componentDidMount() {
        this.setViewState();
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.topBar}>
                    <Logo/>
                    {this.renderLogoutIcon()}
                </View>
                {this.renderContent()}
            </View>
        );
    }

    private renderContent() {
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

    private renderLogoutIcon() {
        return this.state.view === "home"
            ?   <LogoutIcon
                    onLogout={this.setViewState}
                />
            : null;
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
    body: {
        backgroundColor: "#006165",
        flex: 1,
    },
    topBar: {
        backgroundColor: "#2D7F83",
        maxHeight: 56,
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
