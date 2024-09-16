import React from "react";
import TextRegular from "./TextRegular";
import { Dimensions } from "react-native";
import TouchableScale from "@jonny/touchable-scale";
import DarkColours from "../Themes/DarkColours";

const Custombutton = ({ text,
    onPress,
    disabled,
    marginStart,
    marginEnd,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical,
    codeloom,
    small
}) => {
    return (
        <TouchableScale onPress={onPress} style={{
            borderRadius: small ? 35 : 10, marginStart: marginStart,
            marginEnd: marginEnd, marginBottom: marginBottom,
            marginTop: marginTop, marginHorizontal: marginHorizontal,
            marginVertical: marginVertical, backgroundColor: codeloom ? DarkColours.codeloom : DarkColours.primary,
            paddingVertical: 20, width: small ? Dimensions.get('window').width - 200 : Dimensions.get('window').width - 65,
        }}
            disabled={disabled}>
            <TextRegular value={text} bold inverted fontSize={small ? 16 : 18} />
        </TouchableScale>
    )
}

export default Custombutton