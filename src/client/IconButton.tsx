import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from "react-native";

interface IProps {
    caption: string;
    imageSource: ImageSourcePropType;
    onPress: () => void;
}

export default class IconButton extends React.Component<IProps> {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Image
                    source={this.props.imageSource}
                    resizeMode="contain"
                    resizeMethod="scale"
                    style={styles.image}
                />
                <Text style={styles.caption}>{this.props.caption}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#edecee",
        borderRadius: 5,
        elevation: 2,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
    },
    image: {
        margin: 4,
        height: 80,
        width: 80,
    },
    caption: {
        marginLeft: 16,
        fontWeight: "bold",
        fontSize: 32,
        color: "#6e6976ff",
    },
});
