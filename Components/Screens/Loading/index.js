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
import { codeloomAuth } from "../../../Config/codeloom.firebase.config";
import useAuth from "../../Hooks/useAuth";

const LoadingScreen = (props) => {
    function getRandomLoaderText() {
        const randomIndex = Math.floor(Math.random() * RandomLoaderText.length);
        return RandomLoaderText[randomIndex];
    }

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    const user = useAuth().currentAuth?.currentUser

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    const [randomText, setRandomText] = useState(getRandomLoaderText())

    const CheckUserExist = async () => {
        const userExist = await user
        console.log(userExist);
        return userExist
        
        
    }

    useEffect(() => {
        CheckUserExist().then((rs) => {
            if (rs) {
                if (user.displayName) {
                    setTimeout(() => {
                        props.navigation.replace('Home')
                    }, 0);
                } else {
                    setTimeout(() => {
                        props.navigation.replace('Registration')
                    }, 0);
                }
            } else {
                setTimeout(() => {
                    props.navigation.replace('Onboarding')
                }, 0);
            }
        }).catch((err) => {
            console.log(err);

        })

    }, [user])

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
                <LottieView
                    source={require('../../Assets/Animations/spinner.json')}
                    style={{ width: 30, height: 30, marginBottom: 10 }}
                    autoPlay loop />
                <TextRegular value={'Loading...'} />
            </View>
        </SafeAreaView>
    )
}

export default LoadingScreen