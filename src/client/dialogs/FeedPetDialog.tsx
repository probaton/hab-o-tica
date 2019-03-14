import React from "react";
import { Component } from "react";
import { Alert, Picker } from "react-native";

import { BaseInputDialog } from "./BaseInputDialog";

import { feedPet } from "../../items/feedPet";
import { IPet, PetParser } from "../../items/PetParser";
import { IHabiticaData } from "../../userData/IHabiticaData";
import { getUserData } from "../../userData/userData";

interface IFeedPetDialogProps {
    close: () => void;
}

interface IFeedPetDialogState {
    userData: Promise<IHabiticaData>;
    petList: IPet[] | undefined;
    speciesOptions: Array<{ id: string, name: string }> | undefined;
    speciesInput: string;
    typeOptions: Array<{ id: string, name: string }> | undefined;
    typeInput: string;
    loading: boolean;
}

export class FeedPetDialog extends Component<IFeedPetDialogProps, IFeedPetDialogState> {
    speciesPlaceholder = { id: "placeholder", name: "Select a pet..." };
    typePlaceholder = { id: "placeholder", name: "Select a type..." };

    constructor(props: IFeedPetDialogProps) {
        super(props);
        this.state = {
            userData: getUserData(),
            petList: [],
            speciesOptions: [this.speciesPlaceholder],
            speciesInput: "",
            typeOptions: [this.typePlaceholder],
            typeInput: "",
            loading: true,
        };
    }

    async componentDidMount() {
        const petList = new PetParser(await this.state.userData).parsePets();

        const speciesOptions = petList.map(pet => {
                return { id: pet.species, name: pet.species };
            });
        speciesOptions.sort((a, b) => a.name.localeCompare(b.name));
        speciesOptions.unshift(this.speciesPlaceholder);

        this.setState({ petList, speciesOptions, loading: false });
    }

    render() {
        const dialogText = "Feed a pet with food it really likes until you run out or it turns into a mount.";

        const { speciesOptions, typeOptions, loading } = this.state;

        const speciesPickerOptions = speciesOptions!
            .map((species) => <Picker.Item label={species.name} key={species.id} value={species.id} color="#34313A"/>);

        const typePickerOptions = typeOptions!
            .map((type) => <Picker.Item label={type.name} key={type.id} value={type.id} color="#34313A"/>);

        return (
            <BaseInputDialog
                dialogTitle="Feed Pet"
                dialogText={dialogText}
                close={this.props.close}
                onSubmit={this.onSubmit}
                loading={loading}
            >
                <Picker
                    enabled={speciesOptions && speciesOptions.length > 1}
                    onValueChange={this.handleSpeciesChange}
                    selectedValue={this.state.speciesInput}
                >
                    {speciesPickerOptions}
                </Picker>
                <Picker
                    enabled={typeOptions && typeOptions.length > 1}
                    onValueChange={this.handleTypeChange}
                    selectedValue={this.state.typeInput}
                >
                    {typePickerOptions}
                </Picker>
            </BaseInputDialog>
        );
    }

    private handleSpeciesChange = (speciesInput: string) => {
        const newState: any = { speciesInput };

        const pet = this.state.petList!.find(p => p.species === speciesInput);
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

        const food = (await this.state.userData).items.food;
        Alert.alert(`Feeding ${speciesInput}`, await feedPet(speciesInput, typeInput, food));
        this.props.close();
    }
}
