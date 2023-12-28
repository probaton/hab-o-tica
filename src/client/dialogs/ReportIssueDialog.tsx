import React from "react";
import { Alert, TextInput } from "react-native";

import Input from "../controls/Input";
import BaseInputDialog from "./BaseInputDialog";

import { postGitHubIssue } from "../../requests/postGitHubIssue";

interface IProps {
    close: () => void;
}

interface IState {
    loading: boolean;
    titleInput?: string;
    descriptionInput?: string;
    isResolvedMessage?: string;
}

export default class ReportIssueDialog extends React.Component<IProps, IState> {
    private descriptionInput = React.createRef<TextInput>();

    constructor(props: IProps) {
        super(props);
        this.state = { loading: false };
    }

    render() {
        return (
            <BaseInputDialog
                dialogTitle="Report issue"
                dialogText="Please describe the problem you're having in as much detail as you can."
                close={this.props.close}
                onSubmit={this.onSubmit}
                isResolvedMessage={this.state.isResolvedMessage}
                loading={this.state.loading}
            >
                <Input
                    placeholder="Title"
                    onChangeText={titleInput => this.setState({ titleInput })}
                    onSubmitEditing={this.focusNext}
                    stayOpenOnSubmit={true}
                />
                <Input
                    placeholder="Description"
                    onChangeText={descriptionInput => this.setState({ descriptionInput })}
                    inputRef={this.descriptionInput}
                />
            </BaseInputDialog>
        );
    }

    private onSubmit = async () => {
        const { titleInput, descriptionInput } = this.state;
        if (!titleInput) {
            return Alert.alert("Missing title", "Title cannot be empty.");
        }
        if (!descriptionInput) {
            return Alert.alert("Missing description", "Description cannot be empty.");
        }
        this.setState({ loading: true });
        const isResolvedMessage = await postGitHubIssue(titleInput, descriptionInput);
        this.setState({ loading: false, isResolvedMessage });
    }

    private focusNext = () => {
        const node = this.descriptionInput.current;
        if (node) {
            node.focus();
        }
    }
}
