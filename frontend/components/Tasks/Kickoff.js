// App.js
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Avatar, StatusBar as CustomStatusBar, ActionButton } from "../Header/Statusbar";
import { BottomNav } from "../Navigator/BottomNavbar"
import { TaskCard } from "./TaskCard";

export default function Kickoff() {
    const [activeTab, setActiveTab] = useState("home");

    const tasks = [
        {
            id: 1,
            title: "CS495 Assignment 4",
            description: "Set the wheels in motion. Greatness starts with first step.",
            dueDate: "Nov 11, 10:00am",
            points: 400,
        },
        {
            id: 2,
            title: "CS585 Homework 3",
            description: "A quick win awaits! Let's cross something off that list!",
            dueDate: "Nov 15, 11:59pm",
            points: 150,
        },
        {
            id: 3,
            title: "CS450 Project Proposal",
            description: "Today's the day, let's crush it!",
            dueDate: "Nov 20, 11:59pm",
            points: 300,
        },
        {
            id: 4,
            title: "CS581 Quiz 5",
            description: "I know I am here for a while, but your attention would make my day!",
            dueDate: "Nov 20, 11:59pm",
            points: 500,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <Avatar
                imageUrl="https://via.placeholder.com/40"
                greeting="Morning!"
            />

            <CustomStatusBar
                points={4500}
                medals={2}
                notifications={3}
            />

            <View style={styles.actionButtons}>
                <ActionButton title="Kick Off" isActive={true} />
                <ActionButton title="In Motion..." />
                <ActionButton title="Victory Lap" />
            </View>

            <ScrollView style={styles.taskList}>
                {tasks.map(task => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </ScrollView>

            <BottomNav
                activeTab={activeTab}
                onTabPress={setActiveTab}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 16,
    },
    taskList: {
        flex: 1,
    },
});