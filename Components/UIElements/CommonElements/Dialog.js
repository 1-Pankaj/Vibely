import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { Appearance, View } from 'react-native';
import { Button, Dialog, Modal, Portal, Text } from 'react-native-paper';
import TextRegular from '../TextRegular';
import TextBold from '../TextBold';
import DarkColours from '../../Themes/DarkColours';

export const DialogCustom = ({ visible, hideDialog, title, message, onSubmit, button }) => {

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    return (
        <Portal>
            <Modal visible={visible} style={{
                width: '100%', height: '100%',
            }} dismissable onDismiss={hideDialog}>
                <BlurView style={{
                    width: '100%', height: '100%', alignItems: 'center',
                    justifyContent: 'center'
                }} intensity={20} experimentalBlurMethod='dimezisBlurView'
                tint='systemChromeMaterialDark' >
                    <BlurView style={{
                        width: '80%',
                        overflow: 'hidden', borderRadius: 20,
                        paddingVertical:20, paddingHorizontal:30
                    }} intensity={100} experimentalBlurMethod='dimezisBlurView'
                        tint={themeState === 'dark' ?
                            'systemThinMaterialDark' : 'systemChromeMaterialLight'
                        }>
                            <TextBold value={title} flexStart fontSize={20}/>
                            <TextRegular value={message} flexStart marginTop={10}/>
                            <View style={{alignSelf:'flex-end',
                                alignItems:'center', flexDirection:'row',
                                gap:20, marginTop:20
                            }}>
                                <Button onPress={hideDialog}>Cancel</Button>
                                <Button onPress={onSubmit}
                                textColor={button === 'Logout'? 
                                    'red' : DarkColours.primary
                                }>{button}</Button>
                            </View>
                    </BlurView>
                </BlurView>
            </Modal>
        </Portal>
    );
};
