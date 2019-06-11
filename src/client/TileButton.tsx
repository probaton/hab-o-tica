import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";

import TouchButton from "./controls/TouchButton";

interface ITileButtonProps {
    caption: string;
    onPress: () => void;
}

export class TileButton extends Component<ITileButtonProps> {
    render() {
        return <TouchButton onPress={this.props.onPress} caption={this.props.caption} buttonStyle={styles.button} captionStyle={styles.caption} />;
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").height / 4,
        backgroundColor: "#edecee",
        borderRadius: 5,
        elevation: 2,
        margin: 8,
    },
    caption: {
        color: "#34313A",
        fontSize: 32,
    },
});
