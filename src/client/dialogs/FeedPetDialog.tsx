import React from "react";
import { Alert } from "react-native";

import PetFeeder from "../../items/PetFeeder";
import { PetType } from "../../items/servingsHelpers";
import IHabiticaData from "../../userData/IHabiticaData";

import Interaction from "../Interaction";
import PetPicker from "../items/PetPicker";
import ServingsOverview from "./ServingsOverview";

interface IFeedPetDialogProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IFeedPetDialogState {
    feeder?: PetFeeder;
    speciesInput?: string;
    typeInput?: string;
    loading: boolean;
    isResolvedMessage?: string;
}

export class FeedPetDialog extends React.Component<IFeedPetDialogProps, IFeedPetDialogState> {
    constructor(props: IFeedPetDialogProps) {
        super(props);
        this.state = { loading: true };
    }

    async componentDidMount() {
        const feeder = new PetFeeder(await this.props.userData);
        this.setState({ feeder, loading: false });
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
                <PetPicker
                    feeder={this.state.feeder!}
                    handleSpeciesChange={(speciesInput) => this.setState({ speciesInput })}
                    handleTypeChange={(typeInput) => this.setState({ typeInput })}
                />
            </Interaction>
        );
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
