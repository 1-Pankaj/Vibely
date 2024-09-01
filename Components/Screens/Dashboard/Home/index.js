import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Animated as BaseAnimated, Easing, View, Dimensions, TextInput, Appearance, Image } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import stylesheet from "../../../UIElements/StyleSheet";
import { BottomNav } from "../../../UIElements/BottomNav";
import HomePage from "../Pages/HomePage";
import Chats from "../Pages/Chats";
import Search from "../Pages/Search";
import Settings from "../Pages/Settings";
import Header from "../../../UIElements/CommonElements/Header";
import { AnimatedFAB, Text } from "react-native-paper";
import DarkColours from "../../../Themes/DarkColours";
import { Search as SearchHeader } from "../../../UIElements/CommonElements/Search";
import TextBold from "../../../UIElements/TextBold";
import { ExpandableSection } from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";

const Home = (props) => {
    const [currentTab, setCurrentTab] = useState('chat');
    const [visibleNavbar, setVisibleNavbar] = useState(true);

    const [visibleTitle, setVisibleTitle] = useState(false)
    const [visibleSearch, setVisibleSearch] = useState(true)

    const [themeState, setThemeState] = useState(Appearance.getColorScheme())

    useEffect(() => {
        Appearance.addChangeListener(() => {
            setThemeState(Appearance.getColorScheme())
        })
    }, [])

    const animatedPosition = useState(new BaseAnimated.Value(115))[0]

    const animateFab = () => {
        BaseAnimated.timing(animatedPosition, {
            toValue: !visibleNavbar ? 70 : 150,
            useNativeDriver: false,
            duration: 300,
            easing: Easing.ease,
        }).start()
    }

    useEffect(() => {
        animateFab()
    }, [visibleNavbar])

    const renderPage = () => {
        switch (currentTab) {
            case 'home':
                return <HomePage />;
            case 'search':
                return <Search />;
            case 'chat':
                return <Chats />;
            case 'settings':
                return <Settings props={props} />;
            default:
                return <HomePage />;
        }
    };

    const lastScrollY = useRef(0);
    const isScrollingDown = useRef(false);

    const handleScroll = (event) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const scrollDifference = currentScrollY - lastScrollY.current;

        if (scrollDifference > 10) {
            setVisibleNavbar(false);
            isScrollingDown.current = true;
        } else if (scrollDifference < -10) {
            setVisibleNavbar(true);
            isScrollingDown.current = false;
        }

        lastScrollY.current = currentScrollY;
    };

    return (
        <SafeAreaView style={stylesheet.container}>
            <Header name={currentTab} visible={visibleTitle} />

            <ScrollView style={{ flex: 1 }}
                onScrollEndDrag={(tx) => {
                    if (tx.nativeEvent.contentOffset.y < 50) {
                        setVisibleNavbar(true);
                        isScrollingDown.current = false;
                    }
                }}
                onScroll={(tx) => {
                    handleScroll(tx);

                    if (tx.nativeEvent.contentOffset.y > 50) {
                        setVisibleTitle(true)
                    } else if (tx.nativeEvent.contentOffset.y < 50) {
                        setVisibleTitle(false)
                    }
                    if (tx.nativeEvent.contentOffset.y > 10) {
                        setVisibleSearch(false)
                    } else if (tx.nativeEvent.contentOffset.y < 1) {
                        setVisibleSearch(true)
                    }
                }}
                showsVerticalScrollIndicator={false}>

                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    style={{ flex: 1, width: Dimensions.get('window').width }}>
                    {
                        currentTab === 'home' ?
                            <Image source={
                                themeState === 'dark' ?
                                    require("../../../Assets/Night/icontext-active-dark.png")
                                    :
                                    require("../../../Assets/Day/icontext-active-light.png")
                            } style={{
                                width: 85, height: 33.02,
                                marginTop: 110, marginStart: 20
                            }} />
                            : <TextBold value={currentTab == 'chat' ?
                                'Chats' :
                                currentTab == 'search' ?
                                    'Search' :
                                    currentTab == 'settings' ?
                                        'Settings' :
                                        'Home'
                            } marginTop={100}
                                fontSize={30} flexStart marginStart={20} />
                    }
                    <ExpandableSection expanded={
                        currentTab === 'home' ? false : visibleSearch
                    } >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', padding: 10, backgroundColor:
                                themeState === 'dark' ? '#212121' : '#f0f0f0',
                            width: Dimensions.get('window').width - 30, height: 40,
                            borderRadius: 8, paddingHorizontal: 20, gap: 12,
                            alignItems: 'center', alignSelf: 'center',
                            marginVertical: 10
                        }}>
                            <Ionicons name="search-outline" size={22}
                                color={themeState === 'dark' ?
                                    'white' : 'black'
                                } />
                            <TextInput placeholder="Search" style={{
                                flex: 1, fontSize: 16, fontFamily: 'Mulish-Regular',
                                color: themeState === 'dark' ? 'white' : 'black'
                            }} placeholderTextColor={'gray'} />
                        </View>
                    </ExpandableSection>
                    {renderPage()}
                </Animated.View>
            </ScrollView>
            <BaseAnimated.View
                style={{
                    position: 'absolute',
                    bottom: animatedPosition,
                    width: '90%',
                    alignItems: 'flex-end'
                }}>
                <AnimatedFAB
                    icon={currentTab === 'chat' ?
                        'plus' : 'heart-plus-outline'
                    }
                    label={
                        currentTab == 'chat' ? 'Add Chat' :
                            "Add Media"
                    }
                    color="white"
                    extended={visibleNavbar}
                    visible={currentTab == 'settings' ? false :
                        currentTab === 'search' ? false : true
                    }
                    onPress={() => {
                        if (currentTab === 'chat') {
                            setVisibleNavbar(false)
                            animateFab()
                            props.navigation.navigate('AddChat');
                        }
                    }}
                    rippleColor={'white'}
                    animateFrom={'right'}
                    iconMode={'dynamic'}
                    style={{
                        backgroundColor: DarkColours.primary
                    }}
                />
            </BaseAnimated.View>
            <BottomNav onTabChange={setCurrentTab} visible={visibleNavbar} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    fabStyle: {

    },
});

export default Home;