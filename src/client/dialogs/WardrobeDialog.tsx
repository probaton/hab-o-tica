import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import Input from "../controls/Input";
import ItemSelector from "../controls/ItemSelector";
import TouchButton from "../controls/TouchButton";
import Interaction from "../Interaction";
import OutfitMemberSelector from "../items/OutfitMemberSelector";

import GearChecklist from "../../items/GearChecklist";
import { GearSlot } from "../../items/GearSlot";
import IOutfit from "../../items/IOutfit";
import Outfitter from "../../items/Outfitter";
import WardrobeStore from "../../store/WardrobeStore";
import IHabiticaData from "../../userData/IHabiticaData";

interface IProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IState {
    wardrobe?: IOutfit[];
    useCostume: boolean;
    outfitNameInput: string;
    outfitSlotChecklist: GearChecklist;
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
            outfitSlotChecklist: new GearChecklist(),
            loading: true,
            showAddForm: false,
        };
    }

    async componentDidMount() {
        const newState: IState = this.state;
        newState.wardrobe = await WardrobeStore.get();
        newState.showAddForm = newState.wardrobe.length === 0;
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
            <ItemSelector
                title="Saved outfits"
                itemNames={this.parseItemNames()}
                onItemClick={this.onItemClick}
                onItemDelete={this.onItemDelete}
                addItem={() => this.setState({ showAddForm: true })}
            />
        );
    }

    private renderAddForm() {
        return (
            <>
                <Input placeholder="Outfit name" onChangeText={outfitNameInput => this.setState({ outfitNameInput })}/>
                <OutfitMemberSelector updateGearSet={this.updateGearSet} gearChecklist={this.state.outfitSlotChecklist}/>
            </>
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

    private onItemDelete = async (outfitName: string) => {
        this.setState({ loading: true });
        const newState: any = {};
        await WardrobeStore.remove(outfitName);
        newState.wardrobe = await WardrobeStore.get();
        newState.showAddForm = newState.wardrobe.length === 0;
        newState.loading = false;
        this.setState(newState);
    }

    private submitOutfit = async () => {
        const name = this.state.outfitNameInput.trim();
        const nameValidationError = this.validateOutfitName(name);
        if (nameValidationError) {
            Alert.alert("Invalid input", nameValidationError);
        } else {
            const rawGearSet = (await this.props.userData).items.gear[this.state.useCostume ? "costume" : "equipped"];
            const checklist = this.state.outfitSlotChecklist;
            const gearSet = {
                armor: checklist.armor ? rawGearSet.armor : undefined,
                head: checklist.headGear ? rawGearSet.head : undefined,
                shield: checklist.offHand ? rawGearSet.shield : undefined,
                body: checklist.bodyAccessory ? rawGearSet.body : undefined,
                weapon: checklist.mainHand ? rawGearSet.weapon : undefined,
                eyewear: checklist.eyewear ? rawGearSet.eyewear : undefined,
                headaccessory: checklist.headAccessory ? rawGearSet.headaccessory : undefined,
                back: checklist.backAccessory ? rawGearSet.back : undefined,
            };
            WardrobeStore.add({ name, gearSet });
            this.props.close();
        }
    }

    private updateGearSet = async (slot: GearSlot, value: boolean) => {
        const outfitSlotChecklist = this.state.outfitSlotChecklist;
        outfitSlotChecklist[slot] = value;
        this.setState({ outfitSlotChecklist });
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
});
