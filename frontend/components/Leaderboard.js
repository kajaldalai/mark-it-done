import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { LeaderboardTop } from './LeaderboardTop'
import user4 from '../assets/images/user4.png'
import user5 from '../assets/images/user5.png'
import user6 from '../assets/images/user6.png'
import user7 from '../assets/images/user7.png'
import user8 from '../assets/images/user8.png'
import user9 from '../assets/images/user9.png'
import avatar from '../assets/images/Avatar.png'
import { NavigationBar } from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Leaderboard = () => {
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    const getUserName = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name || '');
      }
    };
    getUserName();
  }, []);

  const users = [
    { rank: 4, name: 'Anvit Patel', score: '7,900', icon: avatar },
    { rank: 5, name: userName, score: '7,700', highlight: true, icon: user5 },
    { rank: 6, name: 'Maggie D', score: '7,500', icon: user6 },
    { rank: 7, name: 'Greg Goerge', score: '7,200', icon: user7 },
    { rank: 8, name: 'Ishaan P', score: '6,800', icon: user8 },
    { rank: 9, name: 'Tian Lee', score: '6,600', icon: user9 },
    { rank: 10, name: 'Ellie M', score: '6,300', icon: user4 },
  ];

  return (
    <>
      <LeaderboardTop />
      <View style={styles.container}>
        <ScrollView style={styles.userList}>
          {users.map((user, index) => (
            <View
              key={index}
              style={[
                styles.userRow,
                user.highlight && styles.highlightedRow,
              ]}
            >
              <Text style={styles.userRank}>{user.rank}</Text>
              <Image source={user.icon} style={styles.avatar} />
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userScore}>{user.score}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <NavigationBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
    marginVertical: 20,
  },
  topUsers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#744be5',
    paddingVertical: 20,
    borderRadius: 15,
  },
  topUser: {
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 30,
    // marginBottom: 10,
    // justifyContent: 'center'
  },
  topUserName: {
    fontSize: 14,
    color: '#000',
  },
  topUserScore: {
    fontSize: 12,
    color: '#744be5',
  },
  rankBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rankText: {
    fontSize: 12,
    color: '#000',
  },
  userList: {
    marginTop: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  highlightedRow: {
    backgroundColor: '#e8def8',
  },
  userRank: {
    width: 30,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  userName: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingLeft: 10,
    justifyContent: 'center'
  },
  userScore: {
    fontSize: 16,
    color: '#744be5',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f3edf7',
    paddingVertical: 12,
    borderRadius: 15,
    marginTop: 20,
  },
  navItem: {
    fontSize: 12,
    color: '#1d1b20',
  },
  selectedNavItem: {
    color: '#744be5',
  },
});
