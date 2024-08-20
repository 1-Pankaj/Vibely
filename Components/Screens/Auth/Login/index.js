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
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import { CustomSnackbar } from "../../../UIElements/Snackbar";
import { Stagger } from "@animatereactnative/stagger";
import { FadeInUp, FadeOutDown } from "react-native-reanimated";

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

        try {
            if (email) {
                const isEmail = email.includes('@');

                if (isEmail) {
                    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                ShowSnackbar("Sign In Successfull.", 'Okay')
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
                    const userCredential = await createUserWithEmailAndPassword(auth, email, newPassword);
                    if (userCredential) {
                        ShowSnackbar("Sign Up Successfull.", 'Okay')
                        setTimeout(() => {
                            setLoading(false);
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Registration' }],
                            });
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
        auth.onAuthStateChanged(
            (user) => {
                setLoading(true);

                if (user) {
                    const { metadata } = auth.currentUser || {};
                    if (metadata) {
                        if (metadata.creationTime === metadata.lastSignInTime) {
                            if (auth.currentUser.displayName) {
                                console.log("Proceed to dashboard");
                                setLoading(false);
                            } else {
                                setLoading(false)
                                props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Registration' }],
                                });
                            }
                            console.log("New User");


                            setLoading(false);
                        } else {
                            console.log('User has signed in before.');
                            if (auth.currentUser.displayName) {
                                console.log("Proceed to dashboard");
                                setLoading(false);
                            } else {
                                setLoading(false)
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
                <Stagger
                    stagger={50}
                    duration={1000}
                    exitDirection={-1}
                    entering={() => FadeInUp.springify()}
                    exiting={() => FadeOutDown.springify()}
                >
                    <CustomTextInput label={"Email or Phone"} marginTop={50}
                        icon="account" value={email} onChangeText={setEmail} onBlur={CheckUser} />
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

                    <Custombutton text="Continue" marginTop={20}
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
            <CustomSnackbar visible={snackVisible} label={snackLabel} message={snackMessage} onDismissSnackBar={onDismissSnackBar} />
            <Loader visible={loading} />
        </View >
    )
}