import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Appearance, Dimensions, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
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
import { Loader } from "../../UIElements/Loader";

import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { codeloomAuth, codeloomDatabase } from "../../../Config/codeloom.firebase.config";
import { CustomSnackbar } from "../../UIElements/Snackbar";
import { Stagger } from "@animatereactnative/stagger";
import { FadeInUp, FadeOutDown } from "react-native-reanimated";
import TouchableScale from "@jonny/touchable-scale";
import { auth, database } from "../../../Config/firebase.config";
import { ref, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Codeloom = (props) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [createPassword, setCreatePassword] = useState(false)
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [snackVisible, setSnackVisible] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [snackLabel, setSnackLabel] = useState("")

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    const CheckUser = async () => {
        setLoading(true);
        setEmailError(false)
        try {
            if (email) {
                const isEmail = email.includes('@');

                if (isEmail) {
                    const signInMethods = await fetchSignInMethodsForEmail(codeloomAuth, email);
                    console.log(signInMethods, email);

                    if (signInMethods.length > 0) {
                        setPasswordVisible(true)
                        setCreatePassword(false)
                        setLoading(false)

                    } else {
                        setPasswordVisible(false)
                        setPassword("")
                        setCreatePassword(true)
                        setLoading(false)
                    }
                } else {
                    ShowSnackbar("Invalid email address", "Okay");
                    setEmailError(true)
                    setLoading(false);
                }
            } else {
                setLoading(false)
            }

        } catch (err) {
            setLoading(false);
            ShowSnackbar('An error occurred:' + err.message, "Okay")
        }
    };

    const SignInUser = async () => {
        setLoading(true);
        setPasswordError(false)
        try {
            const userCredential = await signInWithEmailAndPassword(codeloomAuth, email, password);
            if (userCredential) {
                ShowSnackbar("Sign In Successfull.", 'Okay')
                await AsyncStorage.setItem('auth', 'codeloom')
                setLoading(false);
            } else {
                setLoading(false);
                ShowSnackbar('Error signing in, Please try again.', "Okay");
            }
        }
        catch (err) {
            setLoading(false);
            if (err.code == 'auth/wrong-password') {
                setPasswordError(true)
                ShowSnackbar('Wrong password, try again.', "Okay")
            }
            if (err.code == 'auth/too-many-requests') {
                ShowSnackbar('Too many attempts, try again later.', "Okay")
            }
        }
    }

    const CreateUser = async () => {
        setLoading(true);
        setPasswordError(false)
        if (newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(codeloomAuth, email, newPassword);
                    if (userCredential) {
                        ShowSnackbar("Sign Up Successfull.", 'Okay')
                        set(ref(database, 'users/' + userCredential.user.uid), {
                            email: email,
                            uid: userCredential.user.uid
                        }).then(async () => {
                            await AsyncStorage.setItem('auth', 'codeloom')
                            setLoading(false);
                            sendEmailVerification(userCredential.user)
                        }).catch((err) => {
                            setLoading(false);
                            ShowSnackbar("Error : " + err.message, "Okay")
                        });




                    } else {
                        setLoading(false)
                        ShowSnackbar("Error  creating user", "Okay")
                    }
                }
                catch (err) {
                    setLoading(false);
                    ShowSnackbar('An error occurred:' + err.message, "Okay")
                }
            } else {
                setLoading(false)
                setPasswordError(true)
                ShowSnackbar('Passwords do not match', "Okay")
            }
        } else {
            ShowSnackbar("Please fill all the fields.", "Okay")
            setLoading(false)
        }
    }

    const ShowSnackbar = (message, label) => {
        setSnackVisible(true);
        setSnackMessage(message)
        setSnackLabel(label)
        setTimeout(() => {
            setSnackVisible(false);
        }, 3000);
    }

    const onDismissSnackBar = () => {
        setSnackVisible(false)
        setSnackMessage("")
        setSnackLabel("")
    }



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
                    width: '90%', justifyContent: 'space-between',
                    alignSelf: 'center',
                    paddingVertical: 25,
                    marginTop: 25,
                }}>
                    <View style={{
                    }}>
                        <BackButton props={props} flexStart white />
                    </View>
                    <TouchableScale>
                        <CodeloomIcon />
                    </TouchableScale>
                </View>


                <ScrollView style={{ height: '100%' }}
                    contentContainerStyle={{
                        justifyContent: 'center',
                    }}
                    showsVerticalScrollIndicator={false}>
                    <View>
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
                    </View>
                    <Stagger
                        stagger={50}
                        duration={1000}
                        exitDirection={-1}
                        entering={() => FadeInUp.springify()}
                        exiting={() => FadeOutDown.springify()}>
                        <CustomTextInput label={"Email or Phone"} marginTop={50}
                            icon="person" dark value={email} onChangeText={setEmail}
                            onBlur={CheckUser} error={emailError} />
                        {passwordVisible ?
                            <CustomTextInput label={"Password"} marginTop={10}
                                icon="lock" dark value={password} onChangeText={setPassword}
                                password error={passwordError} />
                            :
                            null
                        }
                        {
                            createPassword ?
                                <View>
                                    <CustomTextInput label={"Create Password"} marginTop={10}
                                        icon="lock" dark value={newPassword} onChangeText={setNewPassword}
                                        password error={passwordError} />
                                    <CustomTextInput label={"Confirm Password"} marginTop={10}
                                        icon="lock" dark value={confirmPassword} onChangeText={setConfirmPassword}
                                        password error={passwordError} />
                                </View>
                                :
                                null
                        }

                    </Stagger>


                    <View style={{ alignItems: 'center', marginBottom: 50, marginTop: createPassword ? 0 : 50 }}>
                        <Stagger
                            stagger={50}
                            duration={2000}
                            exitDirection={-1}
                            entering={() => FadeInUp.springify()}
                            exiting={() => FadeOutDown.springify()}
                            style={{
                                width: '100%', alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Custombutton text={passwordVisible ?
                                'Sign In'
                                :
                                createPassword ?
                                    'Create Account'
                                    :
                                    "Continue"
                            } marginTop={20}
                                onPress={() => {
                                    if (!passwordVisible && !createPassword) {
                                        CheckUser()
                                    } else if (passwordVisible) {
                                        SignInUser()
                                    } else if (createPassword) {
                                        CreateUser()
                                    }
                                }} codeloom />
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                marginTop: 10, marginBottom: 10
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
                            <GoogleButton full />
                            <Text style={{
                                fontFamily: 'Mulish-Regular',
                                paddingHorizontal: 20, textAlign: 'center',
                                color: 'white', marginTop: 20
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
                        </Stagger>


                    </View>
                </ScrollView>
            </ImageBackground>
            <CustomSnackbar visible={snackVisible} message={snackMessage}
                onDismissSnackBar={onDismissSnackBar} label={snackLabel} />
            <Loader visible={loading} white />
        </View>
    )
}

export default Codeloom