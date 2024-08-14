import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import stylesheet from "../../../UIElements/StyleSheet";
import { BackButton } from "../../../UIElements/Back";
import TextBold from "../../../UIElements/TextBold";
import TextRegular from "../../../UIElements/TextRegular";
import { CustomTextInput } from "../../../UIElements/TextInput";
import Custombutton from "../../../UIElements/Button";
import { Divider, Text } from "react-native-paper";
import GoogleButton from "../../../UIElements/GoogleButton";

export default Login = (props) => {
    return (
        <View style={[stylesheet.container, {
            justifyContent: 'space-between'
        }]}>
            <View>
                <BackButton props={props} flexStart margin={25} />
                <TextBold value={`Welcome`} fontSize={35}
                    fontWeight={"bold"} textAlign="left" flexStart
                    marginStart={20} marginTop={20} />
                <TextBold value={`Back!`} fontSize={40}
                    fontWeight={"bold"} textAlign="left" flexStart
                    marginStart={20} />
                <TextRegular value={'Please enter your Email ID which will be used to access Vibely'}
                    flexStart textAlign="left"
                    marginStart={20} marginTop={10}
                    marginEnd={Dimensions.get('window').width / 3.5} />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', }}>
                <CustomTextInput label={"Email or Phone"} marginTop={50} />

                <View style={{ alignItems: 'center', marginBottom: 50 }}>
                    
                    <Custombutton text="Continue" marginTop={20} />
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        marginTop: 20, marginBottom: 20
                    }}>
                        <Divider style={{
                            width: 100,
                            backgroundColor: 'gray'
                        }} />
                        <Text style={{ color: 'gray' }}>    OR    </Text>
                        <Divider style={{
                            width: 100,
                            backgroundColor: 'gray'
                        }} />
                    </View>
                    <GoogleButton marginBottom={50} />
                    

                    <Text style={{fontFamily:'Mulish-Regular', 
                        paddingHorizontal:50, textAlign:'center',}}>
                        By tapping "Continue," I confirm that I agree to
                    </Text>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("PrivacyPolicy")
                    }}>
                        <TextRegular value="Terms & Privacy Policy." />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}