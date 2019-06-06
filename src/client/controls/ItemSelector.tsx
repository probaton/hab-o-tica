import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import ItemSelectorItem from "./ItemSelectorItem";

interface IProps {
    title: string;
    itemNames: string[];
    onItemClick: (itemName: string) => void;
    onItemDelete?: (itemName: string) => void;
}

export default class ItemSelector extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <ScrollView>
                    {this.renderItems()}
                </ScrollView>
            </View>
        );
    }

    private renderItems() {
        return this.props.itemNames.map(itemName => {
            return <ItemSelectorItem key={itemName} itemName={itemName} onClick={this.props.onItemClick} onDelete={this.props.onItemDelete}/>;
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EDECEE",
        borderRadius: 5,
        margin: 8,
        padding: 12,
        flex: 1,
        alignSelf: "stretch",
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#6e6976ff",
        paddingBottom: 5,
    },
});
