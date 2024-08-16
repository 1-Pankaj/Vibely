import React, { useEffect, useState } from "react";
import TextRegular from "./TextRegular";
import { Appearance, Dimensions, } from "react-native";
import DarkColours from "../Themes/DarkColours";
import LightColours from "../Themes/LightColours";

import GoogleIcon from '../Assets/Icons/google.svg'
import TouchableScale from "@jonny/touchable-scale";

const GoogleButton = ({ text,
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
            marginVertical: marginVertical, width: Dimensions.get('window').width - 65,
            paddingVertical: 20, backgroundColor: themeState === 'dark' ?
                DarkColours.secondary : LightColours.secondary,
            alignItems: 'center', flexDirection: 'row',
            justifyContent: 'center'
        }}
            disabled={disabled} activeOpacity={0.6}>
            <GoogleIcon size={30} style={{
                width: 30, height: 30
            }} />
            <TextRegular value={"Sign in with Google"} bold
                marginStart={25} />
        </TouchableScale>
    )
}

export default GoogleButton