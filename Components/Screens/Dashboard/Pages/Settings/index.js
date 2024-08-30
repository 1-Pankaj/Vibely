import { Dimensions, View } from "react-native"
import { Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import useAuth from "../../../../Hooks/useAuth"
import { useEffect } from "react"
import stylesheet from "../../../../UIElements/StyleSheet"
import TextBold from "../../../../UIElements/TextBold"


const Settings = ({ props }) => {

    const auth = useAuth()

    useEffect(() => {
        if (!auth)
            return null
    }, [auth])

    return (
        <SafeAreaView style={[stylesheet.container]}>

            <View style={{
                width: Dimensions.get('window').width
            }}>
                <TextBold value={"Settings"} marginTop={50}
                    fontSize={30} flexStart marginStart={20} />
            </View>
            <Button style={{}}
                onPress={() => {
                    auth.currentAuth.signOut()
                    props.navigation.reset(
                        {
                            index: 0,
                            routes: [{ name: 'LoadingScreen' }]
                        }
                    )
                }}>Log out</Button>
        </SafeAreaView>
    )
}

export default Settings