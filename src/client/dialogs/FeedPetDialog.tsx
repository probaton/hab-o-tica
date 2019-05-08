import React from "react";
import { Alert, Dimensions, Picker, StyleSheet } from "react-native";

import { PetFeeder } from "../../items/PetFeeder";
import { PetType } from "../../items/servingsHelpers";
import IHabiticaData from "../../userData/IHabiticaData";
import Interaction from "../Interaction";
import { ServingsOverview } from "./ServingsOverview";

interface IFeedPetDialogProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IFeedPetDialogState {
    feeder: PetFeeder | undefined;
    defaultSpeciesOptions: Array<{ id: string, name: string }> | undefined;
    speciesOptions: Array<{ id: string, name: string }> | undefined;
    speciesInput: string;
    defaultTypeOptions: Array<{ id: string, name: string }> | undefined;
    typeOptions: Array<{ id: string, name: string }> | undefined;
    typeInput: string;
    loading: boolean;
    isResolvedMessage?: string;
}

export class FeedPetDialog extends React.Component<IFeedPetDialogProps, IFeedPetDialogState> {
    speciesPlaceholder = { id: "placeholder", name: "Select a pet..." };
    typePlaceholder = { id: "placeholder", name: "Select a type..." };

    constructor(props: IFeedPetDialogProps) {
        super(props);
        this.state = {
            feeder: undefined,
            defaultSpeciesOptions: [this.speciesPlaceholder],
            speciesOptions: [this.speciesPlaceholder],
            speciesInput: "",
            defaultTypeOptions: [this.typePlaceholder],
            typeOptions: [this.typePlaceholder],
            typeInput: "",
            loading: true,
        };
    }

    async componentDidMount() {
        const feeder = new PetFeeder(await this.props.userData);

        const speciesOptions = feeder.speciesList.map(pet => {
                return { id: pet.name, name: pet.displayName };
            });
        speciesOptions.sort((a, b) => a.name.localeCompare(b.name));
        speciesOptions.unshift(this.speciesPlaceholder);

        const typeOptions = feeder.petTypeList.map(type => {
            return { id: type.name, name: type.displayName };
        });
        typeOptions.sort((a, b) => a.name.localeCompare(b.name));
        typeOptions.unshift(this.typePlaceholder);

        this.setState({
            feeder,
            defaultSpeciesOptions: speciesOptions,
            speciesOptions,
            defaultTypeOptions: typeOptions,
            typeOptions,
            loading: false,
        });
    }

    render() {
        const dialogText = "Feed a pet with food it really likes until you run out or it grows into a mount.";

        const { feeder, speciesOptions, typeOptions, loading, speciesInput, typeInput, isResolvedMessage } = this.state;

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
                <ServingsOverview servingsMap={feeder ? feeder.servingsPerType : undefined}/>
                <Picker
                    style={styles.picker}
                    onValueChange={this.handleSpeciesChange}
                    selectedValue={speciesInput}
                >
                    {speciesPickerOptions}
                </Picker>
                <Picker
                    style={styles.picker}
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

        const species = this.state.feeder!.speciesList.find(p => p.name === speciesInput);
        if (species) {
            const newTypeOptions = species.types.map(type => {
                return { id: type, name: type };
            }).sort((a, b) => a.name.localeCompare(b.name));

            if (newTypeOptions.length === 1) {
                newState.typeInput = newTypeOptions[0].name;
            }

            newTypeOptions.unshift(this.typePlaceholder);
            newState.typeOptions = newTypeOptions;
        } else {
            newState.typeOptions = this.state.defaultTypeOptions;
            newState.typeInput = this.typePlaceholder.name;
        }

        this.setState(newState);
    }

    private handleTypeChange = (typeInput: string) => {
        const newState: any = { typeInput };

        const type = this.state.feeder!.petTypeList.find(t => t.name === typeInput);
        if (type) {
            const newSpeciesOptions = type.species.map(species => {
                return { id: species, name: species };
            }).sort((a, b) => a.name.localeCompare(b.name));

            if (newSpeciesOptions.length === 1) {
                newState.speciesInput = newSpeciesOptions[0].name;
            }

            newSpeciesOptions.unshift(this.speciesPlaceholder);
            newState.speciesOptions = newSpeciesOptions;
        } else {
            newState.speciesOptions = this.state.defaultSpeciesOptions;
            newState.speciesInput = this.speciesPlaceholder;
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
            isResolvedMessage: await this.state.feeder!.feedPet(speciesInput, (typeInput as PetType)),
        });
    }
}

const styles = StyleSheet.create({
    picker: {
        width: Dimensions.get("window").width - 100,
    },
});
