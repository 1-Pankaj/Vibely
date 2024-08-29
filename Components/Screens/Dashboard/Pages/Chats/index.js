import { Dimensions, Image, ScrollView, View } from "react-native";
import stylesheet from "../../../../UIElements/StyleSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { useRef } from "react";
import Header from "../../../../UIElements/CommonElements/Header";
import TextRegular from "../../../../UIElements/TextRegular";
import TextBold from "../../../../UIElements/TextBold";
import DarkColours from "../../../../Themes/DarkColours";

const Chats = () => {



    const RenderChatList = () => {
        return (
            <View style={{ marginTop: 50 }}>
                {
                    Array(15).fill(0).map((item, index) => {
                        return (
                            <View key={index} style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
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
                                <View style={{alignItems:'flex-end',
                                    gap:10
                                }}>
                                    <TextRegular value={"12:00"} flexEnd fontSize={12} />
                                    <View style={{width:20, height:20, borderRadius:10,
                                        backgroundColor:DarkColours.primary, alignItems:'center',
                                        justifyContent:'center'
                                    }}>
                                        <TextRegular value={1} fontSize={12} />
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
            <TextBold value={"Chats"} marginTop={50}
                fontSize={30} flexStart marginStart={20} />
            <RenderChatList />
        </SafeAreaView>
    );
}

export default Chats;
