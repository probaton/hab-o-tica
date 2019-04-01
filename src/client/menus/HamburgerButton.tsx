import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import Hamburger from "../images/Hamburger";
import HamburgerMenu from "./HamburgerMenu";

interface IHamburgerButtonProps {
    refresh: () => void;
    onLogout: () => void;
}

interface IHamburgerButtonState {
    menuVisible: boolean;
}

export default class HamburgerButton extends React.Component<IHamburgerButtonProps, IHamburgerButtonState> {
    constructor(props: any) {
        super(props);
        this.state = {
            menuVisible: false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={this.toggleMenu}>
                    <View>
                        <Hamburger/>
                    </View>
                </TouchableNativeFeedback>
                {this.renderMenu()}
            </View>
        );
    }

    private renderMenu() {
        if (this.state.menuVisible) {
            return (
                <HamburgerMenu
                    onLogout={this.props.onLogout}
                    refresh={this.props.refresh}
                    close={this.toggleMenu}
                />
            );
        } else {
            return null;
        }
    }

    private toggleMenu = () => {
        this.setState({ menuVisible: !this.state.menuVisible });
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 44,
        position: "absolute",
        right: 8,
    },
});
