import { Dimensions, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import stylesheet from "../../../../UIElements/StyleSheet"
import TextBold from "../../../../UIElements/TextBold"

const HomePage = () => {
    return (
        <SafeAreaView style={[stylesheet.container]}>

            <View style={{
                width: Dimensions.get('window').width
            }}>
                <TextBold value={"Home"} marginTop={50}
                    fontSize={30} flexStart marginStart={20} />
            </View>
        </SafeAreaView>
    )
}

export default HomePage