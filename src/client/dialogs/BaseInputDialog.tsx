import React, { Component } from "react";
import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IBaseInputDialogProps {
    dialogText: string;
    dialogTitle: string;
    close: () => void;
    onSubmit: () => void;
    loading?: boolean;
    isResolvedMessage?: string;
}

export class BaseInputDialog extends Component<IBaseInputDialogProps> {
    render() {
        const { dialogTitle, close, isResolvedMessage } = this.props;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={close}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={isResolvedMessage ? close : undefined}
                >
                    <View
                        style={styles.dialog}
                    >
                        <View style={styles.dialogPadding}>
                            <Text style={styles.title}>{dialogTitle}</Text>
                            {this.props.loading
                                ? this.renderLoadingSpinner()
                                : this.renderContent()
                            }
                        </View>
                        <View style={styles.buttonBar}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={close}
                            >
                                <Text style={styles.buttonText}>{isResolvedMessage ? "OK" : "CANCEL"}</Text>
                            </TouchableOpacity>
                            {this.renderSubmitButton()}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }

    private renderLoadingSpinner() {
        return (
            <ActivityIndicator
                size={Dimensions.get("window").width / 4}
                color="#2D7F83"
                style={styles.spinner}
            />
        );
    }

    private renderContent() {
        const { dialogText, children, isResolvedMessage } = this.props;
        return (
            <>
                <Text style={styles.text}>{isResolvedMessage || dialogText}</Text>
                {isResolvedMessage ? null : children}
            </>
        );
    }

    private renderSubmitButton() {
        const { onSubmit, loading, isResolvedMessage } = this.props;
        if (isResolvedMessage || loading) {
            return null;
        } else {
            return (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onSubmit}
                    >
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
            );
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
        backgroundColor: "#F9F9F9",
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
    },
    dialogPadding: {
        padding: 24,
        width: Dimensions.get("window").width - 60,
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
    spinner: {
        marginTop: 15,
    },
    buttonBar: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "flex-end",
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
    },
    button: {
        paddingRight: 8,
        minWidth: 64,
        height: 36,
        color: "#34313A",
    },
    buttonText: {
        textAlign: "right",
        color: "#009688",
        padding: 8,
    },
});
