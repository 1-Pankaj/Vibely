import { Appearance, Dimensions, Image, ScrollView, View } from "react-native";
import stylesheet from "../../../../UIElements/StyleSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import Header from "../../../../UIElements/CommonElements/Header";
import TextRegular from "../../../../UIElements/TextRegular";
import TextBold from "../../../../UIElements/TextBold";
import DarkColours from "../../../../Themes/DarkColours";

const Chats = () => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    const RenderChatList = () => {
        return (
            <View style={{ marginTop: 20 }}>
                {
                    Array(15).fill(0).map((item, index) => {
                        return (
                            <View key={index} style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                width: Dimensions.get('window').width
                                , height: 85,
                                borderBottomWidth: 0.5,
                                borderBottomColor: 'gray', gap: 20
                            }}>
                                <Image source={{ uri: 'https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg' }}
                                    style={{ width: 60, height: 60, borderRadius: 30 }} />
                                <View style={{ gap: 10 }}>
                                    <TextRegular value={"User"} bold flexStart />
                                    <TextRegular value={"This is an example message."} flexStart />
                                </View>
                                <View style={{
                                    alignItems: 'flex-end',
                                    gap: 10
                                }}>
                                    <TextRegular value={"12:00"} flexEnd fontSize={12} />
                                    <View style={{
                                        width: 20, height: 20, borderRadius: 10,
                                        backgroundColor: DarkColours.primary, alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <TextRegular value={1} fontSize={12} inverted={themeState == 'dark' ? false : true} />
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        );
    }

    return (
        <SafeAreaView style={[stylesheet.container]}>
            <View style={{ width: Dimensions.get('window').width }}>
                <TextBold value={"Chats"} marginTop={50}
                    fontSize={30} flexStart marginStart={20} />
                <RenderChatList />
            </View>
        </SafeAreaView>
    );
}

export default Chats;
