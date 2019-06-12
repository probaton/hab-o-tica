import React from "react";

import IHabiticaData from "../userData/IHabiticaData";

import { FeedPetDialog } from "./dialogs/FeedPetDialog";
import { LootArmoireDialog } from "./dialogs/LootArmoireDialog";
import { SpamSkillDialog } from "./dialogs/SpamSkillDialog";
import { WardrobeDialog } from "./dialogs/WardrobeDialog";
import IconButton from "./IconButton";

interface IHomeProps {
    userData: { lastUpdate: number, data: Promise<IHabiticaData> };
    refresh: () => void;
}

interface IHomeState {
    viewState?: HomeViewState;
}

type HomeViewState = "feedPet" | "spamSkill" | "lootArmoire" | "wardrobe";

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = { viewState: undefined };
    }
    render() {
        return (
            <>
                {this.renderContent()}
            </>
        );
    }

    private renderContent() {
        switch (this.state.viewState) {
            case "feedPet": return <FeedPetDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
            case "spamSkill": return <SpamSkillDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
            case "lootArmoire": return <LootArmoireDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
            case "wardrobe": return <WardrobeDialog userData={this.props.userData.data} close={this.closeDialogs}/>;
            case undefined: return this.renderButtons();
        }
    }

    private renderButtons() {
        return (
            <>
                <IconButton caption="Feed pets" imageSource={require("./images/FeedPet.png")} onPress={() => this.openDialog("feedPet")}/>
                <IconButton caption="Skills" imageSource={require("./images/UseSkill.png")} onPress={() => this.openDialog("spamSkill")}/>
                <IconButton caption="Loot armoire" imageSource={require("./images/Armoire.png")} onPress={() => this.openDialog("lootArmoire")}/>
                <IconButton caption="Wardrobe" imageSource={require("./images/Wardrobe.png")} onPress={() => this.openDialog("wardrobe")}/>
            </>
        );
    }

    private openDialog(viewState: HomeViewState) {
        this.refreshUserData();
        this.setState({ viewState });
    }

    private refreshUserData = async () => {
        if (new Date().getTime() - this.props.userData.lastUpdate > 180000) {
            this.props.refresh();
        }
    }

    private closeDialogs = () => {
        this.props.refresh();
        this.setState({ viewState: undefined });
    }
}
