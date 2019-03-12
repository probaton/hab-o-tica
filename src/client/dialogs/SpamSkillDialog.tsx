import React from "react";
import { Component } from "react";
import { Alert, Picker, StyleSheet } from "react-native";

import { Input } from "../controls/Input";
import { BaseInputDialog } from "./BaseInputDialog";

import { getClassSkills, getSkillById, spamSkill } from "../../skills/useSkill";
import { getLastSkill, setLastSkill } from "../../store/PreferenceStore";
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
        const lastSkill = await getLastSkill();
        if (lastSkill) {
            const skillOptions = getClassSkills(habiticaClass);
            this.setState({ skillOptions, skillInput: lastSkill });
        } else {
            const skillOptions = this.state.skillOptions.concat(getClassSkills(habiticaClass));
            this.setState({ skillOptions });
        }
    }

    render() {
        const pickerOptions = this.state.skillOptions
            .map((skill) => <Picker.Item label={skill.name} key={skill.id} value={skill.id} color="#34313A"/>);

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

        const skillInput = this.state.skillInput;
        if (!skillInput || skillInput === "placeholder") {
            return Alert.alert("No skill selected");
        }

        const skill = getSkillById(skillInput);
        Alert.alert(skill.name, await spamSkill(skill.id, +this.state.usesInput));
        setLastSkill(skill.id);
        this.props.close();
    }
}
