import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

import IHabiticaData from "../userData/IHabiticaData";

import { FeedPetDialog } from "./dialogs/FeedPetDialog";
import { LootArmoireDialog } from "./dialogs/LootArmoireDialog";
import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { WardrobeDialog } from "./dialogs/WardrobeDialog";
import ArmoireIcon from "./images/ArmoireIcon";
import FeedPetIcon from "./images/FeedPetIcon";
import UseSkillIcon from "./images/UseSkillIcon";
import WardrobeIcon from "./images/WardrobeIcon";

interface IHomeProps {
    userData: { lastUpdate: number, data: Promise<IHabiticaData> };
    refresh: () => void;
}

interface IHomeState {
    viewState?: HomeViewState;
}

type HomeViewState = "feedPet" | "spamSkill" | "lootArmoire" | "wardrobe";

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = { viewState: undefined };
    }
    render() {
        return (
            <>
                {this.renderContent()}
            </>
        );
    }

    private renderContent() {
        switch (this.state.viewState) {
            case "feedPet": return <FeedPetDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
            case "spamSkill": return <SpamSkillDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
            case "lootArmoire": return <LootArmoireDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
            case "wardrobe": return <WardrobeDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
            case undefined: return this.renderButtons();
        }
    }

    private renderButtons() {
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity style={styles.button} onPress={() => this.openDialog("feedPet")}>
                        <FeedPetIcon/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.openDialog("lootArmoire")}>
                        <ArmoireIcon/>
                    </TouchableOpacity>
                </View>

                <View style={styles.column}>
                    <TouchableOpacity style={styles.button} onPress={() => this.openDialog("spamSkill")}>
                        <UseSkillIcon/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.openDialog("wardrobe")}>
                        <WardrobeIcon/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    private openDialog(viewState: HomeViewState) {
        this.refreshUserData();
        this.setState({ viewState });
    }

    private refreshUserData = async () => {
        if (new Date().getTime() - this.props.userData.lastUpdate > 180000) {
            this.props.refresh();
        }
    }

    private closeDialogs = () => {
        this.props.refresh();
        this.setState({ viewState: undefined });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    column: {
        flex: 1,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").height / 4,
        backgroundColor: "#edecee",
        borderRadius: 5,
        elevation: 2,
        margin: 8,
    },
});
