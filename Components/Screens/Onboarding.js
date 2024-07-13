import React, { useState, useEffect, useRef } from "react";
import { Appearance, View, Animated, Easing } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeButton from "../UIElements/Button";
import stylesheet from "../UIElements/StyleSheet";
import TextRegular from "../UIElements/TextRegular";
import TextBold from "../UIElements/TextBold";
import IllustrationDay from '../Assets/Day/illustration-day.svg';
import IllustrationNight from '../Assets/Night/illustration-night.svg';
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const Onboarding = (props) => {
  const [themeState, setThemeState] = useState(Appearance.getColorScheme());
  const illustrationRef = useRef(new Animated.Value(0));
  const titleRef = useRef(new Animated.Value(0));
  const buttonRef = useRef(new Animated.Value(0));

  useEffect(() => {
    // Animate illustration in with a smooth scale-in effect
    Animated.timing(illustrationRef.current, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    // Animate title in with a smooth fade-in effect
    Animated.timing(titleRef.current, {
      toValue: 1,
      duration: 600,
      delay: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    // Animate button in with a smooth slide-up and fade-in effect
    Animated.timing(buttonRef.current, {
      toValue: 1,
      duration: 500,
      delay: 600,
      easing: Easing.inOut(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  Appearance.addChangeListener(() => {
    setThemeState(Appearance.getColorScheme());
  });

  const onPress = () =>{
    props.navigation.navigate("Registration")
  }

  return (
    <SafeAreaView style={[stylesheet.container, { justifyContent: 'space-evenly' }]}>
      
      <Animated.View
        style={[
          { opacity: illustrationRef.current },
          { transform: [{ scale: illustrationRef.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }) }] }
        ]}
      >
        {themeState === 'dark' ? (
          <IllustrationNight />
        ) : (
          <IllustrationDay />
        )}
      </Animated.View>

      <Animated.View style={{ opacity: titleRef.current }}>
        <TextBold
          value={"Start virtual assistant chat and get problems solved in seconds"}
          paddingHorizontal={40}
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: buttonRef.current,
          transform: [
            { translateY: buttonRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }) },
          ],
        }}
      >
        <View>
          <TextRegular value={"Terms & Privacy Policy"} marginBottom={20} />
          <ThemeButton text="Start Messaging" onPress={onPress}/>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Onboarding;