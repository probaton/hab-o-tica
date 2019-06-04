import React from "react";

import ItemSelector from "../controls/ItemSelector";
import Interaction from "../Interaction";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Outfit } from "../../items/Outfit";
import Outfitter from "../../items/Outfitter";
import WardrobeStore from "../../store/WardrobeStore";
import IHabiticaData from "../../userData/IHabiticaData";

interface IProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IState {
    viewState?: "overview" | "add";
    wardrobe?: Outfit[];
    loading: boolean;
    isResolvedMessage?: string;
    useCostume: boolean;
}

export class WardrobeDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
            useCostume: true,
        };
    }

    async componentDidMount() {
        const newState: IState = this.state;
        const wardrobe = await WardrobeStore.get();
        if (wardrobe) {
            newState.wardrobe = wardrobe;
        } else {
            newState.isResolvedMessage = "You have no saved outfits.";
        }
        newState.loading = false;
        this.setState(newState);
    }

    render() {
        const dialogText = "Equip a stored outfit or save what you're currently wearing.";

        const { loading, isResolvedMessage } = this.state;

        return (
            <Interaction
                dialogTitle="Wardrobe"
                dialogText={dialogText}
                close={this.props.close}
                onSubmit={this.onSubmit}
                loading={loading}
                isResolvedMessage={isResolvedMessage}
            >
                <View style={styles.gearTypeToggle}>
                    <TouchableOpacity
                        style={this.state.useCostume ? styles.passiveToggle : styles.activeToggle}
                        onPress={this.onEquippedClick}
                    >
                        <Text style={this.state.useCostume ? styles.passiveToggleText : styles.activeToggleText}>Equipped</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.useCostume ? styles.activeToggle : styles.passiveToggle}
                        onPress={this.onCostumeClick}
                    >
                        <Text style={this.state.useCostume ? styles.activeToggleText : styles.passiveToggleText}>Costume</Text>
                    </TouchableOpacity>
                </View>
                <ItemSelector title="Saved outfits" itemNames={this.parseItemNames()} onItemClick={this.onItemClick}/>
            </Interaction>
        );
    }

    private onEquippedClick = () => {
        this.setState({ useCostume: false });
    }

    private onCostumeClick = () => {
        this.setState({ useCostume: true });
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

    private parseItemNames(): string[] {
        if (this.state.wardrobe) {
            return this.state.wardrobe.map(outfit => outfit.name);
        } else {
            return [];
        }
    }

    private onSubmit = async () => {
        this.setState({ loading: true });
        this.setState({ loading: false, isResolvedMessage: "w00t" });
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
