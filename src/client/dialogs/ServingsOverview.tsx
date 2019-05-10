import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { PetType, ServingsPerType } from "../../items/servingsHelpers";

interface IProps {
    servingsMap: ServingsPerType | undefined;
}

export default class ServingsOverview extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.servingsOverview}>
                <Text style={styles.title}>Currently available food</Text>
                <View style={styles.servingRow}>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/Base.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("Base")}
                        </ImageBackground>
                    </View>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/White.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("White")}
                        </ImageBackground>
                    </View>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/Desert.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("Desert")}
                        </ImageBackground>
                    </View>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/Red.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("Red")}
                        </ImageBackground>
                    </View>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/Shade.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmountShade()}
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.servingRow}>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/Skeleton.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("Skeleton")}
                        </ImageBackground>
                    </View>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/Zombie.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("Zombie")}
                        </ImageBackground>
                    </View>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/CottonCandyPink.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("CottonCandyPink")}
                        </ImageBackground>
                    </View>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/CottonCandyBlue.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("CottonCandyBlue")}
                        </ImageBackground>
                    </View>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/Golden.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("Golden")}
                        </ImageBackground>
                    </View>
                </View>
            </View>

        );

    }

    renderAmount(type: PetType) {
        const servingsPerType = this.props.servingsMap;
        const amount = servingsPerType ? servingsPerType[type].length : 0;
        return <Text style={styles.servingsAmount}>x{amount}</Text>;
    }

    renderAmountShade() {
        const servingsPerType = this.props.servingsMap;
        const amount = servingsPerType ? servingsPerType.Shade.length : 0;
        return <Text style={styles.servingsAmountDark}>x{amount}</Text>;
    }
}

const styles = StyleSheet.create({
    servingsOverview: {
        backgroundColor: "#EDECEE",
        borderRadius: 5,
        alignItems: "center",
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#6e6976ff",
        padding: 5,
    },
    servingRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    serving: {
        margin: 5,
    },
    typeImage: {
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        width: 48,
    },
    servingsAmount: {
        fontSize: 20,
    },
    servingsAmountDark: {
        color: "#FFFFFF",
        fontSize: 20,
    },
});

