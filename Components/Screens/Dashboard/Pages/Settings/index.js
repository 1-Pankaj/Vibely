import { Appearance, Dimensions, Image, TouchableOpacity, View } from "react-native"
import { Button, Divider, Text } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import useAuth from "../../../../Hooks/useAuth"
import { useEffect, useState } from "react"
import stylesheet from "../../../../UIElements/StyleSheet"
import TextBold from "../../../../UIElements/TextBold"
import Search from "../../../../UIElements/CommonElements/Search"
import TextRegular from "../../../../UIElements/TextRegular"
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { Loader } from "../../../../UIElements/Loader"

const Settings = ({ props }) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    const [loader, setLoader] = useState(false)


    const { currentAuth, loading } = useAuth()

    const [auth, setAuth] = useState(currentAuth)

    const [authState, setAuthState] = useState(currentAuth)

    useEffect(() => {
        if (!loading) {
            if (currentAuth) {
                setAuth(currentAuth.currentUser)
                setAuthState(currentAuth)
            }
        }
    }, [currentAuth, loading])

    return (
        <View style={[stylesheet.container]}>
            <View style={{
                width: Dimensions.get('window').width - 30,
                paddingVertical: 10, paddingHorizontal: 20,
                backgroundColor: themeState === 'dark' ?
                    '#414141' : '#f0f0f0', marginTop: 20,
                borderRadius: 10
            }}>
                <TouchableOpacity activeOpacity={0.4}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', marginTop: 5
                    }}>
                        <Image
                            source={auth ? auth.photoURL ? { uri: auth.photoURL } :
                                require('../../../../Assets/Images/user.png') :
                                require('../../../../Assets/Images/user.png')} style={{
                                    width: 60, height: 60, borderRadius: 30,
                                }} />
                        <View style={{ flex: 0.8 }}>
                            <TextBold value={auth ? auth.displayName : ""} fontSize={18} flexStart />
                            <TextRegular value={auth ? auth.email : ""} fontSize={12} light flexStart />
                        </View>
                        <TouchableOpacity style={{
                            width: 30, height: 30,
                            backgroundColor: themeState === 'light' ? 'lightgray' : 'gray',
                            borderRadius: 20, alignItems: 'center', justifyContent: 'center'
                        }} activeOpacity={0.4}>
                            <MaterialCommunityIcons name="qrcode-scan" size={15}
                                color={themeState === 'dark' ? 'white' : 'black'} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                <Divider style={{
                    width: Dimensions.get('window').width - 30, backgroundColor:
                        themeState === 'dark' ? 'gray' : 'lightgray'
                    , marginTop: 20,
                    alignSelf: 'center'
                }} />

                <TouchableOpacity activeOpacity={0.4}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 10, marginBottom: 5
                    }}>
                        <TextRegular value={"Profile Verification"} />
                        <MaterialIcons name="arrow-forward-ios" size={18} color={"gray"} />
                    </View>
                </TouchableOpacity>
            </View>


            <View style={{
                width: Dimensions.get('window').width - 30,
                paddingVertical: 10, paddingHorizontal: 20,
                backgroundColor: themeState === 'dark' ?
                    '#414141' : '#f0f0f0', marginTop: 30,
                borderRadius: 10
            }}>




                <TouchableOpacity activeOpacity={0.4}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 5, marginBottom: 5
                    }}>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <Ionicons name="key-outline" size={20} color={themeState === 'dark' ? 'white' : 'black'} />
                            <TextRegular value={"Account"} />
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={18} color={"gray"} />
                    </View>
                </TouchableOpacity>

                <Divider style={{
                    width: Dimensions.get('window').width - 30, backgroundColor:
                        themeState === 'dark' ? 'gray' : 'lightgray'
                    , marginTop: 10, marginBottom: 10,
                    alignSelf: 'center'
                }} />

                <TouchableOpacity activeOpacity={0.4}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 5, marginBottom: 5
                    }}>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <Ionicons name="lock-closed-outline" size={20} color={themeState === 'dark' ? 'white' : 'black'} />
                            <TextRegular value={"Privacy"} />
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={18} color={"gray"} />
                    </View>
                </TouchableOpacity>


                <Divider style={{
                    width: Dimensions.get('window').width - 30, backgroundColor:
                        themeState === 'dark' ? 'gray' : 'lightgray'
                    , marginTop: 10, marginBottom: 10,
                    alignSelf: 'center'
                }} />

                <TouchableOpacity activeOpacity={0.4}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 5, marginBottom: 5
                    }}>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <Ionicons name="chatbubbles-outline" size={20} color={themeState === 'dark' ? 'white' : 'black'} />
                            <TextRegular value={"Chats"} />
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={18} color={"gray"} />
                    </View>
                </TouchableOpacity>


                <Divider style={{
                    width: Dimensions.get('window').width - 30, backgroundColor:
                        themeState === 'dark' ? 'gray' : 'lightgray'
                    , marginTop: 10, marginBottom: 10,
                    alignSelf: 'center'
                }} />

                <TouchableOpacity activeOpacity={0.4}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 5, marginBottom: 5
                    }}>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <Ionicons name="notifications-outline" size={20} color={themeState === 'dark' ? 'white' : 'black'} />
                            <TextRegular value={"Notifications"} />
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={18} color={"gray"} />
                    </View>
                </TouchableOpacity>
            </View>



            <View style={{
                width: Dimensions.get('window').width - 30,
                paddingVertical: 10, paddingHorizontal: 20,
                backgroundColor: themeState === 'dark' ?
                    '#414141' : '#f0f0f0', marginTop: 20,
                borderRadius: 10
            }}>

                <TouchableOpacity activeOpacity={0.4} onPress={async () => {
                    setLoader(true)
                    await authState.signOut()
                    setLoader(false)
                    props.navigation.reset(
                        {
                            index: 0,
                            routes: [{ name: 'LoadingScreen' }]
                        })
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 5, marginBottom: 5
                    }}>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <AntDesign name="logout" size={20} color={'red'} />
                            <TextRegular value={"Log Out"} red />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            <Loader  visible={loader} />
        </View>
    )
}

export default Settings