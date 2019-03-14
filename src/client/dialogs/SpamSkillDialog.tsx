import React from "react";
import { Component } from "react";
import { Alert, Picker, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Input } from "../controls/Input";
import { BaseInputDialog } from "./BaseInputDialog";

import { getClassSkills, getSkillById, SkillId, spamSkill } from "../../skills/useSkill";
import { getLastSkill, setLastSkill } from "../../store/PreferenceStore";
import { getUserData } from "../../userData/userData";

interface ISpamSkillDialogProps {
    close: () => void;
}

interface ISpamSkillDialogState {
    skillInput: SkillId | "" | "placeholder";
    usesInput: string;
    skillOptions: Array<{ id: string, name: string }>;
    loading: boolean;
}

export class SpamSkillDialog extends Component<ISpamSkillDialogProps, ISpamSkillDialogState> {
    constructor(props: ISpamSkillDialogProps) {
        super(props);
        this.state = {
            skillInput: "",
            usesInput: "",
            skillOptions: [{ id: "placeholder", name: "Select a skill..." }],
            loading: true,
        };
    }

    async componentDidMount() {
        let newState: any;
        const habiticaClass = (await getUserData()).stats.class;
        const lastSkill = await getLastSkill();
        if (lastSkill) {
            const skillOptions = getClassSkills(habiticaClass);
            newState = { skillOptions, skillInput: lastSkill as SkillId };
        } else {
            const skillOptions = this.state.skillOptions.concat(getClassSkills(habiticaClass));
            newState = { skillOptions };
        }
        newState.loading = false;
        this.setState(newState);
    }

    render() {
        const pickerOptions = this.state.skillOptions
            .map((skill) => <Picker.Item label={skill.name} key={skill.id} value={skill.id} color="#34313A"/>);

        return (
            <BaseInputDialog
                dialogTitle="Use Skill"
                dialogText="Select a skill and either keeping casting until you're out of mana or specify how often you want it used."
                close={this.props.close}
                onSubmit={this.onSubmit}
                loading={this.state.loading}
            >
                <Picker
                    enabled={this.state.skillOptions.length > 1}
                    selectedValue={this.state.skillInput}
                    onValueChange={this.setSkillInput}
                >
                    {pickerOptions}
                </Picker>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.spamUntilOom}
                >
                    <Text style={styles.spamButton}>SPAM UNTIL I'M OUT OF MANA!</Text>
                </TouchableOpacity>
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
            this.setState({ skillOptions: newOptions, skillInput: skillInput as SkillId });
        } else {
            this.setState({ skillInput: skillInput as SkillId });
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

    private spamUntilOom = async () => {
        const skillInput = this.state.skillInput;
        if (!skillInput || skillInput === "placeholder") {
            return Alert.alert("No skill selected");
        }

        const skill = getSkillById(skillInput);
        Alert.alert(skill.name, await spamSkill(skill.id, -1));
        setLastSkill(skill.id);
        this.props.close();
    }
}

const styles = StyleSheet.create({
    button: {
        height: 36,
        color: "#34313A",
        alignSelf: "center",
    },
    spamButton: {
        color: "#009688",
        padding: 8,
    },

});
