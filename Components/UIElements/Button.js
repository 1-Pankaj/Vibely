import React from "react";
import { Button } from "react-native-paper";
import TextRegular from "./TextRegular";

const ThemeButton = ({ text,
    onPress,
    disabled,
    marginStart,
    marginEnd,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical }) => {
    return (
        <Button onPress={() => { onPress() }} textColor="white"
            mode="contained" labelStyle={{
                fontStyle: 'normal', fontWeight: 'regular', fontSize: 16,
                width: '75%', paddingVertical: 10
            }} style={{
                borderRadius: 30, marginStart: marginStart,
                marginEnd: marginEnd, marginBottom: marginBottom,
                marginTop: marginTop, marginHorizontal: marginHorizontal,
                marginVertical: marginVertical
            }}
            disabled={disabled}>
            <TextRegular value={text} bold inverted/>
        </Button>
    )
}

export default ThemeButton