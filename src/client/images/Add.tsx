import React from "react";
import { Image, StyleSheet } from "react-native";

export default class Add extends React.Component {
    render() {
        return (
            <Image
                source={require("./Add.png")}
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
