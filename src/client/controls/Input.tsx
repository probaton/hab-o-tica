import React from "react";
import { Dimensions, KeyboardTypeOptions, ReturnKeyTypeOptions, StyleSheet, TextInput } from "react-native";

interface IInputProps {
    onChangeText: (input: string) => void;
    keyboardType?: KeyboardTypeOptions;
    autoFocus?: boolean;
    dark?: boolean;
    placeholder?: string;
    onSubmitEditing?: () => void;
    inputRef?: React.RefObject<TextInput>;
    returnKeyType?: ReturnKeyTypeOptions;
    stayOpenOnSubmit?: boolean;
}

export default class Input extends React.Component<IInputProps> {
    render() {
        const { onChangeText, autoFocus, keyboardType, placeholder, dark, inputRef, onSubmitEditing, returnKeyType, stayOpenOnSubmit } = this.props;
        return (
            <TextInput
                style={dark ? styles.dark : styles.light}
                onChangeText={onChangeText}
                autoFocus={autoFocus}
                keyboardType={keyboardType}
                placeholder={placeholder}
                onSubmitEditing={onSubmitEditing}
                ref={inputRef}
                returnKeyType={returnKeyType || "default"}
                blurOnSubmit={!stayOpenOnSubmit}
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
        minWidth: Dimensions.get("window").width - 100,
    },
    dark: {
        textAlign: "left",
        fontSize: 16,
        color: "#F9F9F9",
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: "#F9F9F9",
        minWidth: Dimensions.get("window").width - 100,
    },
});
