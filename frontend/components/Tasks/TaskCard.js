import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import clock from '../../assets/images/clock.png';
import submitted from '../../assets/images/submitted.png';
import { BlurView } from 'expo-blur';

export const TaskCard = ({ title, description, dueDate, points, rewardIcon, status }) => {
  const timeIcon = status === 'victorylap' ? submitted : clock;

  const renderPointsIcon = () => {
    if (status === 'victorylap') {
      return (
        <Image
          source={rewardIcon}
          style={taskCardStyles.pointsIcon}
        />
      );
    }
    
    return (
      <BlurView intensity={50} style={taskCardStyles.blurContainer}>
        <Image
          source={rewardIcon}
          style={[taskCardStyles.pointsIcon, taskCardStyles.blurredIcon]}
        />
      </BlurView>
    );
  };

  return (
    <View style={taskCardStyles.card}>
      <View style={taskCardStyles.textContainer}>
        <Text style={taskCardStyles.title}>{title}</Text>
        <Text style={taskCardStyles.description}>{description}</Text>
        <View style={taskCardStyles.dueDateContainer}>
          <Image
            source={timeIcon}
            style={taskCardStyles.icon}
          />
          <Text style={taskCardStyles.dueDate}>{dueDate}</Text>
        </View>
      </View>
      <View style={taskCardStyles.pointsContainer}>
        {renderPointsIcon()}
        <Text style={taskCardStyles.points}>{points}</Text>
      </View>
    </View>
  );
};

const taskCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F8F5F8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    fontStyle: 'italic'
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  dueDate: {
    fontSize: 13,
    color: '#7e57c2',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  blurContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  blurredIcon: {
    opacity: 0.3,
  },
  pointsIcon: {
    width: 32,
    height: 32,
  },
  points: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
});