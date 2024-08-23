// https://www.freeprivacypolicy.com/live/c0cff6dc-87e5-4cb5-98a8-6233e2ffcb23

import React from "react";
import { TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";

import { MaterialIcons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { BackButton } from "../../UIElements/Back";

const PrivacyAndTerms = (props) => {
    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <View style={{
                width: '100%', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white',
                paddingVertical: 10, marginTop: 25
                , marginStart: 20
            }}>
                <BackButton props={props} />
            </View>
            <Divider style={{ backgroundColor: '#eee' }} />
            <WebView
                useWebView2
                forceDarkOn
                style={{ width: '100%', height: '100%' }}
                source={{ uri: 'https://www.freeprivacypolicy.com/live/c0cff6dc-87e5-4cb5-98a8-6233e2ffcb23' }} />
        </View>
    )
}

export default PrivacyAndTerms