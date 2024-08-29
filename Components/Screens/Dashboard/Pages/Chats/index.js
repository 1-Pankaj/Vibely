import { Dimensions, ScrollView, View } from "react-native";
import stylesheet from "../../../../UIElements/StyleSheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { useRef } from "react";
import Header from "../../../../UIElements/CommonElements/Header";

const Chats = () => {

    

    const RenderDummyData = () => {
        return (
            <View style={{marginTop:50}}>
                {
                    Array(10).fill(0).map((item, index) => {
                        return (
                            <View key={index} style={{
                                width: Dimensions.get('window').width - 30,
                                height: 100, marginVertical: 20,
                                backgroundColor: 'gray',
                                alignItems: 'center', justifyContent: 'center',
                                borderRadius: 20
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontSize: 24
                                }}>
                                    Dummy Data
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        );
    }

    return (
        <SafeAreaView style={[stylesheet.container]}>
            <RenderDummyData />
        </SafeAreaView>
    );
}

export default Chats;
