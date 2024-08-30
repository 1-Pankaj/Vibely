import { Dimensions, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import stylesheet from "../../../../UIElements/StyleSheet"
import TextBold from "../../../../UIElements/TextBold"

const Search = () => {
    return (
        <SafeAreaView style={[stylesheet.container]}>

            <View style={{
                width: Dimensions.get('window').width
            }}>
                <TextBold value={"Search"} marginTop={50}
                    fontSize={30} flexStart marginStart={20} />
            </View>
        </SafeAreaView>
    )
}

export default Search