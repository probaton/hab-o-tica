import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Trash from "../images/Trash";
import TouchButton from "./TouchButton";

interface IProps {
    itemName: string;
    onClick: (itemName: string) => void;
    onDelete?: (itemName: string) => void;
}

export default class ItemSelectorItem extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <TouchButton
                    onPress={this.onClick}
                    caption={this.props.itemName}
                    buttonStyle={styles.item}
                    captionStyle={styles.caption}
                />
                {this.props.onDelete ? this.renderTrash() : null}
            </View>
        );
    }

    private renderTrash() {
        return (
            <TouchableOpacity onPress={this.onDelete}>
                <Trash/>
            </TouchableOpacity>
        );
    }

    private onClick = () => {
        this.props.onClick(this.props.itemName);
    }

    private onDelete = () => {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.itemName);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8,
        marginRight: 8,
    },
    item: {
        flex: 1,
    },
    caption: {
        fontSize: 24,
        alignSelf: "center",
    },
});
