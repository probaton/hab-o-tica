import React from "react";
import { StyleSheet, Text, View } from "react-native";

import GearChecklist from "../../items/GearChecklist";
import { GearSlot } from "../../items/GearSlot";

import CheckBoxButton from "../controls/CheckBoxButton";

interface IProps {
    gearChecklist: GearChecklist;
    updateGearSet: (slot: GearSlot, value: boolean) => void;
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
                    </View>
                    <View style={styles.column}>
                        {this.renderMemberCheckBox("Head accessory", "headAccessory")}
                        {this.renderMemberCheckBox("Eyewear", "eyewear")}
                        {this.renderMemberCheckBox("Body accessory", "body")}
                        {this.renderMemberCheckBox("Back accessory", "back")}
                    </View>
                </View>
            </View>
        );
    }

    private renderMemberCheckBox(caption: string, slot: GearSlot) {
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
