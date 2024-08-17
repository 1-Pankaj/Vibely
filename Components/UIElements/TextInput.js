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
  dark
}) => {
  const [themeState, setThemeState] = useState(dark? 'dark' : Appearance.getColorScheme());

  useEffect(() => {
    const listener = () => {
      setThemeState(Appearance.getColorScheme());
    };
    Appearance.addChangeListener(listener);

  }, []);

  return (
    <TextInput
      label={label}
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
