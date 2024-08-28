import { useEffect, useState } from "react";
import { Appearance, Dimensions, TextInput, TouchableOpacity, View } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import LightColours from "../Themes/LightColours";
import DarkColours from "../Themes/DarkColours";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
    <View style={{
      width: Dimensions.get('window').width - 65,
      marginTop: marginTop,
      marginBottom: marginBottom,
      marginStart: marginStart,
      marginEnd: marginEnd,
      backgroundColor: themeState === 'light' ?
        LightColours.secondary : DarkColours.secondary,
      alignSelf: flexStart ? 'flex-start' : 'center',
      height: 70, borderRadius: 10, paddingHorizontal: 20,
      alignItems: 'center', justifyContent: 'flex-start',
      flexDirection: 'row',
    }}>
      <MaterialIcons name={icon} size={24} style={{
        marginEnd: 15, alignSelf: 'center'
      }} color={themeState === 'dark' ?
        'white' : 'black'
      } />
      <TextInput
        error={error}
        autoCapitalize={password ? "none" : 'sentences'}
        placeholder={label}
        placeholderTextColor={themeState === 'dark' ? '#414141' : 'darkgray'}
        cursorColor={'gray'}
        onBlur={onBlur}
        onChangeText={onChangeText}
        style={{
          flex: 1,
          color: themeState === 'dark' ? 'white' : 'black',
          fontWeight: 'bold', fontSize: 16
        }}
        secureTextEntry={passwordEntry}
        // right={password ? <TextInput.Icon icon={passwordEntry ? "eye" : 'eye-off'} color={dark ? 'white' : themeState === 'dark' ?
        //   'white' : 'black'
        // } onPress={() => { setPasswordEntry(!passwordEntry) }} /> : null}

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
      {
        password ?
          <TouchableOpacity onPress={() => {
            setPasswordEntry(!passwordEntry)
          }}>
            <Ionicons name={passwordEntry ? 'eye' : 'eye-off'}
              size={20} color={themeState === 'dark' ? 'white' : 'black'} />
          </TouchableOpacity>
          :
          null
      }
    </View>

  );
};
