// App.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Header } from './Header'
import { NavigationBar } from './Navbar'
import { RewardCard } from './RewardCard'
import { getRewards } from './database'

export const Rewards = () => {
    const [activeTab, setActiveTab] = useState('available');
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRewards = async (type) => {
        setLoading(true);
        try {
            const response = await getRewards(type, 1);
            setRewards(response);
        } catch (error) {
            console.error('Error fetching rewards:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards(activeTab);
    }, [activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <View style={styles.container}>
            <Header />
            
            <View style={styles.content}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'available' && styles.activeTab]}
                        onPress={() => handleTabChange('available')}
                    >
                        <Text style={[styles.tabText, activeTab === 'available' && styles.activeTabText]}>
                            Available
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'redeemed' && styles.activeTab]}
                        onPress={() => handleTabChange('redeemed')}
                    >
                        <Text style={[styles.tabText, activeTab === 'redeemed' && styles.activeTabText]}>
                            Redeemed
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={rewards}
                    numColumns={2}
                    contentContainerStyle={styles.rewardsList}
                    renderItem={({ item }) => <RewardCard reward={item} />}
                    keyExtractor={item => item.id.toString()}
                    refreshing={loading}
                    onRefresh={() => fetchRewards(activeTab)}
                />
            </View>
            
            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#6B4EFF',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#FFF',
    },
    rewardsList: {
        padding: 16,
        paddingBottom: 80,
    },
});