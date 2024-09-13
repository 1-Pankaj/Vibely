import React from "react";
import { View } from "react-native";
import { BackButton } from "../../../../../UIElements/Back";
import stylesheet from "../../../../../UIElements/StyleSheet";

const CreateContact = (props) => {
    return (
        <View style={[stylesheet.container]}>
            <View style={{ width: '100%' }}>
                <View style={{
                    marginTop: 25, paddingVertical: 10,
                    marginStart: 20, width: '100%'
                }}>
                    <BackButton props={props} />
                </View>
            </View>
        </View>
    )
}

export default CreateContact