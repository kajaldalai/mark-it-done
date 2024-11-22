import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import avatar from '../assets/images/avatar.png';
import reward from '../assets/images/reward.png';
import badge from '../assets/images/badge.png';
import notification from '../assets/images/notification.png';

export const Header = () => {
    return (
        <View style={headerStyles.container}>
            <View style={headerStyles.content}>
                <Image
                    source={avatar}
                    style={headerStyles.avatar}
                />
                <View style={headerStyles.headerLabel}>
                    <Text style={headerStyles.userName}>John</Text>
                    <Text style={headerStyles.userStatus}>Morning!</Text>
                </View>
                <View style={headerStyles.icons}>
                    <View style={headerStyles.iconContainer}>
                        <Image
                            source={reward}
                            style={headerStyles.icon}
                        />
                        <Text style={headerStyles.iconText}>4500</Text>
                    </View>
                </View>
                <View style={headerStyles.icons}>

                    <View style={headerStyles.iconContainer}>
                        <Image
                            source={badge}
                            style={headerStyles.icon}
                        />
                        <Text style={headerStyles.iconText}>2</Text>
                    </View>
                </View>
                <View style={headerStyles.icons}>
                    <View style={headerStyles.iconContainer}>
                        <Image
                            source={notification}
                            style={headerStyles.icon}
                        />
                    </View>
                </View>
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
        marginLeft: 5,
    },
    userName: {
        fontFamily: 'Acme',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        color: '#101828',
    },
    userStatus: {
        fontFamily: 'Acme',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#475467',
    },
    icons: {
        alignItems: 'center',
        marginLeft: '10%',
        flexDirection: 'row',
    },
    iconContainer: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
    },
    // notificationBadge: {
    //     position: 'absolute',
    //     top: -5,
    //     right: -10,
    //     backgroundColor: 'red',
    //     borderRadius: 10,
    //     width: 20,
    //     height: 20,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // notificationText: {
    //     color: 'white',
    //     fontSize: 10,
    // },
});