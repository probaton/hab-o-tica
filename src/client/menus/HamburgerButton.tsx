import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import Hamburger from "../images/Hamburger";
import HamburgerMenu from "./HamburgerMenu";

interface IHamburgerButtonState {
    menuVisible: boolean;
}

export default class HamburgerButton extends React.Component<any, IHamburgerButtonState> {
    constructor(props: any) {
        super(props);
        this.state = {
            menuVisible: false,
        };
    }
    render() {
        return (
            <View
                style={styles.container}
            >
                <TouchableNativeFeedback
                    onPress={this.toggleMenu}
                >
                    <View>
                        <Hamburger/>
                    </View>
                </TouchableNativeFeedback>
                {this.renderMenu()}
            </View>
        );
    }

    private renderMenu() {
        return this.state.menuVisible
            ? <HamburgerMenu close={this.toggleMenu}/>
            : null;
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
