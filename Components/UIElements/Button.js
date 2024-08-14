import React from "react";
import { Button } from "react-native-paper";
import TextRegular from "./TextRegular";
import { Dimensions } from "react-native";

const Custombutton = ({ text,
    onPress,
    disabled,
    marginStart,
    marginEnd,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical }) => {
    return (
        <Button onPress={onPress} textColor="white"
            mode="contained" labelStyle={{
                fontStyle: 'normal', fontWeight: 'regular', fontSize: 16,
                width: Dimensions.get('window').width-110, paddingVertical: 10
            }} style={{
                borderRadius: 10, marginStart: marginStart,
                marginEnd: marginEnd, marginBottom: marginBottom,
                marginTop: marginTop, marginHorizontal: marginHorizontal,
                marginVertical: marginVertical
            }}
            disabled={disabled}>
            <TextRegular value={text} bold inverted/>
        </Button>
    )
}

export default Custombutton