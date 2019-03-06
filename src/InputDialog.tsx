import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

interface IInputDialogProps {
    visible: boolean;
    onPress: () => void;
}

export class InputDialog extends Component<IInputDialogProps> {
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={this.props.onPress}
                >
                    <View
                        style={styles.dialog}
                    >
                        <View style={styles.dialogPadding}>
                            <Text style={styles.title}>Hello World!</Text>

                            <TouchableHighlight
                                onPress={this.props.onPress}
                            >
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
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
        backgroundColor: "#fff",
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
    },
    dialogPadding: {
        padding: 24,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "left",
    },
});
