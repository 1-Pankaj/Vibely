import { BlurView } from "expo-blur"
import { useEffect, useState } from "react"
import { Appearance, Dimensions, View } from "react-native"
import { Button, Portal, Text } from "react-native-paper"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import TextRegular from "../TextRegular"

export default Header = ({ name, visible }) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    const [visibleTitle, setVisibleTitle] = useState(visible)

    useEffect(() => {
        setVisibleTitle(visible)
    }, [visible])

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
                        <Animated.View
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                        style={{flex:1,alignItems:'center'}}>
                            <TextRegular value={name == 'chat'? 'Chats' : name} bold marginTop={10}/>
                        </Animated.View>
                    )
                }
            </SafeAreaView>
        </BlurView>
    )
}