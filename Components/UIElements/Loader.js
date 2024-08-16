import { View } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import { ActivityIndicator, Modal } from "react-native-paper"

export const Loader = ({visible}) =>{
    return(
        <Modal visible={visible} style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            
        }}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Spinner animation="fade" visible={visible} />
            </View>
        </Modal>
    )
}