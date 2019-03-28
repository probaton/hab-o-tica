import React from "react";
import { StyleSheet, View } from "react-native";

import { IHabiticaData } from "../userData/IHabiticaData";
import { getUserData } from "../userData/userData";
import { FeedPetDialog } from "./dialogs/FeedPetDialog";
import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { TileButton } from "./TileButton";

interface IHomeState {
    userData: { lastUpdate: number, data: Promise<IHabiticaData> };
    openDialog: "feedPet" | "spamSkill" | undefined;
}

export default class Home extends React.Component<any, IHomeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userData: { lastUpdate: new Date().getTime(), data: getUserData() },
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

    private refreshUserData() {
        const now = new Date().getTime();
        if (now - this.state.userData.lastUpdate > 180000) {
            this.setState({ userData: { lastUpdate: now, data: getUserData() } });
        }
    }

    private renderSpamSkillDialog() {
        return this.state.openDialog === "spamSkill"
            ? <SpamSkillDialog userData={this.state.userData.data} close={this.closeDialogs}/>
            : null;
    }

    private openSpamSkillDialog = () => {
        this.refreshUserData();
        this.setState({ openDialog: "spamSkill" });
    }

    private renderFeedPetDialog() {
        return this.state.openDialog === "feedPet"
            ? <FeedPetDialog userData={this.state.userData.data} close={this.closeDialogs}/>
            : null;
    }

    private openFeedPetDialog = () => {
        this.refreshUserData();
        this.setState({ openDialog: "feedPet" });
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
