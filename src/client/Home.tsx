import React from "react";
import { StyleSheet, View } from "react-native";

import { FeedPetDialog } from "./dialogs/FeedPetDialog";
import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { TileButton } from "./TileButton";

export default class Home extends React.Component {
    state = {
        spamSkillDialogVisible: false,
        feedPetDialogVisible: false,
    };

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.column}>
                        <TileButton
                            text="Feed Pet"
                            onPress={this.toggleFeedPetDialog}
                        />
                    </View>

                    <View style={styles.column}>
                        <TileButton
                            text="Use Skill"
                            onPress={this.toggleSpamSkillDialog}
                        />
                    </View>
                    {this.renderSpamSkillDialog()}
                    {this.renderFeedPetDialog()}
                </View>
        );
    }

    private renderSpamSkillDialog() {
        return this.state.spamSkillDialogVisible
            ? <SpamSkillDialog close={this.toggleSpamSkillDialog}/>
            : null;
    }

    private toggleSpamSkillDialog = () => {
        this.setState({ spamSkillDialogVisible: !this.state.spamSkillDialogVisible });
    }

    private renderFeedPetDialog() {
        return this.state.feedPetDialogVisible
            ? <FeedPetDialog close={this.toggleFeedPetDialog}/>
            : null;
    }

    private toggleFeedPetDialog = () => {
        this.setState({ feedPetDialogVisible: !this.state.feedPetDialogVisible });
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
