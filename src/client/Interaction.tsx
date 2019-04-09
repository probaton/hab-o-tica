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
                <View style={styles.padding}>
                    <View style={styles.body}>
                        <Text style={styles.title}>{dialogTitle}</Text>
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
        backgroundColor: "#edecee",
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
    title: {},
    buttonBar: {},
    text: {},
    spinner: {},
    button: {},
    buttonText: {},
});
