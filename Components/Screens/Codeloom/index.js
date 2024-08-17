import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, ImageBackground, TouchableOpacity, View } from "react-native";
import stylesheet from "../../UIElements/StyleSheet";
import { BackButton } from "../../UIElements/Back";
import { BlurView } from "expo-blur";
import TextBold from "../../UIElements/TextBold";
import TextRegular from "../../UIElements/TextRegular";

import CodeloomIcon from '../../Assets/Icons/codeloom.svg'
import { CustomTextInput } from "../../UIElements/TextInput";
import { Divider, Text } from "react-native-paper";
import DarkColours from "../../Themes/DarkColours";
import Custombutton from "../../UIElements/Button";
import GoogleButton from "../../UIElements/GoogleButton";

const Codeloom = (props) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    return (
        <View style={[stylesheet.container]}>
            <ImageBackground
                source={require('../../Assets/Images/codeloombg.jpg')}
                style={{ width: '100%', height: '100%', flex: 1 }}>

                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    width: '85%', justifyContent: 'space-between',
                    alignSelf: 'center', marginVertical: 25
                }}>
                    <BackButton props={props} flexStart white
                    />
                    <CodeloomIcon />
                </View>
                <TextBold value={`Experience`} fontSize={35}
                    fontWeight={"bold"} textAlign="left" flexStart
                    marginStart={20} marginTop={20} inverted />
                <TextBold value={`Codeloom One`} fontSize={37}
                    fontWeight={"bold"} textAlign="left" flexStart
                    marginStart={20} inverted />
                <TextRegular value={'Sign in or Create Codeloom One account with Email or Phone to get started.'}
                    flexStart textAlign="left"
                    marginStart={20} marginTop={10}
                    marginEnd={Dimensions.get('window').width / 5} inverted />

                <View style={{ flex: 1, justifyContent: 'space-between', }}>
                    <CustomTextInput label={"Email or Phone"} marginTop={50}
                        icon="account" dark />

                    <View style={{ alignItems: 'center', marginBottom: 50 }}>

                        <Custombutton text="Continue" marginTop={20}
                            onPress={() => {
                                setLoading(true)
                            }} codeloom/>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center',
                            marginTop: 20, marginBottom: 20
                        }}>
                            <Divider style={{
                                width: 100,
                                backgroundColor: 'gray'
                            }} />
                            <Text style={{ color: 'gray' }}>    OR    </Text>
                            <Divider style={{
                                width: 100,
                                backgroundColor: 'gray'
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '85%', marginBottom: 50
                        }}>
                            <GoogleButton full/>

                        </View>
                        <Text style={{
                            fontFamily: 'Mulish-Regular',
                            paddingHorizontal: 50, textAlign: 'center',
                            color: 'white'
                        }}>
                            By tapping "Continue," I confirm that I agree to
                        </Text>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate("PrivacyPolicy")
                        }}>
                            <Text style={{
                                fontFamily: 'Mulish-Regular',
                                paddingHorizontal: 50, textAlign: 'center',
                                color: DarkColours.codeloom
                            }}>
                                Terms & Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>


        </View>
    )
}

export default Codeloom