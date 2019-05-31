import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface IProps {
    itemName: string;
    onClick: (itemName: string) => void;
}

export default class ItemSelectorItem extends React.Component<IProps> {
    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this.onClick}
            >
                <Text style={styles.buttonText}>{this.props.itemName}</Text>
            </TouchableOpacity>
        );
    }

    private onClick = () => {
        this.props.onClick(this.props.itemName);
    }
}

const styles = StyleSheet.create({
    button: {},
    buttonText: {},
});
