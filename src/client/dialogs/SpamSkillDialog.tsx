import React from "react";
import { Component } from "react";
import { Alert, Picker, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Input } from "../controls/Input";
import { BaseInputDialog } from "./BaseInputDialog";

import { getClassSkills, getSkillById, SkillId, spamSkill } from "../../skills/useSkill";
import { getLastSkill, setLastSkill } from "../../store/PreferenceStore";
import { IHabiticaData } from "../../userData/IHabiticaData";

interface ISpamSkillDialogProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface ISpamSkillDialogState {
    skillInput: SkillId | "" | "placeholder";
    usesInput: string;
    skillOptions: Array<{ id: string, name: string }>;
    loading: boolean;
    isResolvedMessage?: string;
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
        const userData = await this.props.userData;

        const habiticaClass = userData.stats.class;
        const lastSkill = await getLastSkill();
        if (lastSkill) {
            const skillOptions = getClassSkills(habiticaClass);
            newState = { skillOptions, skillInput: lastSkill };
        } else {
            const skillOptions = this.state.skillOptions.concat(getClassSkills(habiticaClass));
            newState = { skillOptions };
        }

        if (userData.stats.lvl <= 10) {
            newState.isResolvedMessage = "Your character won't have skills until you reach level 11";
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
                dialogText="Use a skill on the most beneficial task a set number of times or until you're out of mana."
                close={this.props.close}
                onSubmit={this.onSubmit}
                loading={this.state.loading}
                isResolvedMessage={this.state.isResolvedMessage}
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

    private setSkillInput = (skillInput: SkillId | "placeholder") => {
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
        this.useSkill(count);
    }

    private spamUntilOom = async () => {
        this.useSkill(-1);
    }

    private async useSkill(count: number) {
        const skillInput = this.state.skillInput;
        if (!skillInput || skillInput === "placeholder") {
            return Alert.alert("No skill selected");
        }

        this.setState({ loading: true });
        const skill = getSkillById(skillInput);
        this.setState({ loading: false, isResolvedMessage: await spamSkill(skill.id, count) });
        setLastSkill(skill.id);
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
