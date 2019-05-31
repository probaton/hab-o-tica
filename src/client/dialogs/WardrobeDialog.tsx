import React from "react";

import ItemSelector from "../controls/ItemSelector";
import Interaction from "../Interaction";

import { IOutfit } from "../../items/IOutfit";
import WardrobeStore from "../../store/WardrobeStore";
import IHabiticaData from "../../userData/IHabiticaData";

interface IProps {
    userData: Promise<IHabiticaData>;
    close: () => void;
}

interface IState {
    viewState?: "overview" | "add";
    wardrobe?: IOutfit[];
    loading: boolean;
    isResolvedMessage?: string;
}

export class WardrobeDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { loading: true };
    }

    async componentDidMount() {
        const newState: IState = { loading: false };
        const wardrobe = await WardrobeStore.get();
        if (wardrobe) {
            newState.wardrobe = wardrobe;
        } else {
            newState.isResolvedMessage = "You have no saved outfits.";
        }
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
                {this.renderWardrobeOverview()}
            </Interaction>
        );
    }

    private renderWardrobeOverview() {
        if (this.state.wardrobe) {
            return <ItemSelector title="Saved outfits" itemNames={this.parseItemNames()} onItemClick={this.onItemClick}/>;
        }
    }

    private onItemClick = (itemName: string) => {
        this.setState({ isResolvedMessage: "Clicky-click" });
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
