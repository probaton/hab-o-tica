import React from "react";
import { Image, StyleSheet } from "react-native";

export default class Trash extends React.Component {
    render() {
        return (
            <Image
                source={require("./Trash.png")}
                resizeMode="contain"
                resizeMethod="scale"
                style={styles.image}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 32,
        width: 32,
    },
});
