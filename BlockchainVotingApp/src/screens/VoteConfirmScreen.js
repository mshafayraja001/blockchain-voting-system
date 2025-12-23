import { View, Text, Alert } from 'react-native';
import PrimaryButton from '../Components/PrimaryButton';
import axios from 'axios';

export default function VoteConfirmScreen({ route, navigation }) {
  const { candidate } = route.params;

  const castVote = async () => {
    try {
      const res = await axios.post(
        'http://192.168.100.112:5000/api/vote/cast',
        {
          candidate_id: candidate,
          roll: '123' // later token/session se ayega
        }
      );

      Alert.alert(
        'Success',
        'Vote cast successfully\nTX: ' + res.data.tx_hash
      );

      navigation.replace('VoterDashboard');

    } catch (e) {
      console.log(e.response?.data || e.message);
      Alert.alert(
        'Vote Failed',
        e.response?.data?.error || 'Blockchain error'
      );
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Confirm your vote</Text>
      <Text>Candidate: {candidate}</Text>

      <PrimaryButton
        title="Confirm Vote"
        onPress={castVote}
      />
    </View>
  );
}
