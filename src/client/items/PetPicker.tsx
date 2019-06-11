import React from "react";
import { Dimensions, Picker, StyleSheet, Text } from "react-native";

import PetFeeder from "../../items/PetFeeder";

import TouchButton from "../controls/TouchButton";

interface IProps {
    feeder: PetFeeder;
    handleSpeciesChange: (species?: string) => void;
    handleTypeChange: (type?: string) => void;
}

interface IState {
    selectionState: "none" | "species" | "type" | "both";
    speciesOptions: React.ReactElement[];
    speciesInput: string;
    typeOptions: React.ReactElement[];
    typeInput: string;
}

export default class PetPicker extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const speciesOptions = this.generatePickerItems("species", props.feeder.speciesList);
        const typeOptions = this.generatePickerItems("type", props.feeder.petTypeList);
        this.state = {
            selectionState: "none",
            speciesOptions,
            speciesInput: "",
            typeOptions,
            typeInput: "",
        };
    }

    render() {
        switch (this.state.selectionState) {
            case ("none"): return this.renderBothPickers();
            case ("species"): return this.renderTypePicker();
            case ("type"): return this.renderSpeciesPicker();
            case ("both"): return this.renderConfirmationMessage();
        }
    }

    private renderBothPickers() {
        return (
            <>
                <Picker
                    style={styles.picker}
                    onValueChange={this.handleInitialSpeciesChange}
                    selectedValue={this.state.speciesInput}
                >
                    {this.state.speciesOptions}
                </Picker>
                <Text>Or</Text>
                <Picker
                    style={styles.picker}
                    onValueChange={this.handleInitialTypeChange}
                    selectedValue={this.state.typeInput}
                >
                    {this.state.typeOptions}
                </Picker>
            </>
        );
    }

    private renderSpeciesPicker() {
        const species = this.props.feeder.petData
            .filter(petId => petId.endsWith("-" + this.state.typeInput))
            .map(petId => petId.split("-")[0]);
        const options = this.generatePickerItems("species", species);
        return (
            <>
                <Picker
                    style={styles.picker}
                    onValueChange={this.handleSecondarySpeciesChange}
                    selectedValue={this.state.speciesInput}
                >
                    {options}
                </Picker>
                {this.renderBackButton()}
            </>
        );
    }

    private renderTypePicker() {
        const types = this.props.feeder.petData
            .filter(petId => petId.startsWith(this.state.speciesInput + "-"))
            .map(petId => petId.split("-")[1]);
        const options = this.generatePickerItems("type", types);
        return (
            <>
                <Picker
                    style={styles.picker}
                    onValueChange={this.handleSecondaryTypeChange}
                    selectedValue={this.state.typeInput}
                >
                    {options}
                </Picker>
                {this.renderBackButton()}
            </>
        );
    }

    private renderConfirmationMessage() {
        const petDisplayName = `${this.parseDisplayName(this.state.typeInput)} ${this.parseDisplayName(this.state.speciesInput)}`;
        return (
            <>
                <Text style={styles.confirmationMessage}>Are you sure you want to feed your {petDisplayName}?</Text>
                {this.renderBackButton()}
            </>
        );
    }

    private renderBackButton() {
        return (
            <TouchButton
                onPress={this.resetSelection}
                caption="Go back"
                buttonStyle={styles.backButton}
                captionStyle={styles.buttonText}
            />
        );
    }

    private resetSelection = () => {
        this.setState({
            selectionState: "none",
            speciesInput: "",
            typeInput: "",
        });
        this.props.handleSpeciesChange(undefined);
        this.props.handleTypeChange(undefined);
    }

    private handleInitialSpeciesChange = (speciesInput: string) => {
        const selectionState = speciesInput === "placeholder" ? "none" : "species";
        this.setState({ speciesInput, selectionState });
        this.props.handleSpeciesChange(speciesInput);
    }

    private handleSecondarySpeciesChange = (speciesInput: string) => {
        const selectionState = speciesInput === "placeholder" ? "type" : "both";
        this.setState({ speciesInput, selectionState });
        this.props.handleSpeciesChange(speciesInput);
    }

    private handleInitialTypeChange = (typeInput: string) => {
        const selectionState = typeInput === "placeholder" ? "none" : "type";
        this.setState({ typeInput, selectionState });
        this.props.handleTypeChange(typeInput);
    }

    private handleSecondaryTypeChange = (typeInput: string) => {
        const selectionState = typeInput === "placeholder" ? "species" : "both";
        this.setState({ typeInput, selectionState });
        this.props.handleTypeChange(typeInput);
    }

    private generatePickerItems(speciesOrType: "species" | "type", variants: string[]): React.ReactElement[] {
        const items = speciesOrType === "species"
            ? [<Picker.Item label={"Select a pet..."} key={"placeholder"} value={"placeholder"} color="#34313A"/>]
            : [<Picker.Item label={"Select a type..."} key={"placeholder"} value={"placeholder"} color="#34313A"/>];
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
    backButton: {
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        color: "#009688",
    },
    confirmationMessage: {
        textAlign: "center",
    },
});
