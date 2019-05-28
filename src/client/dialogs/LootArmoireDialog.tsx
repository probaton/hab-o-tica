import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { lootArmoire } from "../../items/lootArmoire";
import IHabiticaData from "../../userData/IHabiticaData";

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
        newState.doneLoading = true;
        this.setState(newState);
    }

    render() {
        const dialogText =
            "Specify the number of times to loot the armoire, or keep looting until there are either no more items to loot or gold to spend.";

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
                <Input
                    onChangeText={quantityInput => this.setState({ quantityInput })}
                    keyboardType="numeric"
                    autoFocus={true}
                ></Input>
            </BaseInputDialog>
        );
    }

    private onSubmit = async () => {
        this.setState({ doneLoading: false });
        this.setState({ doneLoading: true, isResolvedMessage: (await lootArmoire()) });
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
});
