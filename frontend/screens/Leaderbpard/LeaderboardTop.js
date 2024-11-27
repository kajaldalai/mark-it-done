import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import user1 from '../../assets/images/user1.png'
import user2 from '../../assets/images/user2.png'
import user3 from '../../assets/images/user3.png'

export const LeaderboardTop = () => {
  const topUsers = [
    { name: 'Tyla', score: '8,000', rank: 2, icon: user1 },
    { name: 'Angelina', score: '10,000', rank: 1, icon: user2 },
    { name: 'Aaron', score: '7,500', rank: 3, icon: user3 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.topUsers}>
        {topUsers.map((user, index) => (
          <View
            key={index}
            style={[
              styles.topUser,
              index === 1 && styles.centerUser,
            ]}
          >
            <Image source={user.icon} style={styles.avatar} />
            <Text style={styles.topUserName}>{user.name}</Text>
            <Text style={styles.topUserScore}>{user.score}</Text>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{user.rank}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#744be5',
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  topUsers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 20
},
topUser: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    width: 100,
    height: 135,
    marginHorizontal: 5,
  },
  centerUser: {
    height: 150,
    marginTop: -20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },
  topUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  topUserScore: {
    fontSize: 14,
    color: '#744be5',
    fontWeight: '600'
  },
  rankBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#4a4a4a',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rankText: {
    fontSize: 12,
    color: '#fff',
  },
});
