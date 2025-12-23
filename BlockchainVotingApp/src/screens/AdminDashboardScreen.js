import { View, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboardScreen() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const res = await axios.get(
        'http://192.168.100.112:5000/api/admin/results'
      );
      setData(res.data);
    } catch (e) {
      Alert.alert('Error', 'Failed to load results');
    }
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Admin Dashboard</Text>

      <Text>Total Votes: {data.total_votes}</Text>
      <Text>Candidate A Votes: {data.candidate_0}</Text>
      <Text>Candidate B Votes: {data.candidate_1}</Text>
    </View>
  );
}
