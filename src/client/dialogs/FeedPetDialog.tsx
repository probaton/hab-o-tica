import React from "react";
import { Alert, Dimensions, Picker, StyleSheet, Button, Text } from "react-native";

import { PetFeeder } from "../../items/PetFeeder";
import { PetType, IPetMap, IPickerOption } from "../../items/servingsHelpers";
import IHabiticaData from "../../userData/IHabiticaData";
import Interaction from "../Interaction";
import { ServingsOverview } from "./ServingsOverview";

interface IFeedPetDialogProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IFeedPetDialogState {
    feeder: PetFeeder | undefined;
    defaultSpeciesOptions: IPickerOption[];
    speciesInput: string;
    defaultTypeOptions: IPickerOption[];
    typeInput: string;
    loading: boolean;
    isResolvedMessage?: string;
    selectionState: "none" | "species" | "type" | "both";
}

export class FeedPetDialog extends React.Component<IFeedPetDialogProps, IFeedPetDialogState> {
    speciesPlaceholder = { id: "placeholder", label: "Select a pet..." };
    typePlaceholder = { id: "placeholder", label: "Select a type..." };

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
        const speciesOptions = this.convertToOptions("species", feeder.speciesList);
        const typeOptions = this.convertToOptions("type", feeder.petTypeList);

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
                            {this.generatePickerItems(this.state.defaultSpeciesOptions)}
                        </Picker>
                        <Text>Or</Text>
                        <Picker
                            style={styles.picker}
                            onValueChange={this.handleInitialTypeChange}
                            selectedValue={this.state.typeInput}
                        >
                            {this.generatePickerItems(this.state.defaultTypeOptions)}
                        </Picker>
                    </>
                );
            }
            case ("species"): {
                const types: string[] = [];
                this.state.feeder!.petData.forEach(petId => {
                    if (petId.startsWith(this.state.speciesInput + "-")) {
                        types.push(petId.split("-")[1]);
                    }
                });
                const options = this.convertToOptions("type", types);
                return (
                    <Picker
                        style={styles.picker}
                        onValueChange={this.handleSecondaryTypeChange}
                        selectedValue={this.state.typeInput}
                    >
                        {this.generatePickerItems(options)}
                    </Picker>
                );
            }
            case ("type"): {
                const species: string[] = [];
                this.state.feeder!.petData.forEach(petId => {
                    if (petId.endsWith("-" + this.state.typeInput)) {
                        species.push(petId.split("-")[0]);
                    }
                });
                const options = this.convertToOptions("species", species);
                return (
                    <Picker
                        style={styles.picker}
                        onValueChange={this.handleSecondarySpeciesChange}
                        selectedValue={this.state.speciesInput}
                    >
                        {this.generatePickerItems(options)}
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
        const selectionState = speciesInput === this.speciesPlaceholder.id ? "none" : "species";
        this.setState({ speciesInput, selectionState });
    }

    private handleSecondarySpeciesChange = (speciesInput: string) => {
        this.setState({ speciesInput, selectionState: "both" });
    }

    private handleInitialTypeChange = (typeInput: string) => {
        const selectionState = typeInput === this.typePlaceholder.id ? "none" : "type";
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

    private generatePickerItems(options: IPickerOption[]) {
        return options.map((variant) => <Picker.Item label={variant.label} key={variant.id} value={variant.id} color="#34313A"/>);
    }

    private parseDisplayName(species: string): string {
        return species.substr(0, 1) + species.substr(1).replace(/([A-Z])/g, " $1");
    }

    private convertToOptions(speciesOrType: "species" | "type", variants: string[]): IPickerOption[] {
        const options = variants
            .map(species => ({ id: species, label: this.parseDisplayName(species) }))
            .sort((a, b) => a.label.localeCompare(b.label));
        const placeholder = speciesOrType === "species" ? this.speciesPlaceholder : this.typePlaceholder;
        options.unshift(placeholder);
        return options;
    }
}

const styles = StyleSheet.create({
    picker: {
        width: Dimensions.get("window").width - 100,
    },
});
