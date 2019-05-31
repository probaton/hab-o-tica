import React from "react";
import { Alert } from "react-native";

import IHabiticaData from "../../userData/IHabiticaData";

import Interaction from "../Interaction";

interface IProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IState {
    viewState?: "overview" | "add";
    gearTypeInput?: string;
    loading: boolean;
    isResolvedMessage?: string;
}

export class WardrobeDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { loading: true };
    }

    async componentDidMount() {
        this.setState({ loading: false });
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
            </Interaction>
        );
    }

    private onSubmit = async () => {
        this.setState({ loading: true });
        this.setState({ loading: false, isResolvedMessage: "w00t" });
    }
}
