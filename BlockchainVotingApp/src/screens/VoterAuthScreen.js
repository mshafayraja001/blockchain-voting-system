import { View, Text } from 'react-native';
import PrimaryButton from '../Components/PrimaryButton';

export default function VoterAuthScreen({ navigation }) {
  return (
    <View style={{ padding:20 }}>
      <Text style={{ fontSize:22, marginBottom:20 }}>
        Voter Authentication
      </Text>

      <PrimaryButton
        title="Register"
        onPress={() => navigation.navigate("VoterRegister")}
      />

      <PrimaryButton
        title="Login"
        onPress={() => navigation.navigate("VoterLogin")}
      />
    </View>
  );
}
