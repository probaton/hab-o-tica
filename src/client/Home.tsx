import React from "react";
import { StyleSheet, View } from "react-native";

import { FeedPetDialog } from "./dialogs/FeedPetDialog";
import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { TileButton } from "./TileButton";

import IHabiticaData from "../userData/IHabiticaData";

interface IHomeProps {
    userData: { lastUpdate: number, data: Promise<IHabiticaData> };
    refresh: () => void;
}

interface IHomeState {
    viewState?: "feedPet" | "spamSkill";
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
