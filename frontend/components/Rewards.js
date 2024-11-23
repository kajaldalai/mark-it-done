// App.js
import React from "react";
import { Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header } from './Header'
import { NavigationBar } from './Navbar'
import { TabBar } from './Tasks/TabBar'

export const Rewards = () => {
    return (
        <>
            <Header />
            <TabBar />
            <Text>Rewards</Text>
            <NavigationBar />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    taskList: {
        padding: 20,
    },
});