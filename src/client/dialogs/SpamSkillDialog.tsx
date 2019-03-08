import React from "react";
import { Component } from "react";
import { Alert } from "react-native";

import { Input } from "../controls/Input";
import { BaseInputDialog } from "./BaseInputDialog";

import { spamSkill } from "../../skills/useSkill";

interface ISpamSkillDialogProps {
    close: () => void;
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
                <Input
                    onChangeText={input => this.setState({ input })}
                    autoFocus={true}
                    keyboardType={"numeric"}
                />
            </BaseInputDialog>
        );
    }

    private onSubmit = async () => {
        const count = +this.state.input;
        if (!Number.isInteger(count) || count < 1) {
            Alert.alert("Invalid number");
        } else {
            Alert.alert("Burst of Flames", await spamSkill("fireball", +this.state.input));
            this.props.close();
        }
    }
}
