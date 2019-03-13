import React from "react";
import { Component } from "react";
import { Alert, Picker } from "react-native";

import { Input } from "../controls/Input";
import { BaseInputDialog } from "./BaseInputDialog";

import { feedPet, getPetList } from "../../items/feedPet";

interface IFeedPetDialogProps {
    close: () => void;
}

export class FeedPetDialog extends Component<IFeedPetDialogProps> {
    state = {
        speciesOptions: [{ id: "placeholder", name: "Select a pet..." }],
        speciesInput: undefined,
        typeOptions: [{ id: "placeholder", name: "Select a type..." }],
        typeInput: undefined,
    };

    async componentDidMount() {
        const petList = await getPetList();

        const speciesList = petList.map(pet => {
            return { id: pet.species, name: pet.species };
        });
        const speciesOptions = this.state.speciesOptions.concat(speciesList);
        this.setState({ speciesOptions });

        const typeList = petList.map(pet => {
            return { id: pet.type, name: pet.type };
        });
        const typeOptions = this.state.typeOptions.concat(typeList);
        this.setState({ typeOptions });
    }

    render() {
        const dialogText = "The selected pet will be fed with type-appropriate food either "
            + "until it turns into a mount or you run out food for the designated type.";

        const speciesPickerOptions = this.state.speciesOptions
            .map((species) => <Picker.Item label={species.name} key={species.id} value={species.id} color="#34313A"/>);

        const typePickerOptions = this.state.typeOptions
            .map((type) => <Picker.Item label={type.name} key={type.id} value={type.id} color="#34313A"/>);

        return (
            <BaseInputDialog
                dialogTitle="Feed Pet"
                dialogText={dialogText}
                close={this.props.close}
                onSubmit={this.onSubmit}
            >
                <Picker
                    enabled={this.state.speciesOptions.length > 1}
                    onValueChange={this.setSpeciesInput}
                    selectedValue={this.state.speciesInput}
                >
                    {speciesPickerOptions}
                </Picker>
                <Picker
                    enabled={this.state.typeOptions.length > 1}
                    onValueChange={this.setTypeInput}
                    selectedValue={this.state.typeInput}
                >
                    {typePickerOptions}
                </Picker>
                <Input
                    onChangeText={input => this.setState({ usesInput: input })}
                    autoFocus={true}
                    keyboardType={"numeric"}
                    placeholder="Number of uses"
                />
            </BaseInputDialog>
        );
    }

    private setSpeciesInput = (skillInput: string) => {
        if (skillInput !== "placeholder") {
            const newOptions = this.state.speciesOptions.filter(option => option.id !== "placeholder");
            this.setState({ speciesOptions: newOptions, skillInput });
        } else {
            this.setState({ skillInput });
        }
    }

    private setTypeInput = (skillInput: string) => {
        if (skillInput !== "placeholder") {
            const newOptions = this.state.speciesOptions.filter(option => option.id !== "placeholder");
            this.setState({ speciesOptions: newOptions, skillInput });
        } else {
            this.setState({ skillInput });
        }
    }

    private onSubmit = async () => {
        const speciesInput = this.state.speciesInput;
        if (!speciesInput || speciesInput === "placeholder") {
            return Alert.alert("No skill selected");
        }

        const typeInput = this.state.typeInput;
        if (!typeInput || typeInput === "placeholder") {
            return Alert.alert("No skill selected");
        }

        Alert.alert(`Feeding ${speciesInput}`, await feedPet(speciesInput, typeInput));
        this.props.close();
    }
}
