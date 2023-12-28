import React from "react";
import { Image, StyleSheet } from "react-native";


export default class Logo extends React.Component {
    render() {
        return (
            <Image
                source={require("./Logo.png")}
                resizeMode="contain"
                resizeMethod="scale"
                style={styles.logo}
            />
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 24,
        flex: 1,
        height: undefined,
        width: undefined,
        marginLeft: 60,
        marginRight: 60,
    },
});
