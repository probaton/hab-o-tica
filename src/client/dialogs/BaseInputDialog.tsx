import React, { Component } from "react";
import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IBaseInputDialogProps {
    dialogText: string;
    dialogTitle: string;
    close: () => void;
    onSubmit: () => void;
    loading?: boolean;
}

export class BaseInputDialog extends Component<IBaseInputDialogProps> {
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
                >
                    {this.props.loading
                        ? this.renderLoadingSpinner()
                        : this.renderContent()
                    }
                </TouchableOpacity>
            </Modal>
        );
    }

    renderLoadingSpinner() {
        return (
            <View
                style={styles.spinnerDialog}
            >
                <ActivityIndicator
                    size={Dimensions.get("window").width / 3}
                    color="#2D7F83"
                />
            </View>
        );
    }

    renderContent() {
        const { dialogTitle, dialogText, close, onSubmit, children } = this.props;
        return (
            <View
                style={styles.contentDialog}
            >
                <View style={styles.dialogPadding}>
                    <Text style={styles.title}>{dialogTitle}</Text>
                    <Text style={styles.text}>{dialogText}</Text>
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
    spinnerDialog: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width - 60,
        maxHeight: 300,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: "#edecee",
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
    },
    contentDialog: {
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: "#edecee",
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
        color: "#34313A",
        paddingBottom: 8,
    },
    text: {
        color: "#34313A",
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
        color: "#34313A",
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
