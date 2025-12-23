import { View, Text } from 'react-native';
import PrimaryButton from '../Components/PrimaryButton';

export default function VoterDashboardScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome Voter</Text>

      <PrimaryButton
        title="Cast Vote"
        onPress={() => {
          console.log('CAST VOTE CLICKED');
          navigation.navigate('CandidateScreen');
        }}
      />
    </View>
  );
}
