import React from "react";
import { CheckBox, StyleSheet, Text, Pressable } from "react-native";

interface IProps {
    caption: string;
    onPress: (value: boolean) => void;
    value: boolean;
}

export default class CheckBoxButton extends React.Component<IProps> {
    render() {
        return (
            <Pressable style={styles.container} onPress={this.onPress}>
                <CheckBox onValueChange={this.props.onPress} value={this.props.value}/>
                <Text style={styles.caption}>{this.props.caption}</Text>
            </Pressable>
        );
    }

    private onPress = () => {
        this.props.onPress(!this.props.value);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 3,
    },
    caption: {
        fontSize: 16,
    },
});
