import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

interface IProps {
    servingsMap: Array<{
        type: "Base" |"White" | "Desert" |  "Red" | "Shade" | "Skeleton" | "Zombie" | "CottonCandyPink" | "CottonCandyBlue" | "Golden" | "Other",
        amount: number,
    }>;
}

export class ServingsOverview extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.servingsOverview}>
                <Text>Currently available food</Text>
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
                </View>
                <View style={styles.servingRow}>
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/Shade.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("Shade")}
                        </ImageBackground>
                    </View>
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
                </View>
                <View style={styles.servingRow}>
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
                    <View style={styles.serving}>
                        <ImageBackground
                            source={require("../images/petTypes/Other.png")}
                            style={styles.typeImage}
                        >
                            {this.renderAmount("Other")}
                        </ImageBackground>
                    </View>
                </View>
            </View>

        );

    }

    renderAmount(type: "Base" | "White" | "Desert" |  "Red" | "Shade" | "Skeleton" | "Zombie" | "CottonCandyPink" | "CottonCandyBlue" | "Golden" | "Other") {
        const amount = this.props.servingsMap.find(serving => serving.type === type)!.amount;
        return <Text>x{amount}</Text>;
    }
}

const styles = StyleSheet.create({
    servingsOverview: {
        backgroundColor: "#EDECEE",
        borderRadius: 5,
        alignItems: "center",
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
        height: 36,
        width: 36,
    },
});

