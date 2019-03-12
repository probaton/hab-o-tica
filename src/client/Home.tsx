import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { TileButton } from "./TileButton";

import { listItems } from "../items/listItems";

export default class Home extends React.Component {
    state = {
        spamSkillDialogVisible: false,
    };

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.column}>
                        <TileButton
                            text="Feed pets"
                            onPress={this.listPets}
                        />
                    </View>

                    <View style={styles.column}>
                        <TileButton
                            text="Use Skill"
                            onPress={this.toggleSpamSkillDialog}
                        />
                    </View>
                    {this.renderSpamSkillDialog()}
                </View>
        );
    }

    private renderSpamSkillDialog() {
        return this.state.spamSkillDialogVisible
            ? <SpamSkillDialog close={this.toggleSpamSkillDialog}/>
            : null;
    }

    private listPets = () => {
        listItems("pets").then(items => {
            Alert.alert("Response", JSON.stringify(items));
        });
    }

    private toggleSpamSkillDialog = () => {
        this.setState({ spamSkillDialogVisible: !this.state.spamSkillDialogVisible });
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
