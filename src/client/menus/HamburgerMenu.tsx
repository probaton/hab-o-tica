import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IHamburgerMenuProps {
    close: () => void;
}

export default class HamburgerMenu extends React.Component<IHamburgerMenuProps> {
    render() {
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
                    <View
                        style={styles.dialog}
                    >
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
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    dialog: {
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: "#edecee",
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
    },
    dialogPadding: {
        padding: 24,
        width: Dimensions.get("window").width - 60,
    },
    text: {
        color: "#34313A",
    },
});
