import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Avatar = ({ imageUrl, greeting }) => (
    <View style={styles.avatarContainer}>
        <Image
            source={{ uri: imageUrl }}
            style={styles.avatar}
        />
        <Text style={styles.greeting}>{greeting}</Text>
    </View>
);

export const StatusBar = ({ points, medals, notifications }) => (
    <View style={styles.statusBar}>
        <View style={styles.pointsContainer}>
            <View style={styles.purpleCircle}>
                <Text style={styles.pointsText}>{points}</Text>
            </View>
        </View>
        <View style={styles.medalContainer}>
            <Text style={styles.medalText}>🏅 {medals}</Text>
        </View>
        <View style={styles.notificationContainer}>
            {notifications > 0 && (
                <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{notifications}</Text>
                </View>
            )}
            <Text style={styles.bellIcon}>🔔</Text>
        </View>
    </View>
);

export const ActionButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
        style={[styles.actionButton, isActive && styles.actionButtonActive]}
        onPress={onPress}
    >
        <Text style={[styles.actionButtonText, isActive && styles.actionButtonTextActive]}>
            {title}
        </Text>
    </TouchableOpacity>
);

export const Header = () => {
    
}

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    greeting: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    purpleCircle: {
        backgroundColor: '#8A2BE2',
        borderRadius: 20,
        padding: 8,
    },
    pointsText: {
        color: 'white',
        fontWeight: 'bold',
    },
    medalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    medalText: {
        fontSize: 16,
    },
    notificationBadge: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    notificationText: {
        color: 'white',
        fontSize: 12,
    },
    actionButton: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginHorizontal: 8,
    },
    actionButtonActive: {
        backgroundColor: '#8A2BE2',
    },
    actionButtonText: {
        color: '#666',
        fontWeight: '600',
    },
    actionButtonTextActive: {
        color: 'white',
    }
})