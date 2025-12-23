import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';

export default function CandidateCard({ candidate, onVote }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{candidate.name}</Text>
      <Text style={styles.party}>{candidate.party}</Text>

      <PrimaryButton title="Vote" onPress={onVote} />
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    backgroundColor:'#fff',
    padding:20,
    borderRadius:15,
    marginVertical:10,
    elevation:3
  },
  name:{
    fontSize:18,
    fontWeight:'600'
  },
  party:{
    color:'#666',
    marginBottom:10
  }
});
