import React from "react";
import { Image, StyleSheet } from "react-native";

export default class Base extends React.Component {
    render() {
        return (
            <Image
                source={require("./Base.png")}
                resizeMode="contain"
                resizeMethod="scale"
                style={styles.hamburger}
            />
        );
    }
}

const styles = StyleSheet.create({
    hamburger: {
        height: 36,
        width: 36,
    },
});