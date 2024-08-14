import { useState } from "react"
import { Appearance } from "react-native"
import { PaperProvider, Text } from "react-native-paper"

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
    textAlign
}) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    Appearance.addChangeListener(() => {
        setThemeState(Appearance.getColorScheme())
    })

    return (
        <Text style={{
            fontSize: bold? 18 : 16,
            fontFamily: bold? 'Mulish-SemiBold' : 'Mulish-Regular',
            fontWeight: 'regular',
            color: inverted? 'white' : themeState === 'dark' ? 'white' : 'black',
            marginStart: marginStart,
            marginEnd: marginEnd, marginBottom: marginBottom,
            marginTop: marginTop, marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            alignSelf:flexStart? 'flex-start' : 'center',
            paddingHorizontal:paddingHorizontal,
            textAlign:textAlign? textAlign : 'center'
        }}>
            {value}
        </Text>
    )
}

export default TextRegular