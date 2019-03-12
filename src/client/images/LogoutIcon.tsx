import React from "react";
import { Image, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { setCredentials, setVerifiedCredentials } from "../../store/CredentialStore";
import { BaseInputDialog } from "../dialogs/BaseInputDialog";

interface ILogoutIconProps {
    onLogout: () => void;
}


export default class LogoutIcon extends React.Component<ILogoutIconProps> {
    state = {
        logoutConfirmationVisible: false,
    };

    render() {
        return (
            <View
                style={styles.container}
            >
                <TouchableNativeFeedback
                    onPress={this.toggleLogoutConfirmation}
                >
                    <Image
                        source={require("./logout.png")}
                        resizeMode="contain"
                        resizeMethod="scale"
                        style={styles.logout}
                    />
                </TouchableNativeFeedback>
                {this.renderLogoutConfirmation()}
            </View>
        );
    }

    private renderLogoutConfirmation = () => {
        return this.state.logoutConfirmationVisible
            ?   <BaseInputDialog
                    dialogTitle="Logout"
                    dialogText="Are you sure you want to wipe your credentials?"
                    onSubmit={this.logout}
                    close={this.toggleLogoutConfirmation}
                />
            : null;
    }

    private logout = async () => {
        await setCredentials("", "");
        await setVerifiedCredentials(false);
        this.props.onLogout();
        this.toggleLogoutConfirmation();

    }

    private toggleLogoutConfirmation = () => {
        this.setState({ logoutConfirmationVisible: !this.state.logoutConfirmationVisible });
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 13,
        position: "absolute",
        right: 0,
    },
    logout: {
        height: 30,
    },
});
