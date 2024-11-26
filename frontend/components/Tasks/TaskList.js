import React, { useState } from 'react';
import { View, Text, Animated, Image } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { TaskCard } from './TaskCard';
import { updateTaskStatus } from '../database';
import { isWithinDays } from '../utils/date';

export const TaskList = ({ 
  tasks, 
  rewardImages, 
  onRefresh, 
  allowLeftSwipe,
  allowRightSwipe,
  nextStatus,
  previousStatus 
}) => {
  const [userPoints, setUserPoints] = useState(0);

  const handleSwipeLeft = async (taskId) => {
    if (allowLeftSwipe && nextStatus) {
      await updateTaskStatus(taskId, nextStatus);
      onRefresh();
    }
  };

  const handleSwipeRight = async (taskId) => {
    if (allowRightSwipe && previousStatus) {
      await updateTaskStatus(taskId, previousStatus);
      onRefresh();
    }
  };

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <View style={styles.swipeActionContainer}>
        <Animated.Text
          style={[
            styles.swipeActionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          Move to {nextStatus === 'inmotion' ? 'In Motion' : 'Victory Lap'}
        </Animated.Text>
      </View>
    );
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-101, -100, -50, 0],
      outputRange: [1, 0, 0, -20],
    });

    return (
      <View style={[styles.swipeActionContainer, styles.rightAction]}>
        <Animated.Text
          style={[
            styles.swipeActionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          Move to {previousStatus === 'kickoff' ? 'Kick off' : 'In Motion'}
        </Animated.Text>
      </View>
    );
  };

  return (
    <>
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks in this category</Text>
        </View>
      ) : (
        tasks.map((task) => (
          <Swipeable
            key={task.id}
            renderLeftActions={allowLeftSwipe ? renderLeftActions : null}
            renderRightActions={allowRightSwipe ? renderRightActions : null}
            onSwipeableLeftOpen={() => handleSwipeLeft(task.id)}
            onSwipeableRightOpen={() => handleSwipeRight(task.id)}
            overshootLeft={false}
            overshootRight={false}
          >
            <TaskCard
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              points={task.points}
              rewardIcon={rewardImages[task.rewardIcon]}
              status={task.status}
              submitted_date={task.submitted_date}
            />
          </Swipeable>
        ))
      )}
    </>
  );
};

const styles = {
  swipeActionContainer: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  rightAction: {
    backgroundColor: '#2196F3',
  },
  swipeActionText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 10,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic',
  },
}; 