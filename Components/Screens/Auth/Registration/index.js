import react, { useEffect, useState } from "react";
import { Appearance, Dimensions, Image, View } from "react-native";
import stylesheet from "../../../UIElements/StyleSheet";
import { BackButton } from "../../../UIElements/Back";
import TextBold from "../../../UIElements/TextBold";
import TextRegular from "../../../UIElements/TextRegular";
import { auth, storage } from "../../../../Config/firebase.config";

import ChangeAvatarDay from '../../../Assets/Icons/changeavatarday.svg'
import ChangeAvatarNight from '../../../Assets/Icons/changeavatarnight.svg'

import { CustomTextInput } from "../../../UIElements/TextInput";
import Custombutton from "../../../UIElements/Button";
import TouchableScale from "@jonny/touchable-scale";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Card } from "react-native-paper";
import { launchImageLibraryAsync } from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { Loader } from "../../../UIElements/Loader";
import { CustomSnackbar } from "../../../UIElements/Snackbar";

const Registration = (props) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    const [image, setImage] = useState(null)

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false)

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    })

    const [snackVisible, setSnackVisible] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [snackLabel, setSnackLabel] = useState("")

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

    const storageRef = ref(storage, auth.currentUser.uid)

    const UploadImage = async () => {
        setLoading(true);

        try {
            const rs = await launchImageLibraryAsync({
                allowsEditing: true,
                allowsMultipleSelection: false,
                quality: 0.7,
            });

            if (!rs.canceled) {
                const response = await fetch(rs.assets[0].uri);
                const blob = await response.blob();

                const snapshot = await uploadBytes(storageRef, blob);

                const downloadURL = await getDownloadURL(snapshot.ref);
                setImage(downloadURL);
            }
        } catch (err) {
            ShowSnackbar("Failed to upload profile, try again.", "Okay")
        } finally {
            setLoading(false);
        }
    };

    const [loadingFull, setLoadingFull] = useState(false)

    const UpdateUser = async () => {
        if (name === "") {
            setNameError(true);
        } else {
            setLoadingFull(true);
            try {
                const user = auth.currentUser;

                if (user) {
                    await updateProfile(user, {
                        displayName: name,
                        photoURL: image
                    });
                    ShowSnackbar("Profile updated Successfully.", "Okay")
                    setTimeout(() => {
                        props.navigation.replace("Home")
                        setLoadingFull(false);
                    }, 1500);
                } else {
                    ShowSnackbar("User not authenticated.", "Okay")
                    setLoadingFull(false);
                }
            } catch (err) {
                ShowSnackbar('Error updating profile:', err.message)
                setLoadingFull(false);
            }
        }
    };

    return (
        <SafeAreaView style={[stylesheet.container, {
            justifyContent: 'space-around'
        }]}>
            <View style={{ width: '100%' }}>

                <TextBold value={`Complete Your`} fontSize={35}
                    fontWeight={"bold"} textAlign="left" flexStart
                    marginStart={20} />
                <TextBold value={`Profile`} fontSize={37}
                    fontWeight={"bold"} textAlign="left" flexStart
                    marginStart={20} />
                <TextRegular value={'Please enter your name and upload a profile photo to finalize your Vibely account.'}
                    flexStart textAlign="left"
                    marginStart={20} marginTop={10}
                    marginEnd={Dimensions.get('window').width / 5} />
                <View style={{ width: '100%', alignItems: 'center', }}>

                    {loading ?
                        <Card style={{
                            width: 100, height: 101, borderRadius: 55,
                            backgroundColor: themeState === 'dark' ? '#272727' : '#f7f7fc',
                            marginTop: 50, alignItems: 'center', justifyContent: 'center',
                            elevation: 0
                        }} elevation={0}>
                            <ActivityIndicator size={35} color={
                                themeState === 'dark' ? 'white' : 'black'
                            } />
                        </Card>
                        :
                        <TouchableScale style={{ marginTop: 50 }} onPress={() => {
                            UploadImage()
                        }}>
                            {image ?
                                <Card style={{
                                    width: 100, height: 101, borderRadius: 55,
                                    backgroundColor: themeState === 'dark' ? '#272727' : '#f7f7fc',
                                    alignItems: 'center', justifyContent: 'center',
                                    elevation: 0
                                }} elevation={0}>
                                    <Image source={{ uri: image }}
                                        style={{
                                            width: 100, height: 101,
                                            borderRadius: 55,
                                        }} />
                                </Card>
                                :
                                themeState === 'dark' ?
                                    <ChangeAvatarNight />
                                    :
                                    <ChangeAvatarDay />
                            }
                        </TouchableScale>}
                    <CustomTextInput label="Full Name" marginTop={25}
                        error={nameError} value={name} onChangeText={setName} icon="account" />
                </View>
            </View>

            <CustomSnackbar label={snackLabel} message={snackMessage}
                visible={snackVisible} onDismissSnackBar={onDismissSnackBar} />

            <Custombutton text="Continue" onPress={() => {
                UpdateUser()
            }} />
            <Loader visible={loadingFull} />
        </SafeAreaView>
    )
}

export default Registration