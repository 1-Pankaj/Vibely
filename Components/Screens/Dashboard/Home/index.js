import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"; // Import Animated and effects
import stylesheet from "../../../UIElements/StyleSheet";
import { BottomNav } from "../../../UIElements/BottomNav";
import HomePage from "../Pages/HomePage";
import Chats from "../Pages/Chats";
import Search from "../Pages/Search";
import Settings from "../Pages/Settings";

const Home = () => {
    const [currentTab, setCurrentTab] = useState('home');
    const [visibleNavbar, setVisibleNavbar] = useState(true);

    const renderPage = () => {
        switch (currentTab) {
            case 'home':
                return <HomePage />;
            case 'search':
                return <Search />;
            case 'chat':
                return <Chats />;
            case 'settings':
                return <Settings />;
            default:
                return <HomePage />;
        }
    };

    return (
        <SafeAreaView style={stylesheet.container}>
            <ScrollView style={{ flex: 1 }}
                onScroll={(tx) => {
                    if (tx.nativeEvent.velocity.y > 1) {
                        setVisibleNavbar(false);
                    } else if (tx.nativeEvent.velocity.y < -1) {
                        setVisibleNavbar(true);
                    }
                }}
            >
                <Animated.View
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(300)}
                    style={{ flex: 1 }}
                >
                    {renderPage()}
                </Animated.View>
            </ScrollView>
            <BottomNav onTabChange={setCurrentTab} visible={visibleNavbar} />
        </SafeAreaView>
    );
};

export default Home;
