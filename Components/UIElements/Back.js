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
        <TouchableOpacity style={{
            width: 40, height: 40,
            alignItems: 'center', justifyContent: 'center',
            alignSelf: flexStart ? 'flex-start' : 'auto',
            margin: margin,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'gray'
        }} onPress={() => {
            props.navigation.goBack()
        }} hitSlop={10}>
            <MaterialIcons name="arrow-back-ios-new" size={20} color={white ? 'white' : themeState == 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
    )
}