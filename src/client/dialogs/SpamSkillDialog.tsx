import React from "react";
import { Component } from "react";
import { Alert, Dimensions, Picker, StyleSheet } from "react-native";

import Input from "../controls/Input";
import TouchButton from "../controls/TouchButton";
import BaseInputDialog from "./BaseInputDialog";

import { getUserSkills, SkillId, spamSkill } from "../../skills/useSkill";
import LastUsedSkillStore from "../../store/LastUsedSkillStore";
import IHabiticaData from "../../userData/IHabiticaData";

interface ISpamSkillDialogProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface ISpamSkillDialogState {
    skillOptions: Array<{ id: string, name: string }>;
    skillInput?: SkillId | "placeholder";
    usesInput?: string;
    doneLoading?: boolean;
    isResolvedMessage?: string;
}

export class SpamSkillDialog extends Component<ISpamSkillDialogProps, ISpamSkillDialogState> {
    constructor(props: ISpamSkillDialogProps) {
        super(props);
        this.state = { skillOptions: [{ id: "placeholder", name: "Select a skill..." }] };
    }

    async componentDidMount() {
        const newState: ISpamSkillDialogState = this.state;
        const userData = await this.props.userData;

        if (userData.stats.lvl <= 10) {
            newState.isResolvedMessage = "Your character won't have skills until you reach level 11.";
            LastUsedSkillStore.clear();
        } else {
            const classSkills = getUserSkills(userData);
            const lastSkill = await LastUsedSkillStore.get();
            newState.skillInput = (lastSkill && classSkills.find(s => s.id === lastSkill)) ? lastSkill : "placeholder";
            if (newState.skillInput === "placeholder") {
                newState.skillOptions = this.state.skillOptions.concat(classSkills);
            } else {
                newState.skillOptions = classSkills;
            }
        }
        newState.doneLoading = true;
        this.setState(newState);
    }

    render() {
        const { skillOptions, skillInput, doneLoading } = this.state;
        const pickerOptions = skillOptions
            ? skillOptions.map((skill) => <Picker.Item label={skill.name} key={skill.id} value={skill.id} color="#34313A"/>)
            : [];

        return (
            <BaseInputDialog
                dialogTitle="Use Skill"
                dialogText="Use a skill on the most beneficial task a set number of times or until you're out of mana."
                close={this.props.close}
                onSubmit={this.onSubmit}
                loading={!doneLoading}
                isResolvedMessage={this.state.isResolvedMessage}
            >
                <Picker
                    style={styles.picker}
                    enabled={skillOptions && skillOptions.length > 1}
                    selectedValue={skillInput}
                    onValueChange={this.setSkillInput}
                >
                    {pickerOptions}
                </Picker>
                <TouchButton
                    onPress={this.spamUntilOom}
                    buttonStyle={styles.button}
                    captionStyle={styles.spamButton}
                    caption="SPAM UNTIL I'M OUT OF MANA!"
                />
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
        const newState: any = { skillInput };
        if (skillInput !== "placeholder") {
            newState.skillOptions = this.state.skillOptions!.filter(option => option.id !== "placeholder");
        }
        this.setState(newState);
    }

    private onSubmit = async () => {
        const count = +this.state.usesInput!;
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

        this.setState({ doneLoading: false });
        this.setState({ doneLoading: true, isResolvedMessage: await spamSkill(skillInput, count) });
        LastUsedSkillStore.set(skillInput);
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
    picker: {
        width: Dimensions.get("window").width - 100,
    },
});
