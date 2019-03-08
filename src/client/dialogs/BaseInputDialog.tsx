import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IBaseInputDialogProps {
    dialogText: string;
    dialogTitle: string;
    close: () => void;
    onSubmit: () => void;
}

export class BaseInputDialog extends Component<IBaseInputDialogProps> {
    render() {
        const { dialogTitle, dialogText, close, onSubmit, children } = this.props;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={() => Alert.alert("Modal has been closed.")}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={close}
                >
                    <View
                        style={styles.dialog}
                    >

                        <View style={styles.dialogPadding}>
                            <Text style={styles.title}>{dialogTitle}</Text>
                            <Text>{dialogText}</Text>
                            {children}
                        </View>

                        <View style={styles.buttonBar}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={close}
                            >
                                <Text style={styles.cancelButton}>CANCEL</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonDivider}></View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={onSubmit}
                            >
                                <Text style={styles.submitButton}>SUBMIT</Text>
                            </TouchableOpacity>
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
    buttonBar: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "flex-end",
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
    },
    buttonDivider: {
        width: 0,
    },
    button: {
        paddingRight: 8,
        minWidth: 64,
        height: 36,
    },
    cancelButton: {
        textAlign: "right",
        color: "#009688",
        padding: 8,
    },
    submitButton: {
        textAlign: "right",
        color: "#009688",
        padding: 8,
    },
});
