import React from "react";
import { StyleSheet, View } from "react-native";

import IHabiticaData from "../userData/IHabiticaData";

import { FeedPetDialog } from "./dialogs/FeedPetDialog";
import { LootArmoireDialog } from "./dialogs/LootArmoireDialog";
import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { TileButton } from "./TileButton";

interface IHomeProps {
    userData: { lastUpdate: number, data: Promise<IHabiticaData> };
    refresh: () => void;
}

interface IHomeState {
    viewState?: "feedPet" | "spamSkill" | "lootArmoire";
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            viewState: undefined,
        };
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
            case "feedPet": return this.renderFeedPetDialog();
            case "spamSkill": return this.renderSpamSkillDialog();
            case "lootArmoire": return this.renderLootArmoireDialog();
            case undefined: return this.renderButtons();
        }
    }

    private renderButtons() {
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TileButton
                        text="Feed Pet"
                        onPress={this.openFeedPetDialog}
                    />
                    <TileButton
                        text="Armoire"
                        onPress={this.openLootArmoireDialog}
                    />
                </View>

                <View style={styles.column}>
                    <TileButton
                        text="Use Skill"
                        onPress={this.openSpamSkillDialog}
                    />
                </View>
            </View>
        );
    }

    private renderSpamSkillDialog() {
        return this.state.viewState === "spamSkill"
            ? <SpamSkillDialog userData={this.props.userData.data} close={this.closeDialogs}/>
            : null;
    }

    private openSpamSkillDialog = () => {
        this.refreshUserData();
        this.setState({ viewState: "spamSkill" });
    }

    private renderFeedPetDialog() {
        return <FeedPetDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
    }

    private openFeedPetDialog = () => {
        this.refreshUserData();
        this.setState({ viewState: "feedPet" });
    }

    private renderLootArmoireDialog() {
        return <LootArmoireDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
    }

    private openLootArmoireDialog = () => {
        this.refreshUserData();
        this.setState({ viewState: "lootArmoire" });
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
});
