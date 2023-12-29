import React from "react";
import { StyleProp, Text, TextStyle, Pressable, ViewStyle } from "react-native";

interface IProps {
    onPress: () => void;
    caption: string;
    buttonStyle?: StyleProp<ViewStyle>;
    captionStyle?: StyleProp<TextStyle>;
}

export default class TouchButton extends React.Component<IProps> {
    render() {
        return (
            <Pressable
                style={this.props.buttonStyle}
                onPress={this.props.onPress}
            >
                <Text style={this.props.captionStyle}>{this.props.caption}</Text>
            </Pressable>
        );
    }
}
