import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface IInputDialogProps {
    visible: boolean;
    dialogText: string;
    dialogTitle: string;
    close: () => void;
    onSubmit: (input: string) => void;
}

export class InputDialog extends Component<IInputDialogProps> {
    state = {
        input: "",
    };

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => Alert.alert("Modal has been closed.")}
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
                            <Text style={styles.title}>{this.props.dialogTitle}</Text>
                            <Text>{this.props.dialogText}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={input => this.setState({ input })}
                                autoFocus={true}
                                keyboardType={"numeric"}
                            />
                        </View>

                        <View style={styles.buttonBar}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.props.close}
                            >
                                <Text style={styles.cancelButton}>CANCEL</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonDivider}></View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.submitAndClose}
                            >
                                <Text style={styles.submitButton}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }

    private submitAndClose = () => {
        const count = +this.state.input;
        if (!Number.isInteger(count) || count < 1) {
            Alert.alert("Invalid number");
        } else {
            this.props.onSubmit(this.state.input);
            this.props.close();
        }
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
    input: {
        textAlign: "left",
        fontSize: 16,
        color: "rgba(0,0,0,0.54)",
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: "#009688",
    },
});
