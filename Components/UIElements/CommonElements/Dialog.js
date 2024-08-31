import React from 'react';
import { Button, Dialog, Modal, Portal, Text } from 'react-native-paper';

export const DialogCustom = ({ visible, hideDialog, title, message, onSubmit, button }) => {
    return (
        <Portal>
            <Modal visible={visible} style={{
                width: 100, height: 100,
                backgroundColor:'#414141'
            }} dismissable onDismiss={hideDialog}>

            </Modal>
        </Portal>
    );
};
