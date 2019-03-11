import React from "react";
import { Component } from "react";
import { Alert, Picker } from "react-native";

import { Input } from "../controls/Input";
import { BaseInputDialog } from "./BaseInputDialog";

import { getClassSkills, getSkillById, spamSkill } from "../../skills/useSkill";
import { getUserData } from "../../userData/userData";

interface ISpamSkillDialogProps {
    close: () => void;
}

export class SpamSkillDialog extends Component<ISpamSkillDialogProps> {
    state = {
        skillInput: undefined,
        usesInput: "",
        skillOptions: [{ id: "placeholder", name: "Select a skill..." }],
    };

    async componentDidMount() {
        const habiticaClass = (await getUserData()).stats.class;
        const pickerOptions = this.state.skillOptions.concat(getClassSkills(habiticaClass));
        this.setState({ skillOptions: pickerOptions });
    }

    render() {
        const pickerOptions = this.state.skillOptions
            .map((skill) => <Picker.Item label={skill.name} key={skill.id} value={skill.id}/>);
        return (
            <BaseInputDialog
                dialogTitle="Use Skill"
                dialogText="Which skill do you want to use and how often to you want to use it?"
                close={this.props.close}
                onSubmit={this.onSubmit}
            >
                <Picker
                    enabled={this.state.skillOptions.length > 1}
                    selectedValue={this.state.skillInput}
                    onValueChange={this.setSkillInput}
                >
                    {pickerOptions}
                </Picker>
                <Input
                    onChangeText={input => this.setState({ usesInput: input })}
                    autoFocus={true}
                    keyboardType={"numeric"}
                    placeholder="Number of uses"
                />
            </BaseInputDialog>
        );
    }

    private setSkillInput = (skillInput: string) => {
        if (skillInput !== "placeholder") {
            const newOptions = this.state.skillOptions.filter(option => option.id !== "placeholder");
            this.setState({ skillOptions: newOptions, skillInput });
        } else {
            this.setState({ skillInput });
        }
    }

    private onSubmit = async () => {
        const count = +this.state.usesInput;
        if (!Number.isInteger(count) || count < 1) {
            return Alert.alert("Invalid number");
        }
        if (!this.state.skillInput || this.state.skillInput === "placeholder") {
            return Alert.alert("No skill selected");
        }
        const skill = getSkillById(this.state.skillInput!);
        Alert.alert(skill.name, await spamSkill(skill.id, +this.state.usesInput));
        this.props.close();
    }
}
