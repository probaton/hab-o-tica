import React from "react";
import { Image, StyleSheet } from "react-native";

export default class Gold extends React.Component {
    render() {
        return (
            <Image
                source={require("./Gold.png")}
                resizeMode="contain"
                resizeMethod="scale"
                style={styles.image}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 36,
        width: 36,
    },
});