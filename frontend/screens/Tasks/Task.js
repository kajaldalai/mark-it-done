// App.js
import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { initDatabase, insertInitialTasks, getTasks, getCompletedTasks, getUserPoints } from "../../database";
import { TaskList } from "./TaskList";
import { Header } from '../../components/Header';
import { NavigationBar } from '../../components/Navbar';
import { TabBar } from './TabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rewardImages = {
  bluereward: require('../../assets/images/bluereward.png'),
  yellowreward: require('../../assets/images/yellowreward.png'),
  redreward: require('../../assets/images/redreward.png'),
  multireward: require('../../assets/images/multireward.png'),
  redclock: require('../../assets/images/redclock.png'),
  submitted: require('../../assets/images/submitted.png'),
};

export const Task = ({ route }) => {
  const [kickoffTasks, setKickoffTasks] = useState([]);
  const [inMotionTasks, setInMotionTasks] = useState([]);
  const [victoryLapTasks, setVictoryLapTasks] = useState([]);
  const [activeTab, setActiveTab] = useState(route?.params?.initialTab || 'kickoff');
  const [pointsRefreshTrigger, setPointsRefreshTrigger] = useState(0);
  const [points, setPoints] = React.useState(0);

  useEffect(() => {
    if (route?.params?.initialTab) {
      setActiveTab(route.params.initialTab);
    }
    loadTasks();
  }, [route?.params?.initialTab]);

  const loadTasks = async () => {
    const kickoff = await getTasks('kickoff');
    const inMotion = await getTasks('inmotion');
    const victoryLap = await getCompletedTasks('victorylap');

    // Format dates before setting state
    const formatTasks = (tasks) => tasks.map(task => ({
      ...task,
      dueDate: task.dueDate,
      submitted_date: task.submitted_date
    }));

    setKickoffTasks(formatTasks(kickoff));
    setInMotionTasks(formatTasks(inMotion));
    setVictoryLapTasks(formatTasks(victoryLap));
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user) {
      const points = await getUserPoints(user.id);
      setPoints(points);
    };
  }

  const handleRefresh = async () => {
    const userPoints = await getUserPoints(parsedUser.id);
    // setPoints(userPoints);
    // await loadTasks();
    setPointsRefreshTrigger(userPoints);
  };

  return (
    <>
      <Header refreshTrigger={points} />
      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <ScrollView style={styles.container}>
        <View style={styles.taskList}>
          {activeTab === 'kickoff' && (
            <TaskList
              tasks={kickoffTasks}
              rewardImages={rewardImages}
              onRefresh={loadTasks}
              allowLeftSwipe={true}
              allowRightSwipe={false}
              nextStatus="inmotion"
            />
          )}
          {activeTab === 'inmotion' && (
            <TaskList
              tasks={inMotionTasks}
              rewardImages={rewardImages}
              onRefresh={loadTasks}
              allowLeftSwipe={true}
              allowRightSwipe={true}
              nextStatus="victorylap"
              previousStatus="kickoff"
            />
          )}
          {activeTab === 'victorylap' && (
            <TaskList
              tasks={victoryLapTasks}
              rewardImages={rewardImages}
              onRefresh={loadTasks}
              allowLeftSwipe={false}
              allowRightSwipe={false}
            />
          )}
        </View>
      </ScrollView>
      <NavigationBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  taskList: {
    padding: 20,
  },
});