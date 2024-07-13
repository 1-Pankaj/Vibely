import { useState } from "react"
import { Appearance } from "react-native"
import { PaperProvider, Text } from "react-native-paper"

const TextBold = ({ value,
    marginStart,
    marginEnd,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical,
    padding,
    paddingHorizontal
}) => {


    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    Appearance.addChangeListener(() => {
        setThemeState(Appearance.getColorScheme())
    })

    return (
        <Text style={{
            fontSize: 24,
            fontFamily: 'Mulish-Bold',
            fontWeight: 'condensed',
            textAlign: 'center',
            paddingHorizontal: paddingHorizontal,
            color: themeState === 'dark' ? 'white' : 'black',
            marginStart: marginStart,
            marginEnd: marginEnd, marginBottom: marginBottom,
            marginTop: marginTop, marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,padding:padding,
        }}>
            {value}
        </Text>

    )
}

export default TextBold