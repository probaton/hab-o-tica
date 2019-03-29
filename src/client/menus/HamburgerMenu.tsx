import React from "react";
import { Modal, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

import { BaseInputDialog } from "../dialogs/BaseInputDialog";
import { HamburgerMenuItem } from "./HamburgerMenuItem";

import { setCredentials, setVerifiedCredentials } from "../../store/CredentialStore";

interface IHamburgerMenuProps {
    onLogout: () => void;
    close: () => void;
}

interface IHamburgerMenuState {
    logoutConfirmationVisible: boolean;
}

export default class HamburgerMenu extends React.Component<IHamburgerMenuProps, IHamburgerMenuState> {
    constructor(props: IHamburgerMenuProps) {
        super(props);
        this.state = {
            logoutConfirmationVisible: false,
        };
    }

    render() {
        if (this.state.logoutConfirmationVisible) {
            return this.renderLogoutConfirmation();
        }
        return this.renderHamburgerMenu();
    }

    private renderHamburgerMenu() {
        const adjustedStyle = StyleSheet.flatten([styles.dialog, { top: 100 - StatusBar.currentHeight! }]);

        return (
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={this.props.close}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={this.props.close}
                >
                    <View style={adjustedStyle}>
                        <View style={styles.body}>
                            <HamburgerMenuItem
                                icon={require("../images/LogoutIcon.png")}
                                caption="Log out"
                                onPress={this.toggleLogoutConfirmation}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
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
        this.props.close();

    }

    private toggleLogoutConfirmation = () => {
        this.setState({ logoutConfirmationVisible: !this.state.logoutConfirmationVisible });
    }
}

const styles = StyleSheet.create({
    overlay: {
        width: "100%",
        height: "100%",
    },
    dialog: {
        position: "absolute",
        right: 6,
        backgroundColor: "#edecee",
        elevation: 24,
        borderRadius: 5,
    },
    body: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
    },
    text: {
        color: "#34313A",
    },
});
