import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesheet from "../../../UIElements/StyleSheet";
import useAuth from "../../../Hooks/useAuth";

const Home = (props) => {
    const auth = useAuth()
console.log(auth.currentAuth.currentUser.displayName );

    return (
        <SafeAreaView style={[stylesheet.container]}>

        </SafeAreaView>
    )
}

export default Home