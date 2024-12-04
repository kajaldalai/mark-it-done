// App.js
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../components/Header'
import { NavigationBar } from '../../components/Navbar'
import { RewardCard } from './RewardCard'
import { getRewards, getUserPoints, redeemReward } from '../../database'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

export const Rewards = () => {
    const [activeTab, setActiveTab] = useState('available');
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userPoints, setUserPoints] = useState(0);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const user = JSON.parse(await AsyncStorage.getItem('user'));
                if (user) {
                    setUserId(user.id);
                    const points = await getUserPoints(user.id);
                    setUserPoints(points);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchRewards(activeTab);
        }
    }, [activeTab, userId]);

    const fetchRewards = async (type) => {
        setLoading(true);
        try {
            const response = await getRewards(type, userId);
            setRewards(response);
        } catch (error) {
            console.error('Error fetching rewards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRedeem = async (rewardId) => {
        try {
            await redeemReward(userId, rewardId);
            const points = await getUserPoints(userId);
            setUserPoints(points);
            setActiveTab('redeemed');
        } catch (error) {
            console.error('Redemption error:', error);
            Alert.alert('Error', 'Failed to redeem reward');
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Header refreshTrigger={userPoints}/>
                
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
                        renderItem={({ item }) => (
                            <RewardCard 
                                reward={item} 
                                onRedeem={handleRedeem}
                                userPoints={userPoints}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                        refreshing={loading}
                        onRefresh={() => fetchRewards(activeTab)}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No rewards available</Text>
                            </View>
                        )}
                    />
                </View>
                
                <NavigationBar />
            </View>
        </SafeAreaView>
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
        gap: 10,
        justifyContent: 'center',
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#7a4de8',
    },
    tabText: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
    },
    activeTabText: {
        color: '#FFF',
    },
    rewardsList: {
        padding: 16,
        paddingBottom: 80,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
});