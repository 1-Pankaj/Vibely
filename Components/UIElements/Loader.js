import { BlurView } from "expo-blur"
import LottieView from "lottie-react-native"
import { useEffect, useState } from "react"
import { Appearance, Dimensions, View } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import { ActivityIndicator, Modal, Portal } from "react-native-paper"

export const Loader = ({ visible, white }) => {
    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])
    return (
        <Portal>
            <Modal visible={visible} style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <BlurView style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }}
                    intensity={100} experimentalBlurMethod="dimezisBlurView">
                    <LottieView
                        source={require('../Assets/Animations/spinner.json')}
                        style={{
                            width: 35, height: 35
                        }} autoPlay loop />
                </BlurView>
            </Modal>
        </Portal>
    )
}