import React, { Component } from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";

interface ITileButtonProps {
    text: string;
    onPress?: () => void;
}

export class TileButton extends Component<ITileButtonProps> {
    render = () => {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: Dimensions.get("window").height / 4,
                    backgroundColor: "#e5fff8",
                    borderRadius: 5,
                    elevation: 2,
                    margin: 3,
                }}>
                <Text style={{ color: "#3cb371", fontSize: 30 }}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}
