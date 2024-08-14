import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const BackButton = ({
    props,
    flexStart,
    margin
}) => {
    return (
        <TouchableOpacity style={{
            width: 35, height: 35,
            alignItems: 'center', justifyContent: 'center',
            alignSelf:flexStart? 'flex-start' : 'auto',
            margin:margin
        }} onPress={() => {
                props.navigation.goBack()
        }}>
            <MaterialIcons name="arrow-back-ios" size={30} />
        </TouchableOpacity>
    )
}