import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesheet from "../../UIElements/StyleSheet";
import LottieView from "lottie-react-native";
import { RandomLoaderText } from "../../Assets/Data/RandomLoaderText";
import { Stagger } from "@animatereactnative/stagger";
import { FadeInUp, FadeOut } from "react-native-reanimated";
import TextBold from "../../UIElements/TextBold";
import TextRegular from "../../UIElements/TextRegular";
import { ActivityIndicator } from "react-native-paper";
import { auth } from "../../../Config/firebase.config";

const LoadingScreen = (props) => {
    function getRandomLoaderText() {
        const randomIndex = Math.floor(Math.random() * RandomLoaderText.length);
        return RandomLoaderText[randomIndex];
    }

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    const [randomText, setRandomText] = useState(getRandomLoaderText())

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.displayName) {
                    setTimeout(() => {
                        props.navigation.navigate('Home')
                    }, 1500);
                } else {
                    setTimeout(() => {
                        props.navigation.navigate('Registration')
                    }, 1500);
                }
            } else {
                setTimeout(() => {
                    props.navigation.navigate('Onboarding')
                }, 1500);
            }
        })
    }, [])

    return (
        <SafeAreaView style={[stylesheet.container, {
            justifyContent: 'center', flex: 1
        }]}>
            <LottieView
                source={require('../../Assets/Animations/loading.json')}
                autoPlay
                loop
                style={{
                    width: '100%',
                    height: Dimensions.get('window').width - 50
                }} />
            <Stagger
                stagger={50}
                duration={200}
                exitDirection={-1}
                entering={() => FadeInUp.springify()}
                exiting={() => FadeOut.springify()}
            >
                <TextBold value={randomText} paddingHorizontal={20} fontSize={22} />
            </Stagger>
            <View style={{
                position: 'absolute',
                bottom: 30, alignItems: 'center'
            }}>
                <ActivityIndicator size={25} color={themeState === 'dark' ?
                    "white" : "black"
                } style={{
                    marginBottom: 20
                }} />
                <TextRegular value={'Loading...'} />
            </View>
        </SafeAreaView>
    )
}

export default LoadingScreen