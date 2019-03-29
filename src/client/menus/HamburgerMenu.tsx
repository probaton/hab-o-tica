import React from "react";
import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IHamburgerMenuProps {
    close: () => void;
}

export default class HamburgerMenu extends React.Component<IHamburgerMenuProps> {
    render() {
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
                        <View style={styles.dialogPadding}>
                            <Text style={styles.text}>Yay!</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
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
    dialogPadding: {
        padding: 24,
    },
    text: {
        color: "#34313A",
    },
});
