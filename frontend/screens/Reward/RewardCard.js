import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import rewardIcon from '../../assets/images/reward.png'
import lock from '../../assets/images/lock.png'

const rewardImages = {
    pizza: require('../../assets/images/pizza.png'),
    coffee: require('../../assets/images/coffee.png'),
    donut: require('../../assets/images/donut.png'),
    chocomuffin: require('../../assets/images/chocomuffin.png'),
    cupcake: require('../../assets/images/cupcake.png'),
    hotdog: require('../../assets/images/hotdog.png'),
};

export const RewardCard = ({ reward, onRedeem, userPoints }) => {
    const [showModal, setShowModal] = useState(false);
    const canRedeem = !reward.redeemed_at && userPoints >= reward.points;
    const isLocked = userPoints < reward.points && !reward.redeemed_at;

    const handleRedeem = () => {
        if (canRedeem) {
            setShowModal(true);
        }
    };

    const confirmRedeem = () => {
        setShowModal(false);
        onRedeem(reward.id);
    };

    return (
        <>
            <TouchableOpacity
                style={[styles.card, !canRedeem && !isLocked && styles.disabledCard]}
                onPress={handleRedeem}
                disabled={!canRedeem || reward.redeemed_at}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.name}>{reward.name}</Text>
                    <Image
                        source={rewardImages[reward.image_url]}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <View style={styles.pointsContainer}>
                            <Image
                                source={rewardIcon}
                                style={styles.diamond}
                            />
                            <Text style={styles.points}>{reward.points}</Text>
                        </View>
                        {reward.redeemed_at && (
                            <Text style={styles.expiry}>
                                {new Date(reward.redeemed_at).toLocaleDateString()}
                            </Text>
                        )}
                        {!reward.redeemed_at && reward.expiry_date && (
                            <Text style={styles.expiry}>
                                Expires {new Date(reward.expiry_date).toLocaleDateString()}
                            </Text>
                        )}
                    </View>
                    {isLocked && (
                        <View style={styles.lockedOverlay}>
                            <Image
                                source={lock}
                                style={styles.lockIcon}
                            />
                        </View>
                    )}
                    {reward.redeemed_at ? (
                        <View style={styles.redeemedBadge}>
                            <Text style={styles.redeemedText}>Redeemed</Text>
                        </View>
                    ) : canRedeem && (
                        <TouchableOpacity
                            style={styles.redeemButton}
                            onPress={handleRedeem}
                        >
                            <Text style={styles.redeemButtonText}>Redeem</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Image
                            source={rewardImages[reward.image_url]}
                            style={styles.modalImage}
                        />
                        <Text style={styles.modalText}>
                            Are you sure you want to redeem
                        </Text>
                        <Text style={styles.rewardName}>{reward.name}</Text>
                        <View style={styles.modalPoints}>
                            <Image
                                source={rewardIcon}
                                style={styles.modalDiamond}
                            />
                            <Text style={styles.pointsText}>{reward.points}</Text>
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Maybe Later</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={confirmRedeem}
                            >
                                <Text style={styles.confirmButtonText}>Heck Yeah! </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
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
        justifyContent: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image: {
        width: 55,
        height: 60,
        marginBottom: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        // marginTop: 4,
        marginBottom: 4,
    },
    diamond: {
        width: 20,
        height: 16,
    },
    points: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold'
    },
    expiry: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    lockedOverlay: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
    lockIcon: {
        width: 20,
        height: 20,
    },
    cardContent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textContainer: {
        width: '100%',
        alignItems: 'center',
    },
    disabledCard: {
        opacity: 0.7,
    },
    redeemButton: {
        backgroundColor: '#7a4de8',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 15,
        marginTop: 10,
    },
    redeemButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500',
    },
    redeemedBadge: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
    },
    redeemedText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        width: '80%',
        elevation: 5,
    },
    modalImage: {
        width: 70,
        height: 75,
        marginBottom: 16,
    },
    modalText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    rewardName: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 8,
    },
    modalPoints: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 14,
        backgroundColor: '#f0ebff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    modalDiamond: {
        width: 26,
        height: 18,
    },
    pointsText: {
        fontSize: 15,
        fontWeight: '600',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 16,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
        minWidth: 120,
    },
    cancelButton: {
        backgroundColor: '#f0ebff',
    },
    confirmButton: {
        backgroundColor: '#7a4de8',
    },
    cancelButtonText: {
        color: '#7a4de8',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
}); 