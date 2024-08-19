import { MD2DarkTheme, MD3DarkTheme, MD3LightTheme, Portal, Snackbar } from "react-native-paper";

export const CustomSnackbar = ({ visible, onDismissSnackBar, label, message }) => {
    return (
        <Portal>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                style={{backgroundColor:'black'}}
                action={{
                    label: label,
                    onPress: () => {
                        onDismissSnackBar()
                    },
                    textColor:'white'
                }} theme={{
                    colors: {
                        ...MD3LightTheme.colors,
                        primary:'white',
                        secondary:'white'
                    },
                }}>
                {message}
            </Snackbar>
        </Portal>
    )
}