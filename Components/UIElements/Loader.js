import { useEffect, useState } from "react"
import { Appearance, View } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import { ActivityIndicator, Modal } from "react-native-paper"

export const Loader = ({visible}) =>{
    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(()=>{
        Appearance.addChangeListener(()=>{
            setThemeState(Appearance.getColorScheme())
        })
    },[])
    return(
        <Modal visible={visible} style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            
        }}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Spinner animation="fade" visible={visible} color={themeState === 'dark'? 'white' : "black"}/>
            </View>
        </Modal>
    )
}