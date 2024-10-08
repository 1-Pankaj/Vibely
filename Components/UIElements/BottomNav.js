import React, { useEffect, useState } from "react";
import { Animated, Appearance, Dimensions, Easing, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export const BottomNav = ({ onTabChange, visible }) => {
    const [themeState, setThemeState] = useState(Appearance.getColorScheme());
    const [selectedTab, setSelectedTab] = useState('chat');

    const animatedPosition = useState(new Animated.Value(30))[0]

    const animatePosition = () => {
        Animated.timing(animatedPosition, {
            toValue: visible ? 30 : -115,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease
        }).start()
    }

    useEffect(() => {
        animatePosition()
    }, [visible])

    useEffect(() => {
        const listener = Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme());
        });
        return () => {
            listener.remove();
        };
    }, []);

    const handleTabPress = (tabName) => {
        setSelectedTab(tabName);
        onTabChange(tabName);
    };

    return (
        <Animated.View style={{
            position: 'absolute',
            bottom: animatedPosition,
            alignItems: 'center',
            width: '90%', elevation:10
        }}>
            <Card
                style={{
                    width: '100%',
                    height: 80,
                    borderRadius: 40, 
                    flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-evenly',
                    backgroundColor: themeState === 'dark' ? 'black' : 'white',
                    borderWidth:0.5, borderColor: themeState === 'dark'? 'white' :
                    'darkgray'
                }}
                contentStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '80%'
                }}
            >
                <TouchableOpacity
                    onPress={() => handleTabPress('home')}
                    style={{
                        height: 80,
                        alignItems: 'center', justifyContent: 'center',
                        borderTopWidth: selectedTab === 'home' ? 2 : 0,
                        borderTopColor: themeState === 'dark' ? 'white' : 'black',
                        width: '15%'
                    }}
                    activeOpacity={0.6}
                >
                    <Image
                        source={selectedTab === 'home' ?
                            themeState === 'dark' ?
                                require('../Assets/Night/icontext-active-dark.png') :
                                require('../Assets/Day/icontext-active-light.png')
                            : require('../Assets/Icons/icontext-inactive.png')}
                        style={{
                            width: selectedTab === 'home' ? 45 : 40, height: selectedTab === 'home' ? 17.48 : 15.54
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleTabPress('search')}
                    style={{
                        height: 80,
                        alignItems: 'center', justifyContent: 'center',
                        borderTopWidth: selectedTab === 'search' ? 2 : 0,
                        borderTopColor: themeState === 'dark' ? 'white' : 'black',
                        width: '15%'
                    }}
                    activeOpacity={0.6}
                >
                    <Ionicons
                        name={selectedTab === 'search' ? "search" : "search-outline"}
                        size={selectedTab === 'search' ? 28 : 24}
                        color={selectedTab === 'search' ? themeState === 'dark' ? 'white' : 'black' : 'gray'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleTabPress('chat')}
                    style={{
                        height: 80,
                        alignItems: 'center', justifyContent: 'center',
                        borderTopWidth: selectedTab === 'chat' ? 2 : 0,
                        borderTopColor: themeState === 'dark' ? 'white' : 'black',
                        width: '15%'
                    }}
                    activeOpacity={0.6}
                >
                    <Ionicons
                        name={selectedTab === 'chat' ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
                        size={selectedTab === 'chat' ? 28 : 24}
                        color={selectedTab === 'chat' ? themeState === 'dark' ? 'white' : 'black' : 'gray'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleTabPress('settings')}
                    style={{
                        height: 80,
                        alignItems: 'center', justifyContent: 'center',
                        borderTopWidth: selectedTab === 'settings' ? 2 : 0,
                        borderTopColor: themeState === 'dark' ? 'white' : 'black',
                        width: '15%'
                    }}
                    activeOpacity={0.6}
                >
                    <Ionicons
                        name={selectedTab === 'settings' ? 'settings' : "settings-outline"}
                        size={selectedTab === 'settings' ? 28 : 24}
                        color={selectedTab === 'settings' ? themeState === 'dark' ? 'white' : 'black' : 'gray'}
                    />
                </TouchableOpacity>
            </Card>
        </Animated.View>
    );
};
