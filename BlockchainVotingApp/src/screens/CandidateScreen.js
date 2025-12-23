import { View, Text } from 'react-native';
import PrimaryButton from '../Components/PrimaryButton';

export default function CandidateScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text>CANDIDATE SCREEN LOADED</Text>

      <PrimaryButton
        title="Candidate A"
        onPress={() => navigation.navigate('VoteConfirm', { candidate: 0 })}
      />

      <PrimaryButton
        title="Candidate B"
        onPress={() => navigation.navigate('VoteConfirm', { candidate: 1 })}
      />
    </View>
  );
}
