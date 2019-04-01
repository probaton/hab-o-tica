import React from "react";
import { StyleSheet, View } from "react-native";

import { FeedPetDialog } from "./dialogs/FeedPetDialog";
import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { TileButton } from "./TileButton";

import { IHabiticaData } from "../userData/IHabiticaData";

interface IHomeProps {
    userData: { lastUpdate: number, data: Promise<IHabiticaData> };
    refresh: () => void;
}

interface IHomeState {
    openDialog: "feedPet" | "spamSkill" | undefined;
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            openDialog: undefined,
        };
    }

    render() {
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
                    {this.renderSpamSkillDialog()}
                    {this.renderFeedPetDialog()}
                </View>
        );
    }

    private renderSpamSkillDialog() {
        return this.state.openDialog === "spamSkill"
            ? <SpamSkillDialog userData={this.props.userData.data} close={this.closeDialogs}/>
            : null;
    }

    private openSpamSkillDialog = () => {
        this.refreshUserData();
        this.setState({ openDialog: "spamSkill" });
    }

    private renderFeedPetDialog() {
        return this.state.openDialog === "feedPet"
            ? <FeedPetDialog userData={this.props.userData.data} close={this.closeDialogs}/>
            : null;
    }

    private openFeedPetDialog = () => {
        this.refreshUserData();
        this.setState({ openDialog: "feedPet" });
    }

    private refreshUserData = async () => {
        if (new Date().getTime() - this.props.userData.lastUpdate > 180000) {
            this.props.refresh();
        }
    }

    private closeDialogs = () => {
        this.setState({ openDialog: undefined });
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
