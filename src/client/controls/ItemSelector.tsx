import React from "react";
import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";

import Add from "../images/Add";
import ItemSelectorItem from "./ItemSelectorItem";

interface IProps {
    title: string;
    itemNames: string[];
    onItemClick: (itemName: string) => void;
    onItemDelete?: (itemName: string) => void;
    addItem?: () => void;
}

export default class ItemSelector extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    {this.renderAddButton()}
                </View>
                <ScrollView>
                    {this.renderItems()}
                </ScrollView>
            </View>
        );
    }

    private renderAddButton() {
        if (this.props.addItem) {
            return (
                <Pressable onPress={this.props.addItem} style={styles.addButton}>
                    <Add/>
                </Pressable>
            );
        }
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
        flex: 1,
        alignSelf: "stretch",
    },
    titleBar: {
        justifyContent: "center",
        minHeight: 40,
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#6e6976ff",
    },
    addButton: {
        position: "absolute",
        right: 8,
    },
});
