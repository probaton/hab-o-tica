import React from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
    dialogText: string;
    dialogTitle: string;
    close: () => void;
    onSubmit: () => void;
    loading?: boolean;
    isResolvedMessage?: string;
}

export default class Interaction extends React.Component<IProps> {
    render() {
        const { dialogTitle, close, loading, isResolvedMessage } = this.props;
        return (
            <View
                style={styles.container}
            >
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{dialogTitle}</Text>
                </View>
                <View style={styles.padding}>
                    <View style={styles.body}>
                        {loading
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
            </View>
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
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        borderRadius: 5,
        elevation: 2,
        margin: 8,
    },
    padding: {
        flex: 1,
        padding: 24,
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titleBar: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 24,
        alignItems: "center",
        backgroundColor: "#EDECEE",
    },
    title: {
        fontWeight: "bold",
        fontSize: 32,
        color: "#6e6976ff",
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
        justifyContent: "center",
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
    },
    button: {
        margin: 5,
        minWidth: 64,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 24,
        textAlign: "center",
        color: "#009688",
        padding: 12,
    },
});