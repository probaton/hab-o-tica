import React from "react";
import { StyleSheet, Text, View } from "react-native";

import OutfitChecklist from "../../items/OutfitChecklist";
import { OutfitSlot } from "../../items/OutfitSlot";

import CheckBoxButton from "../controls/CheckBoxButton";

interface IProps {
    gearChecklist: OutfitChecklist;
    updateGearSet: (slot: OutfitSlot, value: boolean) => void;
}

export default class OutfitMemberSelector extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Gear slots to include</Text>
                </View>
                <View style={styles.columnManager}>
                    <View style={styles.column}>
                        {this.renderMemberCheckBox("Main hand", "weapon")}
                        {this.renderMemberCheckBox("Off hand", "shield")}
                        {this.renderMemberCheckBox("Head gear", "head")}
                        {this.renderMemberCheckBox("Armor", "armor")}
                        {this.renderMemberCheckBox("Skin", "skin")}
                        {this.renderMemberCheckBox("Pet", "pet")}
                        {this.renderMemberCheckBox("Hair", "hair")}
                    </View>
                    <View style={styles.column}>
                        {this.renderMemberCheckBox("Head accessory", "headAccessory")}
                        {this.renderMemberCheckBox("Eyewear", "eyewear")}
                        {this.renderMemberCheckBox("Body accessory", "body")}
                        {this.renderMemberCheckBox("Back accessory", "back")}
                        {this.renderMemberCheckBox("Background", "background")}
                        {this.renderMemberCheckBox("Mount", "mount")}
                    </View>
                </View>
            </View>
        );
    }

    private renderMemberCheckBox(caption: string, slot: OutfitSlot) {
        const onPress = (value: boolean) => this.props.updateGearSet(slot, value);
        return <CheckBoxButton caption={caption} onPress={onPress} value={this.props.gearChecklist[slot]}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EDECEE",
        borderRadius: 5,
        justifyContent: "center",
        alignSelf: "stretch",
        alignItems: "center",
        marginTop: 8,
    },
    titleBar: {
        justifyContent: "center",
        minHeight: 50,
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#6e6976ff",
    },
    columnManager: {
        flexDirection: "row",
        marginBottom: 8,
    },
    column: {
        marginLeft: 8,
        marginRight: 8,
    },
});
