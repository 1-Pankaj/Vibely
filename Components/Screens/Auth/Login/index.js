import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, TouchableOpacity, View } from "react-native";
import stylesheet from "../../../UIElements/StyleSheet";
import { BackButton } from "../../../UIElements/Back";
import TextBold from "../../../UIElements/TextBold";
import TextRegular from "../../../UIElements/TextRegular";
import { CustomTextInput } from "../../../UIElements/TextInput";
import Custombutton from "../../../UIElements/Button";
import { Divider, Text } from "react-native-paper";
import GoogleButton from "../../../UIElements/GoogleButton";
import DarkColours from "../../../Themes/DarkColours";
import { Loader } from "../../../UIElements/Loader";
import CodeloomButton from "../../../UIElements/CodeloomButton";
import { auth } from "../../../../Config/firebase.config";
import { getAdditionalUserInfo } from "firebase/auth";

export default Login = (props) => {

    const [loading, setLoading] = useState(false)
    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    useEffect(() => {
        auth.onAuthStateChanged(
            (user) => {
                setLoading(true);

                if (user) {
                    const { metadata } = auth.currentUser || {};
                    if (metadata) {
                        if (metadata.creationTime === metadata.lastSignInTime) {
                            props.navigation.reset({
                                index: 0,
                                routes: [{name: 'Registration'}],
                              });
                              
                            setLoading(false);
                        } else {
                            console.log('User has signed in before.');
                            setLoading(false);
                        }
                    } else {
                        console.error('Metadata is undefined. User might not be authenticated correctly.');
                        setLoading(false);
                    }
                } else {
                    console.log('No user is signed in.');
                    setLoading(false);
                }

            },
            (err) => {
                setLoading(false);
                console.error('An error occurred during authentication state change:', err.message);
            }
        );

    }, [])


    return (
        <View style={[stylesheet.container, {
            justifyContent: 'space-between'
        }]}>
            <View>
                <BackButton props={props} flexStart margin={25} />
                <TextBold value={`Welcome`} fontSize={35}
                    fontWeight={"bold"} textAlign="left" flexStart
                    marginStart={20} marginTop={20} />
                <TextBold value={`Back!`} fontSize={37}
                    fontWeight={"bold"} textAlign="left" flexStart
                    marginStart={20} />
                <TextRegular value={'Please enter your Email ID which will be used to access Vibely.'}
                    flexStart textAlign="left"
                    marginStart={20} marginTop={10}
                    marginEnd={Dimensions.get('window').width / 3.5} />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', }}>
                <CustomTextInput label={"Email or Phone"} marginTop={50}
                    icon="account" />

                <View style={{ alignItems: 'center', marginBottom: 50 }}>

                    <Custombutton text="Continue" marginTop={20}
                        onPress={() => {
                            setLoading(true)
                        }} />
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
                        <GoogleButton />
                        <CodeloomButton onPress={() => {
                            props.navigation.navigate("Codeloom")
                        }} />
                    </View>
                    <Text style={{
                        fontFamily: 'Mulish-Regular',
                        paddingHorizontal: 50, textAlign: 'center',
                        color: themeState == 'dark' ? 'white' : 'black'
                    }}>
                        By tapping "Continue," I confirm that I agree to
                    </Text>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("PrivacyPolicy")
                    }}>
                        <Text style={{
                            fontFamily: 'Mulish-Regular',
                            paddingHorizontal: 50, textAlign: 'center',
                            color: DarkColours.primary
                        }}>
                            Terms & Privacy Policy
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader visible={loading} />
        </View>
    )
}