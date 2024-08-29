import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"; // Import Animated and effects
import stylesheet from "../../../UIElements/StyleSheet";
import { BottomNav } from "../../../UIElements/BottomNav";
import HomePage from "../Pages/HomePage";
import Chats from "../Pages/Chats";
import Search from "../Pages/Search";
import Settings from "../Pages/Settings";
import Header from "../../../UIElements/CommonElements/Header";

const Home = (props) => {
    const [currentTab, setCurrentTab] = useState('home');
    const [visibleNavbar, setVisibleNavbar] = useState(true);

    const [visibleTitle, setVisibleTitle] = useState(true)

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
            <Header name={currentTab} visible={visibleTitle}/>
            <ScrollView style={{ flex: 1 }}
                onScroll={(tx) => {
                    if (tx.nativeEvent.velocity.y > 1) {
                        setVisibleNavbar(false);
                    } else if (tx.nativeEvent.velocity.y < -1) {
                        setVisibleNavbar(true);
                    }

                    if(tx.nativeEvent.contentOffset.y > 100){
                        setVisibleTitle(true)
                    }else if(tx.nativeEvent.contentOffset.y < 100){
                        setVisibleTitle(false)
                    }
                }}
                showsVerticalScrollIndicator={false}>
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
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
