import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { spacify } from "../../helpers/stringUtils";
import CheckBoxButton from "../controls/CheckBoxButton";

interface IState {
    armor: boolean;
    headGear: boolean;
    offHand: boolean;
    bodyAccessory: boolean;
    mainHand: boolean;
    eyewear: boolean;
    headAccessory: boolean;
    backAccessory: boolean;
}

export default class OutfitMemberSelector extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            armor: true,
            headGear: true,
            offHand: true,
            bodyAccessory: true,
            mainHand: true,
            eyewear: true,
            headAccessory: true,
            backAccessory: true,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Included item slots</Text>
                </View>
            <View style={styles.columnManager}>
                <View style={styles.column}>
                    {this.renderMemberCheckBox("mainHand")}
                    {this.renderMemberCheckBox("offHand")}
                    {this.renderMemberCheckBox("headGear")}
                    {this.renderMemberCheckBox("armor")}
                </View>
                <View style={styles.column}>
                    {this.renderMemberCheckBox("headAccessory")}
                    {this.renderMemberCheckBox("eyewear")}
                    {this.renderMemberCheckBox("bodyAccessory")}
                    {this.renderMemberCheckBox("backAccessory")}
                </View>
            </View>
            </View>
        );
    }

    private renderMemberCheckBox(slot: GearSlot) {
        const caption = spacify(slot[0].toUpperCase() + slot.slice(1));
        const onPress = (value: boolean) => {
            const newState: any = {};
            newState[slot] = value;
            this.setState(newState);
        };
        return <CheckBoxButton caption={caption} onPress={onPress} value={this.state[slot]}/>;
    }
}

type GearSlot = "armor" | "headGear" | "offHand" | "bodyAccessory" | "mainHand" | "headAccessory" | "eyewear" | "backAccessory";

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
