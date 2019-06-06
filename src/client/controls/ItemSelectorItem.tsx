import React from "react";

import TouchButton from "./TouchButton";

interface IProps {
    itemName: string;
    onClick: (itemName: string) => void;
}

export default class ItemSelectorItem extends React.Component<IProps> {
    render() {
        return <TouchButton onPress={this.onClick} caption={this.props.itemName}/>;
    }

    private onClick = () => {
        this.props.onClick(this.props.itemName);
    }
}
