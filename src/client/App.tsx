import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import Authenticate from "./Authenticate";
import Home from "./Home";
import Logo from "./images/Logo";
import HamburgerButton from "./menus/HamburgerButton";

import { getVerifiedCredentials } from "../store/CredentialStore";
import { IHabiticaData } from "../userData/IHabiticaData";
import { getUserData } from "../userData/userData";

interface IAppState {
    userData: { lastUpdate: number, data: Promise<IHabiticaData> } | undefined;
    view: "loading" | "home" | "login";
}

export default class App extends React.Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userData: undefined,
            view: "loading",
        };
    }

    componentDidMount() {
        this.setViewState();
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.topBar}>
                    <Logo/>
                    {this.renderHamburgerButton()}
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
                return <Authenticate onValidCredentials={this.onSubmitCredentials}/>;
            }
            case "home": {
                return <Home userData={this.state.userData!} refresh={this.refreshUserData}/>;
            }
        }
    }

    private setViewState = async () => {
        if (await getVerifiedCredentials()) {
            this.setState({
                view: "home",
                userData: { lastUpdate: new Date().getTime(), data: getUserData() },
            });
        } else {
            this.setState({
                view: "login",
                userData: undefined,
            });
        }
    }

    private renderHamburgerButton() {
        return this.state.view === "home"
            ? <HamburgerButton refresh={this.refreshUserData} onLogout={this.setViewState}/>
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

    private onSubmitCredentials = async (userDataPromise: Promise<IHabiticaData>) => {
        const userData = await userDataPromise;
        if (userData) {
            Alert.alert(`Welcome, ${userData.auth.local.username}!`);
            this.setState({ userData: { lastUpdate: new Date().getTime(), data: userDataPromise } });
        } else {
            Alert.alert("Oops", "There doesn't seem to be an account with those credentials. "
                + "Are you sure you pasted the correct values to the correct fields?");
        }
        this.setViewState();
    }

    private refreshUserData = () => {
        const now = new Date().getTime();
        if (now - this.state.userData!.lastUpdate > 180000) {
            this.setState({ userData: { lastUpdate: now, data: getUserData() } });
        }
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#006165",
        flex: 1,
    },
    topBar: {
        backgroundColor: "#2D7F83",
        maxHeight: 100,
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
