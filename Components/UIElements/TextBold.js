import { useState } from "react"
import { Appearance } from "react-native"
import { PaperProvider, Text } from "react-native-paper"
import DarkColours from "../Themes/DarkColours"

const TextBold = ({ value,
    marginStart,
    marginEnd,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical,
    padding,
    paddingHorizontal,
    fontSize,
    fontWeight,
    textAlign,
    flexStart,
    inverted,
    primary
}) => {


    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    Appearance.addChangeListener(() => {
        setThemeState(Appearance.getColorScheme())
    })

    return (
        <Text style={{
            fontSize: fontSize ? fontSize : 24,
            fontFamily: 'Mulish-Bold',
            fontWeight: fontWeight ? fontWeight : 'condensed',
            textAlign: textAlign ? textAlign : 'center',
            paddingHorizontal: paddingHorizontal,
            color: primary ? DarkColours.primary : inverted ? 'white' : themeState === 'dark' ? 'white' : 'black',
            marginStart: marginStart,
            marginEnd: marginEnd, marginBottom: marginBottom,
            marginTop: marginTop, marginHorizontal: marginHorizontal,
            marginVertical: marginVertical, padding: padding,
            alignSelf: flexStart ? 'flex-start' : 'center'
        }}>
            {value}
        </Text>

    )
}

export default TextBold