import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import rewardIcon from '../assets/images/reward.png'
import lock from '../assets/images/lock.png'

// Import all reward images
const rewardImages = {
  pizza: require('../assets/images/pizza.png'),
  coffee: require('../assets/images/coffee.png'),
  donut: require('../assets/images/donut.png'),
  chips: require('../assets/images/chips.png'),
  cupcake: require('../assets/images/cupcake.png'),
  hotdog: require('../assets/images/hotdog.png'),
};

export const RewardCard = ({ reward }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Image 
                source={rewardImages[reward.image_url]}
                style={styles.image}
            />
            <Text style={styles.name}>{reward.name}</Text>
            <View style={styles.pointsContainer}>
                <Image 
                    source={rewardIcon}
                    style={styles.diamond}
                />
                <Text style={styles.points}>{reward.points}</Text>
            </View>
            {reward.expiry_date && (
                    <Text style={styles.expiry}>
                        {new Date(reward.expiry_date).toLocaleDateString()}
                    </Text>
            )}
            {reward.is_locked && (
                <View style={styles.lockedOverlay}>
                    <Image 
                        source={lock}
                        style={styles.lockIcon}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    diamond: {
        width: 16,
        height: 16,
    },
    points: {
        fontSize: 14,
        color: '#666',
    },
    expiry: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    lockedOverlay: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    lockIcon: {
        width: 20,
        height: 20,
    },
}); 