import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ItemSelectorItem from "./ItemSelectorItem";

interface IProps {
    title: string;
    itemNames: string[];
    onItemClick: (itemName: string) => void;
}

export default class ItemSelector extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.itemList}>
                <Text style={styles.title}>{this.props.title}</Text>
                {this.renderItems()}
            </View>
        );
    }

    private renderItems() {
        return this.props.itemNames.map(itemName => <ItemSelectorItem key={itemName} itemName={itemName} onClick={this.props.onItemClick}/>);
    }
}

const styles = StyleSheet.create({
    itemList: {
        backgroundColor: "#EDECEE",
        borderRadius: 5,
        margin: 8,
        padding: 12,
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "#6e6976ff",
        paddingBottom: 5,
    },
});
