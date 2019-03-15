import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ITileButtonProps {
    text: string;
    onPress?: () => void;
}

export class TileButton extends Component<ITileButtonProps> {
    render = () => {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").height / 4,
        backgroundColor: "#edecee",
        borderRadius: 5,
        elevation: 2,
        margin: 8,
    },
    text: {
        color: "#34313A",
        fontSize: 32,
    },
});
