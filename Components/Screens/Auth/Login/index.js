import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
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
import { auth as AppAuth } from "../../../../Config/firebase.config";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { CustomSnackbar } from "../../../UIElements/Snackbar";
import { Stagger } from "@animatereactnative/stagger";
import { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { codeloomAuth } from "../../../../Config/codeloom.firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Login = (props) => {

    const [loading, setLoading] = useState(false)
    const [themeState, setThemeState] = useState(Appearance.getColorScheme())


    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

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
                    const signInMethods = await fetchSignInMethodsForEmail(AppAuth, email);

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
            const userCredential = await signInWithEmailAndPassword(AppAuth, email, password);
            if (userCredential) {
                ShowSnackbar("Sign In Successfull.", 'Okay')
                await AsyncStorage.setItem("auth", 'app')
                setTimeout(() => {
                    setLoading(false);
                    console.log("Sign in successful");
                }, 1500);
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
                    const userCredential = await createUserWithEmailAndPassword(AppAuth, email, newPassword);
                    if (userCredential) {
                        ShowSnackbar("Sign Up Successfull.", 'Okay')
                        await AsyncStorage.setItem("auth", 'app')
                        setTimeout(() => {
                            setLoading(false);
                            sendEmailVerification(userCredential.user)
                        }, 1500);
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
        AppAuth.onAuthStateChanged(
            async (user) => {
                setLoading(true);

                if (user) {
                    const { metadata } = AppAuth.currentUser || {};
                    if (metadata) {
                        if (metadata.creationTime === metadata.lastSignInTime) {
                            if (AppAuth.currentUser.displayName) {
                                console.log("Proceed to dashboard");
                                await AsyncStorage.setItem("auth", 'app')
                                setLoading(false);
                            } else {
                                setLoading(false)
                                await AsyncStorage.setItem("auth", 'codeloom')
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Registration' }],
                                });
                            }
                            console.log("New User");


                            setLoading(false);
                        } else {
                            console.log('User has signed in before.');
                            if (AppAuth.currentUser.displayName) {
                                await AsyncStorage.setItem("auth", 'app')
                                setLoading(false);
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }],
                                });
                            } else {
                                setLoading(false)
                                await AsyncStorage.setItem("auth", 'app')
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Registration' }],
                                });
                            }

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
        codeloomAuth.onAuthStateChanged(
            async (user) => {
                setLoading(true);

                if (user) {
                    const { metadata } = codeloomAuth.currentUser || {};
                    if (metadata) {
                        if (metadata.creationTime === metadata.lastSignInTime) {
                            if (codeloomAuth.currentUser.displayName) {
                                console.log("Proceed to dashboard");
                                await AsyncStorage.setItem("auth", 'codeloom')
                                setLoading(false);
                            } else {
                                setLoading(false)
                                await AsyncStorage.setItem("auth", 'codeloom')
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Registration' }],
                                });
                            }
                            console.log("New User");


                            setLoading(false);
                        } else {
                            console.log('User has signed in before.');
                            if (codeloomAuth.currentUser.displayName) {
                                await AsyncStorage.setItem("auth", 'codeloom')
                                setLoading(false);
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }],
                                });
                            } else {
                                setLoading(false)
                                await AsyncStorage.setItem("auth", 'codeloom')
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Registration' }],
                                });
                            }

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
            <View style={{width:'100%'}}>
                <View style={{
                    marginTop: 25, paddingVertical: 10,
                    marginStart: 20, width:'100%'
                }}>
                    <BackButton props={props} />
                </View>

            </View>
            <ScrollView style={{ flex: 1,  }}
            contentContainerStyle={{justifyContent: 'space-between',
            }}
            showsVerticalScrollIndicator={false}>
                <View>
                    <TextBold value={`Welcome`} fontSize={35}
                        fontWeight={"bold"} textAlign="left" flexStart
                        marginStart={20} marginTop={20} />
                    <View style={{ flexDirection: 'row' }}>
                        <TextBold value={`Back to `} fontSize={37}
                            fontWeight={"bold"} textAlign="left" flexStart
                            marginStart={20} />
                        <TextBold value={`Vibely!`} fontSize={37}
                            fontWeight={"bold"} textAlign="left" flexStart
                            primary />
                    </View>
                    <TextRegular value={'Please enter your Email ID which will be used to access Vibely.'}
                        flexStart textAlign="left"
                        marginStart={20} marginTop={10}
                        marginEnd={Dimensions.get('window').width / 3.5} />
                </View>
                <Stagger
                    stagger={50}
                    duration={1000}
                    exitDirection={-1}
                    entering={() => FadeInUp.springify()}
                    exiting={() => FadeOutDown.springify()}
                >
                    <CustomTextInput label={"Email or Phone"} marginTop={50}
                        icon="person" value={email} onChangeText={setEmail} onBlur={CheckUser}
                        error={emailError} />
                    {
                        passwordVisible ?
                            <CustomTextInput label={"Password"} marginTop={10}
                                error={passwordError} icon="lock" onChangeText={setPassword}
                                value={password} password />
                            :
                            null
                    }
                    {
                        createPassword ?
                            <View>
                                <CustomTextInput label={"Create Password"} marginTop={10}
                                    error={passwordError} icon="lock" onChangeText={setNewPassword}
                                    value={newPassword} password />
                                <CustomTextInput label={"Confirm Password"} marginTop={10}
                                    error={passwordError} icon="lock" onChangeText={setConfirmPassword}
                                    value={confirmPassword} password />
                            </View>
                            :
                            null
                    }
                </Stagger>

                <View style={{ alignItems: 'center', marginBottom: 50 }}>

                    <Custombutton text={passwordVisible?
                        'Sign In'
                        :
                        createPassword?
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
            </ScrollView>
            <CustomSnackbar visible={snackVisible} label={snackLabel} message={snackMessage} onDismissSnackBar={onDismissSnackBar} />
            <Loader visible={loading} />
        </View >
    )
}