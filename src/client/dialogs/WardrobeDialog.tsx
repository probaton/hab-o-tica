import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Input from "../controls/Input";
import ItemSelector from "../controls/ItemSelector";
import Interaction from "../Interaction";

import { Outfit } from "../../items/Outfit";
import Outfitter from "../../items/Outfitter";
import WardrobeStore from "../../store/WardrobeStore";
import IHabiticaData from "../../userData/IHabiticaData";

interface IProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IState {
    wardrobe?: Outfit[];
    useCostume: boolean;
    outfitNameInput: string;
    loading: boolean;
    showAddForm: boolean;
    isResolvedMessage?: string;
}

export class WardrobeDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            useCostume: true,
            outfitNameInput: "",
            loading: true,
            showAddForm: false,
        };
    }

    async componentDidMount() {
        const newState: IState = this.state;
        const wardrobe = await WardrobeStore.get();
        if (wardrobe) {
            newState.wardrobe = wardrobe;
        } else {
            newState.showAddForm = true;
        }
        newState.loading = false;
        this.setState(newState);
    }

    render() {
        return (
            <Interaction
                dialogTitle="Wardrobe"
                dialogText={"Equip a stored outfit or save what you're currently wearing."}
                onSubmit={this.state.showAddForm ? this.submitOutfit : undefined}
                close={this.props.close}
                loading={this.state.loading}
                isResolvedMessage={this.state.isResolvedMessage}
            >
                <View style={styles.gearTypeToggle}>
                    <TouchableOpacity
                        style={this.state.useCostume ? styles.passiveToggle : styles.activeToggle}
                        onPress={() => this.setState({ useCostume: false })}
                    >
                        <Text style={this.state.useCostume ? styles.passiveToggleText : styles.activeToggleText}>Equipped</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.useCostume ? styles.activeToggle : styles.passiveToggle}
                        onPress={() => this.setState({ useCostume: true })}
                    >
                        <Text style={this.state.useCostume ? styles.activeToggleText : styles.passiveToggleText}>Costume</Text>
                    </TouchableOpacity>
                </View>
                {this.state.showAddForm ? this.renderAddForm() : this.renderOverview()}
            </Interaction>
        );
    }

    private renderOverview() {
        return (
            <>
                <ItemSelector title="Saved outfits" itemNames={this.parseItemNames()} onItemClick={this.onItemClick}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.setState({ showAddForm: true })}
                >
                    <Text style={styles.buttonText}>Save current outfit</Text>
                </TouchableOpacity>
            </>
        );
    }

    private renderAddForm() {
        return (
            <Input
                placeholder="Outfit name"
                onChangeText={input => this.setState({ outfitNameInput: input })}
                onSubmitEditing={this.submitOutfit}
            />
        );
    }

    private onItemClick = async (outfitName: string) => {
        const newOutfit = this.state.wardrobe!.find(o => o.name === outfitName);
        if (newOutfit) {
            const outfitter = new Outfitter(newOutfit, this.state.useCostume, await this.props.userData);
            this.setState({ isResolvedMessage: await outfitter.equipAll() });
        } else {
            this.setState({ isResolvedMessage: "Outfit not found." });
        }
    }

    private submitOutfit = async () => {
        if (!this.state.outfitNameInput) {
            Alert.alert("Invalid name");
        } else {
            const gearType = this.state.useCostume ? "costume" : "equipped";
            const rawCostume = (await this.props.userData).items.gear[gearType];
            WardrobeStore.add(new Outfit(this.state.outfitNameInput, rawCostume));
            this.props.close();
        }
    }

    private parseItemNames(): string[] {
        return this.state.wardrobe ? this.state.wardrobe.map(outfit => outfit.name) : [];
    }
}

const styles = StyleSheet.create({
    gearTypeToggle: {
        margin: 8,
        flexDirection: "row",
        borderColor: "#009688",
        borderRadius: 5,
        borderWidth: 2,
    },
    activeToggle: {
        minWidth: 64,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#009688",
    },
    passiveToggle: {
        minWidth: 64,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9F9F9",
    },
    activeToggleText: {
        fontSize: 18,
        textAlign: "center",
        color: "#F9F9F9",
        padding: 12,
    },
    passiveToggleText: {
        fontSize: 18,
        textAlign: "center",
        color: "#009688",
        padding: 12,
    },
    button: {
        margin: 5,
        minWidth: 64,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        textAlign: "center",
        color: "#009688",
        padding: 12,
    },
});
