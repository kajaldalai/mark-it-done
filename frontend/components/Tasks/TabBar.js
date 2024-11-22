import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const TabBar = () => {
    const [selectedTab, setSelectedTab] = React.useState('Kick Off');

    const tabs = [
        { name: 'Kick Off' },
        { name: 'In Motion...'},
        { name: 'Victory Lap' },
    ];

    return (
        <View style={tabBarStyles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.name}
                    style={[tabBarStyles.tab, selectedTab === tab.name && tabBarStyles.selectedTab]}
                    onPress={() => setSelectedTab(tab.name)}
                >
                    <Text style={[tabBarStyles.tabText, selectedTab === tab.name && tabBarStyles.selectedTabText]}>
                        {tab.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const tabBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#f0e9ff',
    },
    selectedTab: {
        backgroundColor: '#7a4de8',
    },
    tabText: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14.52,
        color: '#744be5'
    },
    selectedTabText: {
        color: '#ffffff',
    },
});