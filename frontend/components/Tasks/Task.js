// App.js
import React, { useState, useEffect } from "react";
import {ScrollView, View, StyleSheet } from "react-native";
import { initDatabase, insertInitialTasks, getTasks } from "../database";
import { TaskList } from "./TaskList";
import { Header } from '../Header';
import { NavigationBar } from '../Navbar';
import { TabBar } from './TabBar';

const rewardImages = {
  bluereward: require('../../assets/images/bluereward.png'),
  yellowreward: require('../../assets/images/yellowreward.png'),
  redreward: require('../../assets/images/redreward.png'),
  multireward: require('../../assets/images/multireward.png'),
  redclock: require('../../assets/images/redclock.png'),
  submitted: require('../../assets/images/submitted.png'),
};

export const Task = () => {
  const [kickoffTasks, setKickoffTasks] = useState([]);
  const [inMotionTasks, setInMotionTasks] = useState([]);
  const [victoryLapTasks, setVictoryLapTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('kickoff');

  useEffect(() => {
    // Initialize database and load initial data
    initDatabase();
    insertInitialTasks();
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const kickoff = await getTasks('kickoff');
    const inMotion = await getTasks('inmotion');
    const victoryLap = await getTasks('victorylap');
    
    setKickoffTasks(kickoff);
    setInMotionTasks(inMotion);
    setVictoryLapTasks(victoryLap);
  };

  return (
    <>
      <Header />
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