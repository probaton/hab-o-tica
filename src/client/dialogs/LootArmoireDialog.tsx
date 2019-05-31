import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ArmoireLooter from "../../items/ArmoireLooter";
import IHabiticaData from "../../userData/IHabiticaData";
import { getUserData } from "../../userData/userData";

import { Input } from "../controls/Input";
import Gold from "../images/Gold";
import { BaseInputDialog } from "./BaseInputDialog";

interface IProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IState {
    currentGold: number;
    quantityInput?: string;
    doneLoading?: boolean;
    isResolvedMessage?: string;
}

export class LootArmoireDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { currentGold: 0 };
    }

    async componentDidMount() {
        const newState: IState = this.state;
        const userData = await this.props.userData;
        newState.currentGold = Math.round(userData.stats.gp);
        newState.isResolvedMessage = newState.currentGold < 100 ? "You need at least 100 gold." : undefined;
        newState.doneLoading = true;
        this.setState(newState);
    }

    render() {
        const dialogText =
            "Loot the armoire a specific number of times, until you're out of gold, or until there is no more gear to loot.";

        return (
            <BaseInputDialog
                close={this.props.close}
                dialogTitle="Loot the Enchanted Armoire"
                dialogText={dialogText}
                loading={!this.state.doneLoading}
                onSubmit={this.onSubmit}
                isResolvedMessage={this.state.isResolvedMessage}
            >
                <View style={styles.goldDisplay}>
                    <Gold/>
                    <Text style={styles.goldText}>{this.state.currentGold.toString()}</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.getAllGear}
                >
                    <Text style={styles.spamButton}>LOOT ALL REMAINING GEAR!</Text>
                </TouchableOpacity>
                <Input
                    onChangeText={quantityInput => this.setState({ quantityInput })}
                    keyboardType="numeric"
                    placeholder="Number of uses"
                    autoFocus={true}
                ></Input>
            </BaseInputDialog>
        );
    }

    private getAllGear = async () => {
        if ((await this.props.userData).flags.armoireEmpty) {
            this.setState({ isResolvedMessage: "You already own all armoire gear." });
        } else {
            const condition = async () => !((await getUserData()).flags.armoireEmpty);
            this.setState({ doneLoading: false });
            this.setState({ doneLoading: true, isResolvedMessage: await new ArmoireLooter().spamArmoire(condition) });
        }
    }

    private onSubmit = async () => {
        const count = +this.state.quantityInput!;
        if (!Number.isInteger(count) || count < 1) {
            return Alert.alert("Invalid number");
        }
        const condition = (lootCount: number) => new Promise<boolean>(resolve => resolve(lootCount < count));
        this.setState({ doneLoading: false });
        this.setState({ doneLoading: true, isResolvedMessage: await new ArmoireLooter().spamArmoire(condition) });
    }
}

const styles = StyleSheet.create({
    goldDisplay: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    goldText: {
        marginLeft: 8,
    },
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
