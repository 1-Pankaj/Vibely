import { MaterialIcons } from "@expo/vector-icons";
import TouchableScale from "@jonny/touchable-scale";
import { useEffect, useState } from "react";
import { Appearance, TouchableOpacity } from "react-native";

export const BackButton = ({
    props,
    flexStart,
    margin,
    white
}) => {
    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])
    return (
        <TouchableScale style={{
            width: 35, height: 35,
            alignItems: 'center', justifyContent: 'center',
            alignSelf: flexStart ? 'flex-start' : 'auto',
            margin: margin
        }} onPress={() => {
            props.navigation.goBack()
        }}>
            <MaterialIcons name="arrow-back-ios" size={30} color={white ? 'white' : themeState == 'dark' ? 'white' : 'black'} />
        </TouchableScale>
    )
}