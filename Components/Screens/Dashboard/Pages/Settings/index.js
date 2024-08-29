import { View } from "react-native"
import { Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import useAuth from "../../../../Hooks/useAuth"
import { useEffect } from "react"


const Settings = ({props}) => {

    const auth = useAuth()

    useEffect(()=>{
        if(!auth)
            return null
    },[auth])

    return (
        <SafeAreaView>
            <Button style={{}}
            onPress={()=>{
                auth.currentAuth.signOut()
                props.navigation.replace("LoadingScreen")
            }}>Log out</Button>
        </SafeAreaView>
    )
}

export default Settings