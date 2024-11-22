import {StyleSheet} from 'react-native'
import { View, Text } from 'react-native';

export const TaskCard = ({ title, description, dueDate, points, icon }) => (
  <View style={styles.taskCard}>
    <View style={styles.taskContent}>
      <Text style={styles.taskTitle}>{title}</Text>
      <Text style={styles.taskDescription}>{description}</Text>
      <View style={styles.taskMeta}>
        <Text style={styles.taskDueDate}>🕐 Due on {dueDate}</Text>
      </View>
    </View>
    <View style={styles.pointsBadge}>
      <Text style={styles.pointsValue}>{points}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  taskDueDate: {
    color: '#999',
    fontSize: 12,
  },
  pointsBadge: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  }
})