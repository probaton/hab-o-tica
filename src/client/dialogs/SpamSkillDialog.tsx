import React from "react";
import { Component } from "react";
import { Alert, Picker } from "react-native";

import { Input } from "../controls/Input";
import { BaseInputDialog } from "./BaseInputDialog";

import { getClassSkills, getSkillById, ISkill, spamSkill } from "../../skills/useSkill";
import { getUserData } from "../../userData/userData";

interface ISpamSkillDialogProps {
    close: () => void;
}

interface ISpamSkillDialogState {
    skillInput: string | undefined;
    usesInput: string | "";
    classSkills: ISkill[] | [];
}

export class SpamSkillDialog extends Component<ISpamSkillDialogProps, ISpamSkillDialogState> {
    state = {
        skillInput: undefined,
        usesInput: "",
        classSkills: [],
    };

    async componentDidMount() {
        const habiticaClass = (await getUserData()).stats.class;
        this.setState({ classSkills: getClassSkills(habiticaClass) });
    }

    render() {
        const classSkills = this.state.classSkills;
        const classSkillsOptions = classSkills
            ? classSkills.map((skill: ISkill) => <Picker.Item label={skill.name} key={skill.id} value={skill.id}/>)
            : [];

        return (
            <BaseInputDialog
                dialogTitle="Use Skill"
                dialogText="Which skill do you want to use and how often to you want to use it?"
                close={this.props.close}
                onSubmit={this.onSubmit}
            >
                <Picker
                    enabled={this.state.classSkills.length > 0}
                    selectedValue={this.state.skillInput}
                    onValueChange={(skillInput) => {
                        this.setState({ skillInput });
                    }}
                >
                    {classSkillsOptions}
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

    private onSubmit = async () => {
        const count = +this.state.usesInput;
        if (!Number.isInteger(count) || count < 1) {
            return Alert.alert("Invalid number");
        }
        if (!this.state.skillInput) {
            return Alert.alert("Select a skill");
        }
        const skill = getSkillById(this.state.skillInput!);
        Alert.alert(skill.name, await spamSkill(skill.id, +this.state.usesInput));
        this.props.close();
    }
}
