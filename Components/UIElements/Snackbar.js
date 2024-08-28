import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { MD2DarkTheme, MD3DarkTheme, MD3LightTheme, Portal, Snackbar } from "react-native-paper";
import DarkColours from "../Themes/DarkColours";

export const CustomSnackbar = ({ visible, onDismissSnackBar, label, message }) => {
    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])
    return (
        <Portal>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                style={{ backgroundColor: themeState === 'dark'? DarkColours.secondary : 'black' }}
                action={{
                    label: label,
                    onPress: () => {
                        onDismissSnackBar()
                    },
                    textColor: 'white'
                }} theme={{
                    colors: {
                        ...MD3LightTheme.colors,
                        primary: 'white',
                        secondary: 'white'
                    },
                }}>
                {message}
            </Snackbar>
        </Portal>
    )
}