import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React, { useState } from "react";
import { Appearance, TouchableHighlight, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SafeAreaView } from "react-native-safe-area-context";
import stylesheet from "../UIElements/StyleSheet";
import TextBold from "../UIElements/TextBold";
import TextRegular from "../UIElements/TextRegular";
import ThemeButton from "../UIElements/Button";
import { Button, Card, Text, TextInput, TouchableRipple } from "react-native-paper";
import GoogleIcon from '../Assets/Icons/google.svg'
import PhoneDay from '../Assets/Day/phone-day.svg'
import PhoneNight from '../Assets/Night/phone-night.svg'

import auth from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth/web-extension";
import { signInWithRedirect } from "firebase/auth";

const Registration = (props) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    Appearance.addChangeListener(() => {
        setThemeState(Appearance.getColorScheme())
    })
    
    const onPress = () => {

    }
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';
    

    return (
        <SafeAreaView style={[stylesheet.container]}>
            <View style={{ width: '90%', alignItems: 'flex-start' }}>
                <TouchableHighlight onPress={() => { props.navigation.goBack() }} underlayColor={themeState === 'dark' ? '#152033' : '#F7F7FC'}
                    style={{
                        width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
                        borderRadius: 20
                    }}>
                    <MaterialIcons name="arrow-back-ios-new" size={25} color={themeState === 'light' ? 'black' : 'white'} />
                </TouchableHighlight>
            </View>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-around', flex: 1 }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TextBold value={"Enter Your Email ID"} />
                    <TextRegular value={`Please enter your Email ID which\nwill be used to access Chateo AI`} />
                    <TextInput mode="flat" label={<Text
                        style={{ color: themeState === 'dark' ? 'white' : '#ADB5BD' }}>Email ID</Text>} outlineColor={themeState === 'dark' ? '#152033' : '#F7F7FC'}
                        style={{ width: '80%', backgroundColor: themeState === 'dark' ? '#152033' : '#F7F7FC', marginTop: 50 }}
                        activeOutlineColor="gray" textColor={themeState === 'dark' ? 'white' : 'black'} autoFocus
                    />
                </View>

                <View style={{ alignItems: 'center', width: '100%' }}>
                    <ThemeButton text={"Continue"} onPress={onPress} />
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        marginTop: 30, marginBottom: 30
                    }}>
                        <View style={{ width: 100, height: 1, borderRadius: 10, backgroundColor: themeState == 'dark' ? 'gray' : 'darkgray' }} />
                        <Text style={{ color: themeState == 'dark' ? 'gray' : 'darkgray' }}>   Or Sign in with   </Text>
                        <View style={{ width: 100, height: 1, borderRadius: 10, backgroundColor: themeState == 'dark' ? 'gray' : 'darkgray' }} />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-evenly' }}>
                        <TouchableRipple onPress={() => { }} borderless style={{
                            width: '40%', borderRadius: 50, backgroundColor: themeState === 'dark' ? '#1A2231' : '#E8E8E8',
                            justifyContent: 'center'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 17 }}>
                                <GoogleIcon />
                                <TextRegular bold value={"Google"} marginStart={15} />
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => { }} borderless style={{
                            width: '40%', borderRadius: 50, backgroundColor: themeState === 'dark' ? '#1A2231' : '#E8E8E8',
                            justifyContent: 'center'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 17 }}>
                                {
                                    themeState === 'dark' ?
                                        <PhoneNight />
                                        :
                                        <PhoneDay />
                                }
                                <TextRegular bold value={"Phone"} marginStart={15} />
                            </View>
                        </TouchableRipple>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Registration