import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesheet from "../../UIElements/StyleSheet";
import LottieView from "lottie-react-native";
import { Appearance, Dimensions, TouchableOpacity, View } from "react-native";
import TextRegular from "../../UIElements/TextRegular";
import Custombutton from "../../UIElements/Button";
import TextBold from "../../UIElements/TextBold";
import { Loader } from "../../UIElements/Loader";
import { auth } from "../../../Config/firebase.config";

export default Onboarding = (props) => {

  const [themeState, setThemeState] = useState(Appearance.getColorScheme())

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Appearance.addChangeListener(() => {
      setThemeState(Appearance.getColorScheme())
    })
  }, [])

  const HandleContinue = async () => {
    setLoading(true)
    if (auth.currentUser) {
      if (auth.currentUser.displayName) {
        props.navigation.replace("Home")
        setLoading(false)
      } else {
        props.navigation.replace("Registration")
        setLoading(false)
      }
    } else {
      props.navigation.navigate("Login")
      setLoading(false)
    }
  }



  return (
    <SafeAreaView style={[stylesheet.container, {
      justifyContent: 'space-evenly'
    }]}>
      <LottieView
        source={themeState === 'dark' ?
          require('../../Assets/Animations/3UKCXDl6I0.json')
          :
          require('../../Assets/Animations/onboardingAnim.json')
        } style={{
          width: Dimensions.get('window').width - 60,
          height: Dimensions.get('window').width - 60
        }}
        autoPlay
        loop
        renderMode="HARDWARE" />
      <TextBold value="
        Connect easily with your family and friends anywhere with Vibely"
        paddingHorizontal={50} />
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {
          props.navigation.navigate("PrivacyPolicy")
        }}>
          <TextRegular value="Terms & Privacy Policy" />
        </TouchableOpacity>
        <Custombutton text="Continue" marginTop={20}
          onPress={() => {
            HandleContinue()
          }} />
      </View>
      <Loader visible={loading} />
    </SafeAreaView>
  )
}