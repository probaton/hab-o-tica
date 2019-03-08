import React from "react";
import { Component } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";

import { BaseInputDialog } from "./BaseInputDialog";

interface ISpamSkillDialogProps {
    close: () => void;
    onSubmit: (input: string) => void;
}

export class SpamSkillDialog extends Component<ISpamSkillDialogProps> {
    state = {
        input: "",
    };

    render() {
        return (
            <BaseInputDialog
                dialogTitle="Use Skill"
                dialogText="Which skill do you want to use and how often to you want to use it?"
                close={this.props.close}
                onSubmit={this.onSubmit}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={input => this.setState({ input })}
                    autoFocus={true}
                    keyboardType={"numeric"}
                />
            </BaseInputDialog>
        );
    }

    private onSubmit = () => {
        const count = +this.state.input;
        if (!Number.isInteger(count) || count < 1) {
            Alert.alert("Invalid number");
        } else {
            this.props.onSubmit(this.state.input);
            this.props.close();
        }
    }
}

const styles = StyleSheet.create({
    input: {
        textAlign: "left",
        fontSize: 16,
        color: "rgba(0,0,0,0.54)",
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: "#009688",
    },
});
