import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../Components/PrimaryButton';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blockchain Voting System</Text>

      <PrimaryButton
        title="Voter"
        onPress={() => navigation.navigate("VoterAuth")}
      />

      <PrimaryButton
        title="Admin"
        onPress={() => navigation.navigate("AdminLogin")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', padding:20 },
  title:{ fontSize:24, textAlign:'center', marginBottom:30 }
});
