import React, { useEffect, useState } from "react";
import TextRegular from "./TextRegular";
import { Appearance, Dimensions, View, } from "react-native";
import DarkColours from "../Themes/DarkColours";
import LightColours from "../Themes/LightColours";

import CodeloomIcon from '../Assets/Icons/codeloom.svg'
import GoogleIcon from '../Assets/Icons/google.svg'
import TouchableScale from "@jonny/touchable-scale";

const CodeloomButton = ({ text,
    onPress,
    disabled,
    marginStart,
    marginEnd,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical }) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    return (
        <TouchableScale onPress={onPress} textColor={themeState == 'dark' ?
            'white' : 'black'
        } style={{
            borderRadius: 10, marginStart: marginStart,
            marginEnd: marginEnd, marginBottom: marginBottom,
            marginTop: marginTop, marginHorizontal: marginHorizontal,
            marginVertical: marginVertical, width: '45%',
            paddingVertical: 17, backgroundColor: DarkColours.secondary,
            alignItems: 'center', flexDirection: 'row',
            justifyContent: 'center'
        }}
            disabled={disabled} activeOpacity={0.6}>
            <CodeloomIcon />
            <TextRegular value={"Codeloom"} bold
                marginStart={15} inverted />
        </TouchableScale>
    )
}

export default CodeloomButton