import React from "react";
import { Image, StyleSheet, Text, Pressable } from "react-native";

interface IHamburgerMenuItemProps {
    icon: any;
    caption: string;
    onPress: () => void;
}

export default class HamburgerMenuItem extends React.Component<IHamburgerMenuItemProps> {
    render() {
        return (
            <Pressable
                style={styles.container}
                onPress={this.props.onPress}
            >
                <Image
                    source={this.props.icon}
                    resizeMode="contain"
                    resizeMethod="scale"
                    style={styles.icon}
                />
                <Text style={styles.caption}>{this.props.caption}</Text>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        marginBottom: 4,
    },
    icon: {
        height: 36,
        width: 36,
        marginRight: 5,
    },
    caption: {
        fontSize: 20,
        color: "#34313a",
    },
});
