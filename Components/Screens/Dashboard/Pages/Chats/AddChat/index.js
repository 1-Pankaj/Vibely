import { Animated, Appearance, Dimensions, TextInput, TouchableOpacity, View } from "react-native"
import { BackButton } from "../../../../../UIElements/Back"
import stylesheet from "../../../../../UIElements/StyleSheet"
import { ExpandableSection } from "react-native-ui-lib"
import { useEffect, useRef, useState } from "react"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import TextRegular from "../../../../../UIElements/TextRegular"
import { Text } from "react-native-paper"
import TouchableScale from "@jonny/touchable-scale"
import DarkColours from "../../../../../Themes/DarkColours"
import LightColours from "../../../../../Themes/LightColours"
import { LottieView } from 'lottie-react-native'

import * as Contacts from 'expo-contacts'
import { chatImageColours } from "../ChatImageColours/imageColours"
import TextBold from "../../../../../UIElements/TextBold"

export default AddChat = (props) => {

    const [expanded, setExpanded] = useState(true)
    const [themeState, setThemeState] = useState(Appearance.getColorScheme())
    const [searchText, setSearchText] = useState("")
    const [permissionStatus, setPermissionStatus] = useState(false)

    const [contact, setContact] = useState(null)

    const animatedWidth = useState(new Animated.Value(Dimensions.get('window').width - 30))[0]

    const searchRef = useRef(null)




    const RequestContactAccess = async () => {
        try {
            setPermissionStatus(true)
            const { status } = await Contacts.requestPermissionsAsync();

            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                });
                setContact(data)
            } else {
                setPermissionStatus(false)
            }
        }
        catch (err) {
            console.log("Error");

        }

    }

    useEffect(() => {
        RequestContactAccess()
    }, []);

    const animateSearchBar = () => {
        Animated.timing(animatedWidth, {
            toValue: searchText ?
                Dimensions.get('window').width - 80
                :
                Dimensions.get('window').width - 30,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    const [focused, setFocused] = useState(true)

    useEffect(() => {
        animateSearchBar()
    }, [searchText])

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        }, [])
    }, [])

    return (
        <View style={[stylesheet.container]}>
            <View style={{ width: '100%' }}>
                <View style={{
                    marginTop: 25, paddingVertical: 10,
                    marginStart: 20, width: '100%'
                }}>
                    <BackButton props={props} />
                </View>
                {/* Dimensions.get('window').width - 30 */}
                <Animated.View style={{
                    width: Dimensions.get('window').width - 30,
                    alignSelf: 'center',
                }}>
                    <ExpandableSection expanded={expanded} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Animated.View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between', padding: 10, backgroundColor:
                                    themeState === 'dark' ? '#212121' : '#f0f0f0',
                                width: animatedWidth, height: 40,
                                borderRadius: 8, paddingHorizontal: 20, gap: 12,
                                alignItems: 'center', alignSelf: 'center',
                                marginVertical: 10
                            }}>
                                <Ionicons name="search-outline" size={22}
                                    color={themeState === 'dark' ?
                                        'white' : 'black'
                                    } />
                                <TextInput placeholder="Search" style={{
                                    flex: 1, fontSize: 16, fontFamily: 'Mulish-Regular',
                                    color: themeState === 'dark' ? 'white' : 'black'
                                }} placeholderTextColor={'gray'} onFocus={() => {
                                    setFocused(true)
                                }} onBlur={() => {
                                    setFocused(false)
                                }} autoFocus ref={searchRef} onChangeText={(tx) => {
                                    setSearchText(tx)
                                }}
                                    value={searchText} />
                            </Animated.View>
                            <TouchableOpacity onPress={() => {
                                searchRef.current.blur()
                                setSearchText("")
                            }} style={{
                                marginStart: 20,
                                width: 30, height: 30, backgroundColor: themeState === 'dark' ? '#212121' : '#f0f0f0',
                                borderRadius: 50, justifyContent: 'center', alignItems: 'center',
                            }} activeOpacity={0.6

                            }>
                                <MaterialIcons name="close" size={18}
                                    color={themeState === 'dark' ?
                                        'white' : 'black'
                                    } />
                            </TouchableOpacity>
                        </View>
                    </ExpandableSection>
                </Animated.View>
                <View style={{
                    width: '92%',
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between', alignSelf: 'center'
                }}>
                    <TouchableScale style={{ width: '46%' }}>
                        <View style={{
                            marginTop: 20, width: '100%', height: 55,
                            backgroundColor: themeState === 'dark' ? '#212121' : '#f0f0f0',
                            borderRadius: 10, flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <View style={{
                                width: 40, height: 40, backgroundColor:
                                    themeState === 'dark' ? '#414141' : 'lightgray',
                                alignItems: 'center', justifyContent: 'center',
                                borderRadius: 20
                            }}>
                                <MaterialIcons name="person-add" size={22}
                                    color={themeState === 'dark' ? 'white' : 'black'} />
                            </View>
                            <TextRegular value={"New Contact"} fontSize={16}
                                marginStart={10} />
                        </View>
                    </TouchableScale>
                    <TouchableScale style={{ width: '46%' }}>
                        <View style={{
                            marginTop: 20, width: '100%', height: 55,
                            backgroundColor: themeState === 'dark' ? '#212121' : '#f0f0f0',
                            borderRadius: 10, flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <View style={{
                                width: 40, height: 40, backgroundColor:
                                    themeState === 'dark' ? '#414141' : 'lightgray',
                                alignItems: 'center', justifyContent: 'center',
                                borderRadius: 20
                            }}>
                                <MaterialIcons name="group-add" size={22}
                                    color={themeState === 'dark' ? 'white' : 'black'} />
                            </View>
                            <TextRegular value={"New Group"} fontSize={16}
                                marginStart={10} />
                        </View>
                    </TouchableScale>
                </View>

                <View style={{
                    width: '92%', alignItems: 'center', marginTop: 20,
                    alignSelf: 'center'
                }}>
                    {
                        permissionStatus ?
                            <View style={{ width: '100%' }}>
                                {
                                    contact?.map((item, index) => {
                                        return (
                                            <View style={{
                                                marginTop: 10,
                                                backgroundColor: themeState === 'dark' ? '#212121' : '#f0f0f0',
                                                width: '100%', height: 60,
                                                borderRadius: 10,
                                                alignSelf: 'center',
                                                flexDirection: 'row', alignItems: 'center',
                                                justifyContent: 'space-between', paddingHorizontal: 30
                                            }} key={index}>
                                                <View style={{
                                                    width: 40, height: 40,
                                                    borderRadius: 20, alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: themeState === 'dark' ?
                                                        chatImageColours.colors.dark[item.name.substring(0, 1)]
                                                        :
                                                        chatImageColours.colors.light[item.name.substring(0, 1)]
                                                }}>
                                                    <TextBold value={item.name.substring(0, 1)}
                                                        inverted />
                                                </View>
                                                <View style={{
                                                    flex: 0.9, alignItems: 'flex-start',
                                                    justifyContent: 'flex-start', flexDirection: 'row'
                                                }}>
                                                    <TextBold value={item.name} fontSize={18} />
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            <View style={{ width: '100%' }}>
                                
                            </View>
                    }
                </View>
            </View>
        </View>
    )
}