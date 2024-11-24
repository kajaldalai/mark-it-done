import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const TabBar = ({ activeTab, onTabChange }) => {
    const tabs = [
        { name: 'kickoff', label: 'Kick Off' },
        { name: 'inmotion', label: 'In Motion...' },
        { name: 'victorylap', label: 'Victory Lap' },
    ];

    return (
        <View style={tabBarStyles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.name}
                    style={[
                        tabBarStyles.tab, 
                        activeTab === tab.name && tabBarStyles.selectedTab
                    ]}
                    onPress={() => onTabChange(tab.name)}
                >
                    <Text style={[
                        tabBarStyles.tabText, 
                        activeTab === tab.name && tabBarStyles.selectedTabText
                    ]}>
                        {tab.label}
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
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: '#f0e9ff',
        width: '30%',
    },
    selectedTab: {
        backgroundColor: '#7a4de8',
    },
    tabText: {
        textAlign: 'center',
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