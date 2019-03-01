import React, { Component } from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';

type TileButtonProps = {
    text: string;
    onPress?: () => void;
}

export class TileButton extends Component<TileButtonProps> {
    render = () => {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    alignItems: 'center',
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    height: Dimensions.get('window').height / 4
                }}>
                <Text style={{ color: 'white' }}>{this.props.text}</Text>
            </TouchableOpacity>
        )

    }
}