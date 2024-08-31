import { useState } from "react"
import { Appearance } from "react-native"
import { PaperProvider, Text } from "react-native-paper"
import DarkColours from "../Themes/DarkColours"

const TextRegular = ({ value,
    marginStart,
    marginEnd,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical,
    bold,
    inverted,
    flexStart,
    paddingHorizontal,
    textAlign,
    primary,
    fontSize,
    light,
    red
}) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    Appearance.addChangeListener(() => {
        setThemeState(Appearance.getColorScheme())
    })

    return (
        <Text style={{
            fontSize: fontSize? fontSize : bold ? 18 : 16,
            fontFamily: bold ? 'Mulish-SemiBold' : 'Mulish-Regular',
            fontWeight: 'regular',
            color: red? 'red' :
            light? themeState === 'dark'? 'lightgray' : 'gray' : primary ? DarkColours.primary : inverted ? 'white' : themeState === 'dark' ? 'white' : 'black',
            marginStart: marginStart,
            marginEnd: marginEnd, marginBottom: marginBottom,
            marginTop: marginTop, marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            alignSelf: flexStart ? 'flex-start' : 'center',
            paddingHorizontal: paddingHorizontal,
            textAlign: textAlign ? textAlign : 'center'
        }}>
            {value}
        </Text>
    )
}

export default TextRegular