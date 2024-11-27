import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import avatar from '../assets/images/avatar.png';
import reward from '../assets/images/reward.png';
import badge from '../assets/images/badge.png';
import notification from '../assets/images/notification.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserPoints } from '../database';

export const Header = ({ refreshTrigger }) => {
    const navigation = useNavigation();
    const [userName, setUserName] = React.useState('');
    const [points, setPoints] = React.useState(0);

    React.useEffect(() => {
        const getUserName = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                setUserName(parsedUser.name || '');
                const userPoints = await getUserPoints(parsedUser.id);
                setPoints(userPoints);        
            }
        };
        getUserName();
    }, [refreshTrigger]);

    return (
        <View style={headerStyles.container}>
            <View style={headerStyles.content}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image
                        source={avatar}
                        style={headerStyles.avatar}
                    />
                </TouchableOpacity>
                <View style={headerStyles.headerLabel}>
                    <Text style={headerStyles.userName}>{userName}</Text>
                    <Text style={headerStyles.userStatus}>Morning!</Text>
                </View>
                <View style={headerStyles.rewardIcon}>
                    <View style={headerStyles.rewardContainer}>
                        <Image
                            source={reward}
                        />
                        <Text style={headerStyles.iconText}>{points}</Text>
                    </View>
                </View>
                <View style={headerStyles.badgeIcon}>
                    <View style={headerStyles.badgeContainer}>
                        <Image
                            source={badge}
                        />
                        <Text style={headerStyles.iconText}>2</Text>
                    </View>
                </View>
                {/* Notification Icon: Added TouchableOpacity for navigation */}
                <TouchableOpacity 
                    style={headerStyles.notificationIcon}
                    onPress={() => navigation.navigate('Notifications')}
                >
                    <View style={headerStyles.notificationContainer}>
                        <Image
                            source={notification}
                            style={headerStyles.notificationIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const headerStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: 393,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    headerLabel: {
        marginLeft: 7,
        marginRight: 12
    },
    userName: {
        fontFamily: 'Acme',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        color: '#101828',
    },
    userStatus: {
        fontFamily: 'Acme',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 18,
        color: '#475467',
    },
    iconText: {
        fontSize: 12,
        fontWeight: '500',
    },
    notificationIcon: {
        alignItems: 'center',
        marginLeft: '8%',
        flexDirection: 'row',
        width: 38,
        height: 35
    },
    notificationContainer: {
        alignItems: 'center',
    },
    rewardIcon: {
        alignItems: 'center',
        marginLeft: '8%',
        flexDirection: 'row',
        width: 34,
        height: 34
    },
    rewardContainer: {
        alignItems: 'center',
    },
    badgeIcon: {
        alignItems: 'center',
        marginLeft: '8%',
        flexDirection: 'row',
        width: 36,
        height: 35
    },
    badgeContainer: {
        alignItems: 'center',
    }
});
