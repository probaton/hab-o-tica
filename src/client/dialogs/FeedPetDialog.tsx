import React from "react";
import { Alert, Dimensions, Picker, StyleSheet, Text } from "react-native";

import PetFeeder from "../../items/PetFeeder";
import { PetType } from "../../items/servingsHelpers";
import IHabiticaData from "../../userData/IHabiticaData";

import Interaction from "../Interaction";
import ServingsOverview from "./ServingsOverview";

interface IFeedPetDialogProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IFeedPetDialogState {
    feeder: PetFeeder | undefined;
    defaultSpeciesOptions: React.ReactElement[];
    speciesInput: string;
    defaultTypeOptions: React.ReactElement[];
    typeInput: string;
    loading: boolean;
    isResolvedMessage?: string;
    selectionState: "none" | "species" | "type" | "both";
}

export class FeedPetDialog extends React.Component<IFeedPetDialogProps, IFeedPetDialogState> {
    speciesPlaceholder = <Picker.Item label={"Select a pet..."} key={"placeholder"} value={"placeholder"} color="#34313A"/>;
    typePlaceholder = <Picker.Item label={"Select a type..."} key={"placeholder"} value={"placeholder"} color="#34313A"/>;

    constructor(props: IFeedPetDialogProps) {
        super(props);
        this.state = {
            selectionState: "none",
            feeder: undefined,
            defaultSpeciesOptions: [this.speciesPlaceholder],
            speciesInput: "",
            defaultTypeOptions: [this.typePlaceholder],
            typeInput: "",
            loading: true,
        };
    }

    async componentDidMount() {
        const feeder = new PetFeeder(await this.props.userData);
        const speciesOptions = this.generatePickerItems("species", feeder.speciesList);
        const typeOptions = this.generatePickerItems("type", feeder.petTypeList);

        this.setState({
            feeder,
            defaultSpeciesOptions: speciesOptions,
            defaultTypeOptions: typeOptions,
            loading: false,
        });
    }

    render() {
        const dialogText = "Feed a pet with food it really likes until you run out or it grows into a mount.";

        const { feeder, loading, isResolvedMessage } = this.state;

        return (
            <Interaction
                dialogTitle="Feed Pet"
                dialogText={dialogText}
                close={this.props.close}
                onSubmit={this.onSubmit}
                loading={loading}
                isResolvedMessage={isResolvedMessage}
            >
                <ServingsOverview servingsMap={feeder ? feeder.servingsPerType : undefined}/>
                {this.renderPetPicker()}
            </Interaction>
        );
    }

    private renderPetPicker() {
        switch (this.state.selectionState) {
            case ("none"): {
                return (
                    <>
                        <Picker
                            style={styles.picker}
                            onValueChange={this.handleInitialSpeciesChange}
                            selectedValue={this.state.speciesInput}
                        >
                            {this.state.defaultSpeciesOptions}
                        </Picker>
                        <Text>Or</Text>
                        <Picker
                            style={styles.picker}
                            onValueChange={this.handleInitialTypeChange}
                            selectedValue={this.state.typeInput}
                        >
                            {this.state.defaultTypeOptions}
                        </Picker>
                    </>
                );
            }
            case ("species"): {
                const types = this.state.feeder!.petData
                    .filter(petId => petId.startsWith(this.state.speciesInput + "-"))
                    .map(petId => petId.split("-")[1]);
                const options = this.generatePickerItems("type", types);
                return (
                    <Picker
                        style={styles.picker}
                        onValueChange={this.handleSecondaryTypeChange}
                        selectedValue={this.state.typeInput}
                    >
                        {options}
                    </Picker>
                );
            }
            case ("type"): {
                const species = this.state.feeder!.petData
                    .filter(petId => petId.endsWith("-" + this.state.typeInput))
                    .map(petId => petId.split("-")[0]);
                const options = this.generatePickerItems("species", species);
                return (
                    <Picker
                        style={styles.picker}
                        onValueChange={this.handleSecondarySpeciesChange}
                        selectedValue={this.state.speciesInput}
                    >
                        {options}
                    </Picker>
                );
            }
            case ("both"): {
                const petDisplayName = `${this.parseDisplayName(this.state.typeInput)} ${this.parseDisplayName(this.state.speciesInput)}`;
                return <Text>Are you sure you want to feed your {petDisplayName}?</Text>;
            }
        }
    }

    private handleInitialSpeciesChange = (speciesInput: string) => {
        const selectionState = speciesInput === "placeholder" ? "none" : "species";
        this.setState({ speciesInput, selectionState });
    }

    private handleSecondarySpeciesChange = (speciesInput: string) => {
        this.setState({ speciesInput, selectionState: "both" });
    }

    private handleInitialTypeChange = (typeInput: string) => {
        const selectionState = typeInput === "placeholder" ? "none" : "type";
        this.setState({ typeInput, selectionState });
    }

    private handleSecondaryTypeChange = (typeInput: string) => {
        this.setState({ typeInput, selectionState: "both" });
    }

    private onSubmit = async () => {
        const speciesInput = this.state.speciesInput;
        if (!speciesInput || speciesInput === "placeholder") {
            return Alert.alert("No pet selected");
        }

        const typeInput = this.state.typeInput;
        if (!typeInput || typeInput === "placeholder") {
            return Alert.alert("No type selected");
        }

        this.setState({ loading: true });
        this.setState({
            loading: false,
            isResolvedMessage: await this.state.feeder!.feedPet(speciesInput, (typeInput as PetType)),
        });
    }

    private generatePickerItems(speciesOrType: "species" | "type", variants: string[]): React.ReactElement[] {
        const items = speciesOrType === "species" ? [this.speciesPlaceholder] : [this.typePlaceholder];
        variants.sort((a, b) => a.localeCompare(b))
            .forEach((variant) => items.push(<Picker.Item label={this.parseDisplayName(variant)} key={variant} value={variant} color="#34313A"/>));
        return items;
    }

    private parseDisplayName(species: string): string {
        return species.substr(0, 1) + species.substr(1).replace(/([A-Z])/g, " $1");
    }
}

const styles = StyleSheet.create({
    picker: {
        width: Dimensions.get("window").width - 100,
    },
});
