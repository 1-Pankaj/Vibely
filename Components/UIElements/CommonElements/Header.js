import { BlurView } from "expo-blur"
import { useEffect, useState } from "react"
import { Appearance, Dimensions, View } from "react-native"
import { Button, Portal, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

export default Header = ({ name, visible }) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    const [visibleTitle, setVisibleTitle] = useState(visible)

    useEffect(()=>{
        setVisibleTitle(visible)
    },[visible])

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    return (
        <BlurView style={{
            width: Dimensions.get('window').width,
            height: 100, position: 'absolute',
            top: 0, left: 0, right: 0, zIndex: 1
        }}
            intensity={50} experimentalBlurMethod="dimezisBlurView"
            tint={themeState == 'dark' ?
                'systemChromeMaterialDark'
                :
                'systemChromeMaterialLight'
            }>
            <SafeAreaView style={{ width: '100%', height: '100%' }}>
                {
                    visible && (
                        <Text style={{
                            color:'white'
                        }}>{name}</Text>
                    )
                }
            </SafeAreaView>
        </BlurView>
    )
}