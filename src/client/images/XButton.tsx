import React from "react";
import { Image, StyleSheet } from "react-native";

export default class XButton extends React.Component {
    render() {
        return (
            <Image
                source={require("./XButton.png")}
                resizeMode="contain"
                resizeMethod="scale"
                style={styles.xButton}
            />
        );
    }
}

const styles = StyleSheet.create({
    xButton: {
        height: 36,
        width: 36,
    },
});
