// App.js
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Avatar, StatusBar as CustomStatusBar, ActionButton } from "../Header/Statusbar";
import { TaskCard } from "./TaskCard";
import { Header } from '../Header'
import { NavigationBar } from '../Navbar'
import { TabBar } from './TabBar'
import yellowreward from '../../assets/images/yellowreward.png'
import bluereward from '../../assets/images/bluereward.png'
import redreward from '../../assets/images/redreward.png'
import multireward from '../../assets/images/multireward.png'

export const Task = () => {
    return (
        <>
            <Header />
            <TabBar />
            <ScrollView style={styles.container}>
                <View style={styles.taskList}>
                    <TaskCard
                        title="CS495 Assignment 4"
                        description="Set the wheels in motion. Greatness starts with first step."
                        dueDate="Due on Nov 11, 10:00am"
                        points="400"
                        rewardIcon={bluereward}
                    />
                    <TaskCard
                        title="CS585 Homework 3"
                        description="A quick win awaits! Let's cross something off that list!"
                        dueDate="Due on Nov 15, 11:59pm"
                        points="150"
                        rewardIcon={yellowreward}
                    />
                    <TaskCard
                        title="CS450 Project Proposal"
                        description="Today's the day, let's crush it!"
                        dueDate="Due on Nov 20, 11:59pm"
                        points="300"
                        rewardIcon={redreward}
                    />
                    <TaskCard
                        title="CS581 Quiz 5"
                        description="I know I am here for a while, but your attention would make my day!"
                        dueDate="Due on Nov 20, 11:59pm"
                        points="500"
                        rewardIcon={multireward}
                    />
                </View>
            </ScrollView>
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