import { BlurView } from "expo-blur"
import { useEffect, useState } from "react"
import { Appearance, Dimensions, View } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import TextRegular from "../TextRegular"
import { TouchableOpacity } from "react-native"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import DarkColours from "../../Themes/DarkColours"
import LightColours from "../../Themes/LightColours"

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

                    <Animated.View
                        entering={FadeIn.duration(200)}
                        exiting={FadeOut.duration(200)}
                        style={{
                            flex: 1, alignItems: 'center',
                            flexDirection: 'row',
                            width: '100%', justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity style={{
                            width: 28, height: 28,
                            borderRadius: 20, alignItems: 'center', justifyContent: 'center',
                            marginStart: 20
                        }}>

                        </TouchableOpacity>
                        {
                            visible && (<Animated.View
                                entering={FadeIn.duration(200)}
                                exiting={FadeOut.duration(200)}>
                                <TextRegular value={name == 'chat' ? 'Chats' :
                                    name == 'settings' ? "Settings" :
                                        name == 'search' ? 'Search' :
                                            'Home'
                                } bold />
                            </Animated.View>)
                        }
                        <TouchableOpacity style={{
                            width: 28, height: 28,
                            backgroundColor: themeState === 'dark' ?
                                '#414141' : LightColours.secondary,
                            borderRadius: 20, alignItems: 'center', justifyContent: 'center',
                            marginEnd: 20
                        }}>
                            <MaterialCommunityIcons name="dots-horizontal" size={22}
                                color={themeState === 'dark' ? 'white' : 'black'} />
                        </TouchableOpacity>
                    </Animated.View>

                }
            </SafeAreaView>
        </BlurView>
    )
}