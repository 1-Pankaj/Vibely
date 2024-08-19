import { useEffect, useState } from "react";
import { Appearance, Dimensions } from "react-native";
import { MD3DarkTheme, MD3LightTheme, TextInput } from "react-native-paper";
import LightColours from "../Themes/LightColours";
import DarkColours from "../Themes/DarkColours";

export const CustomTextInput = ({
  label,
  onChangeText,
  value,
  marginTop,
  marginBottom,
  marginEnd,
  marginStart,
  flexStart,
  icon,
  dark,
  onBlur,
  password,
  error
}) => {
  const [themeState, setThemeState] = useState(dark ? 'dark' : Appearance.getColorScheme());

  const [passwordEntry, setPasswordEntry] = useState(password)

  useEffect(() => {
    if (!dark) {
      const listener = () => {
        setThemeState(Appearance.getColorScheme());
      };
      Appearance.addChangeListener(listener);
    } else {
      Appearance.addChangeListener(() => {
        setThemeState('dark')
      })
    }

  }, []);

  return (
    <TextInput
      label={label}
      error={error}
      onBlur={onBlur}
      onChangeText={onChangeText}
      style={{
        width: Dimensions.get('window').width - 65,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginStart: marginStart,
        marginEnd: marginEnd,
        backgroundColor: themeState === 'light' ?
          LightColours.secondary : DarkColours.secondary,
        alignSelf: flexStart ? 'flex-start' : 'center',
        height: 65
      }}
      secureTextEntry={passwordEntry ? true : false}
      right={password ? <TextInput.Icon icon={passwordEntry ? "eye" : 'eye-off'} color={dark ? 'white' : themeState === 'dark' ?
        'white' : 'black'
      } onPress={() => { setPasswordEntry(!passwordEntry) }} /> : null}
      left={icon ? <TextInput.Icon icon={icon}
        color={themeState === 'dark' ? 'white' : 'black'} /> : null}
      value={value}
      outlineColor="gray"
      activeOutlineColor={themeState === 'dark' ? 'white' : 'black'}
      theme={{
        ...themeState === 'dark' ? MD3DarkTheme : MD3LightTheme,
        colors: {
          ...themeState === 'dark' ? MD3DarkTheme.colors : MD3LightTheme.colors,
          primary: themeState === 'dark' ? 'white' : 'black',
          placeholder: 'gray',
        }
      }}
    />
  );
};
