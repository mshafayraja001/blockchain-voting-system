import { View, Text } from 'react-native';

export default function ResultScreen() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:22 }}>Vote Submitted Successfully</Text>
      <Text>Transaction Pending / Confirmed</Text>
    </View>
  );
}
