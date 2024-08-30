import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Animated as BaseAnimated, Easing } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import stylesheet from "../../../UIElements/StyleSheet";
import { BottomNav } from "../../../UIElements/BottomNav";
import HomePage from "../Pages/HomePage";
import Chats from "../Pages/Chats";
import Search from "../Pages/Search";
import Settings from "../Pages/Settings";
import Header from "../../../UIElements/CommonElements/Header";
import { AnimatedFAB } from "react-native-paper";
import DarkColours from "../../../Themes/DarkColours";

const Home = (props) => {
    const [currentTab, setCurrentTab] = useState('home');
    const [visibleNavbar, setVisibleNavbar] = useState(true);

    const [visibleTitle, setVisibleTitle] = useState(false)
    const [visibleLabel, setVisibleLabel] = useState(true)

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

    return (
        <SafeAreaView style={stylesheet.container}>
            <Header name={currentTab} visible={visibleTitle} />
            <ScrollView style={{ flex: 1 }}
                onScrollEndDrag={(tx) => {
                    if (tx.nativeEvent.contentOffset.y < 50) {
                        setVisibleNavbar(true)
                    }
                }}
                onScroll={(tx) => {
                    if (tx.nativeEvent.velocity.y > 0.2) {
                        setVisibleNavbar(false);
                    } else if (tx.nativeEvent.velocity.y < -0.2) {
                        setVisibleNavbar(true);
                    }

                    if (tx.nativeEvent.contentOffset.y > 50) {
                        setVisibleTitle(true)
                    } else if (tx.nativeEvent.contentOffset.y < 50) {
                        setVisibleTitle(false)
                    }
                }}
                showsVerticalScrollIndicator={false}>
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    style={{ flex: 1 }}>
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
                    icon={'plus'}
                    label={'Add Chats'}
                    color="white"
                    extended={visibleNavbar}
                    visible
                    onPress={() => { }}
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
