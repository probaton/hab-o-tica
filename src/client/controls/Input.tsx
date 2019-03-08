import React from "react";
import { Component } from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";

interface IInputProps {
    onChangeText: (input: string) => void;
    autoFocus: boolean;
    keyboardType: KeyboardTypeOptions;
}

export class Input extends Component<IInputProps> {
    render() {
        const { onChangeText, autoFocus, keyboardType } = this.props;
        return (
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                autoFocus={autoFocus}
                keyboardType={keyboardType}
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        textAlign: "left",
        fontSize: 16,
        color: "rgba(0,0,0,0.54)",
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: "#009688",
    },
});
