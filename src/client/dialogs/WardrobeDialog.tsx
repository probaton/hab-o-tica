import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import Input from "../controls/Input";
import ItemSelector from "../controls/ItemSelector";
import TouchButton from "../controls/TouchButton";
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
                    <TouchButton
                        onPress={() => this.setState({ useCostume: false })}
                        caption="Equipped"
                        buttonStyle={this.state.useCostume ? styles.passiveToggle : styles.activeToggle}
                        captionStyle={this.state.useCostume ? styles.passiveToggleText : styles.activeToggleText}
                    />
                    <TouchButton
                        onPress={() => this.setState({ useCostume: true })}
                        caption="Costume"
                        buttonStyle={this.state.useCostume ? styles.activeToggle : styles.passiveToggle}
                        captionStyle={this.state.useCostume ? styles.activeToggleText : styles.passiveToggleText}
                    />
                </View>
                {this.state.showAddForm ? this.renderAddForm() : this.renderOverview()}
            </Interaction>
        );
    }

    private renderOverview() {
        return (
            <>
                <ItemSelector title="Saved outfits" itemNames={this.parseItemNames()} onItemClick={this.onItemClick}/>
                <TouchButton
                    onPress={() => this.setState({ showAddForm: true })}
                    caption="Save current outfit"
                    buttonStyle={styles.button}
                    captionStyle={styles.buttonText}
                />
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
        const outfitName = this.state.outfitNameInput.trim();
        const nameValidationError = this.validateOutfitName(outfitName);
        if (nameValidationError) {
            Alert.alert("Invalid input", nameValidationError);
        } else {
            const gearType = this.state.useCostume ? "costume" : "equipped";
            const rawCostume = (await this.props.userData).items.gear[gearType];
            WardrobeStore.add(new Outfit(outfitName, rawCostume));
            this.props.close();
        }
    }

    private validateOutfitName(outfitName: string): string | undefined {
        if (outfitName === "") {
            return "Name cannot be empty.";
        }
        if (this.state.wardrobe && this.state.wardrobe.find(o => o.name === outfitName)) {
            return `You already have an outfit named ${outfitName}.`;
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
