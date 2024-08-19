// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, Appearance } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, useTheme } from 'react-native-paper';
import Onboarding from './Components/Screens/Onboarding';
import merge from 'deepmerge'
import DarkColours from './Components/Themes/DarkColours';
import LightColours from './Components/Themes/LightColours';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import PrivacyPolicy from './Components/Screens/PrivacyAndTerms';
import Login from './Components/Screens/Auth/Login';
import Codeloom from './Components/Screens/Codeloom';
import Registration from './Components/Screens/Auth/Registration';

const Stack = createStackNavigator();

function App() {

  const [themeState, setThemeState] = useState(Appearance.getColorScheme())

  const [loaded, error] = useFonts({
    'Mulish-Variable': require('./Components/Assets/Fonts/Mulish-Variable.ttf'),
    'Mulish-Regular': require('./Components/Assets/Fonts/Mulish-Regular.ttf'),
    'Mulish-Bold': require('./Components/Assets/Fonts/Mulish-Bold.ttf'),
    'Mulish-SemiBold': require('./Components/Assets/Fonts/Mulish-SemiBold.ttf'),
    'Mulish-Medium': require('./Components/Assets/Fonts/Mulish-Medium.ttf'),
  });


  Appearance.addChangeListener(() => {
    setThemeState(Appearance.getColorScheme())
  })

  const lightThemePaper = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme,
      primary: LightColours.primary,
      secondary: LightColours.primary,
      background: LightColours.background
    }
  }

  const darkThemePaper = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme,
      primary: DarkColours.primary,
      secondary: DarkColours.primary,
      background: DarkColours.background
    }
  }
  const lightThemeStack = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme,
      primary: LightColours.primary,
      notification: LightColours.primary,
      secondary: LightColours.primary,
      background: LightColours.background,
      text: "#0F1828"
    }
  }

  const darkThemeStack = {
    ...DarkTheme,
    colors: {
      ...DarkTheme,
      primary: DarkColours.primary,
      notification: DarkColours.primary,
      secondary: DarkColours.primary,
      background: DarkColours.background,
      text: "#F7F7FC"
    }
  }

  const mergedLightTheme = merge(lightThemePaper, lightThemeStack)
  const mergedDarkTheme = merge(darkThemePaper, darkThemeStack)


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <PaperProvider theme={themeState == 'light' ? mergedLightTheme : mergedDarkTheme}>
      <ExpoStatusBar translucent />
      <NavigationContainer theme={themeState == 'light' ? mergedLightTheme : mergedDarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ animation: 'slide_from_bottom', }} />
          <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} options={{
            animationEnabled: true, animation: 'slide_from_bottom',
            gestureEnabled: true,
            presentation: 'modal',
            ...(TransitionPresets.ModalPresentationIOS)
          }} />
          <Stack.Screen name='Login' component={Login} options={{
            animationEnabled: true, animation: 'slide_from_bottom',
            gestureEnabled: true,
            presentation: 'modal',
            ...(TransitionPresets.ModalPresentationIOS)
          }} />
          <Stack.Screen name='Registration' component={Registration}  />
          <Stack.Screen name='Codeloom' component={Codeloom} options={{
            animationEnabled: true, animation: 'slide_from_bottom',
            gestureEnabled: true,
            presentation: 'modal',
            ...(TransitionPresets.ModalPresentationIOS)
          }} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;