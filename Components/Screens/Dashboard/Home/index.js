import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesheet from "../../../UIElements/StyleSheet";
import useAuth from "../../../Hooks/useAuth";
import { Loader } from "../../../UIElements/Loader";

const Home = (props) => {
    const auth = useAuth().currentAuth
    console.log(auth?.currentUser.displayName);


    return (
        <SafeAreaView style={[stylesheet.container]}>
            
        </SafeAreaView>
    )
}

export default Home