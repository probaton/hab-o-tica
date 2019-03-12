import React from "react";
import { Component } from "react";
import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleSheet, TextInput } from "react-native";

interface IInputProps {
    onChangeText: (input: string) => void;
    autoFocus: boolean;
    keyboardType: KeyboardTypeOptions;
    dark?: boolean;
    placeholder?: string;
    onSubmitEditing?: () => void;
    setNextInput?: (input: any) => void;
    returnKeyType?: ReturnKeyTypeOptions;
}

export class Input extends Component<IInputProps> {
    render() {
        const { onChangeText, autoFocus, keyboardType, placeholder, dark, setNextInput, onSubmitEditing, returnKeyType } = this.props;
        return (
            <TextInput
                style={dark ? styles.dark : styles.light}
                onChangeText={onChangeText}
                autoFocus={autoFocus}
                keyboardType={keyboardType}
                placeholder={placeholder}
                onSubmitEditing={onSubmitEditing}
                ref={setNextInput}
                returnKeyType={returnKeyType || "default"}
                blurOnSubmit={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    light: {
        textAlign: "left",
        fontSize: 16,
        color: "rgba(0,0,0,0.54)",
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: "#009688",
        minWidth: 200,
    },
    dark: {
        textAlign: "left",
        fontSize: 16,
        color: "#edecee",
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: "#edecee",
        minWidth: 200,
    },
});
