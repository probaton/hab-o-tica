import React from "react";
import { Component } from "react";
import { Alert, Dimensions, Picker, StyleSheet } from "react-native";

import { PetFeeder } from "../../items/PetFeeder";
import IHabiticaData from "../../userData/IHabiticaData";
import Interaction from "../Interaction";

interface IFeedPetDialogProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IFeedPetDialogState {
    feeder: PetFeeder | undefined;
    speciesOptions: Array<{ id: string, name: string }> | undefined;
    speciesInput: string;
    typeOptions: Array<{ id: string, name: string }> | undefined;
    typeInput: string;
    loading: boolean;
    isResolvedMessage?: string;
}

export class FeedPetDialog extends Component<IFeedPetDialogProps, IFeedPetDialogState> {
    speciesPlaceholder = { id: "placeholder", name: "Select a pet..." };
    typePlaceholder = { id: "placeholder", name: "Select a type..." };

    constructor(props: IFeedPetDialogProps) {
        super(props);
        this.state = {
            feeder: undefined,
            speciesOptions: [this.speciesPlaceholder],
            speciesInput: "",
            typeOptions: [this.typePlaceholder],
            typeInput: "",
            loading: true,
        };
    }

    async componentDidMount() {
        const feeder = new PetFeeder(await this.props.userData);

        const speciesOptions = feeder.petList.map(pet => {
                return { id: pet.species, name: pet.displayName };
            });
        speciesOptions.sort((a, b) => a.name.localeCompare(b.name));
        speciesOptions.unshift(this.speciesPlaceholder);

        this.setState({ feeder, speciesOptions, loading: false });
    }

    render() {
        const dialogText = "Feed a pet with food it really likes until you run out or it grows into a mount.";

        const { speciesOptions, typeOptions, loading, speciesInput, typeInput, isResolvedMessage } = this.state;

        const speciesPickerOptions = speciesOptions!
            .map((species) => <Picker.Item label={species.name} key={species.id} value={species.id} color="#34313A"/>);

        const typePickerOptions = typeOptions!
            .map((type) => <Picker.Item label={type.name} key={type.id} value={type.id} color="#34313A"/>);

        return (
            <Interaction
                dialogTitle="Feed Pet"
                dialogText={dialogText}
                close={this.props.close}
                onSubmit={this.onSubmit}
                loading={loading}
                isResolvedMessage={isResolvedMessage}
            >
                <Picker
                    style={styles.picker}
                    enabled={speciesOptions && speciesOptions.length > 1}
                    onValueChange={this.handleSpeciesChange}
                    selectedValue={speciesInput}
                >
                    {speciesPickerOptions}
                </Picker>
                <Picker
                    style={styles.picker}
                    enabled={typeOptions && typeOptions.length > 1}
                    onValueChange={this.handleTypeChange}
                    selectedValue={typeInput}
                >
                    {typePickerOptions}
                </Picker>
            </Interaction>
        );
    }

    private handleSpeciesChange = (speciesInput: string) => {
        const newState: any = { speciesInput };

        const pet = this.state.feeder!.petList.find(p => p.species === speciesInput);
        if (!pet) {
            newState.typeOptions = [this.typePlaceholder];
        } else {
            let newTypeOptions;

            const selectedPetTypes = pet.types.map(type => {
                return { id: type, name: type };
            });
            if (selectedPetTypes.length === 1) {
                newTypeOptions = selectedPetTypes;
            } else {
                newTypeOptions = selectedPetTypes.sort((a, b) => a.name.localeCompare(b.name));
                newTypeOptions.unshift(this.typePlaceholder);
            }

            newState.typeOptions = newTypeOptions;
            newState.speciesOptions = this.state.speciesOptions!.filter(option => option.id !== "placeholder");
        }

        this.setState(newState);
    }

    private handleTypeChange = (typeInput: string) => {
        const newState: any = { typeInput };
        if (typeInput !== "placeholder") {
            const newTypeOptions = this.state.typeOptions!.filter(option => option.id !== "placeholder");
            newState.typeOptions = newTypeOptions;
        }
        this.setState(newState);
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
            isResolvedMessage: await this.state.feeder!.feedPet(speciesInput, typeInput),
        });
    }
}

const styles = StyleSheet.create({
    picker: {
        width: Dimensions.get("window").width - 100,
    },
});
