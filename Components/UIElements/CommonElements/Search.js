import { Ionicons } from "@expo/vector-icons"
import { Dimensions, TextInput, View } from "react-native"
import { ExpandableSection } from 'react-native-ui-lib'
import TextBold from "../TextBold"

export default SearchCommon = ({ visible, page }) => {



    return (
        <View style={{ width: Dimensions.get('window').width }}>
            <TextBold value={page} marginTop={50}
                fontSize={30} flexStart marginStart={20} />
            <ExpandableSection expanded={visible} >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', padding: 10, backgroundColor: '#f0f0f0',
                    width: Dimensions.get('window').width - 30, height: 40,
                    borderRadius: 8, paddingHorizontal: 20, gap: 12,
                    alignItems: 'center', alignSelf: 'center',
                    marginVertical: 7
                }}>
                    <Ionicons name="search-outline" size={22} />
                    <TextInput placeholder="Search" style={{
                        flex: 1, fontSize: 16, fontFamily:'Mulish-Regular'
                    }} />
                </View>
            </ExpandableSection>
        </View>
    )
}