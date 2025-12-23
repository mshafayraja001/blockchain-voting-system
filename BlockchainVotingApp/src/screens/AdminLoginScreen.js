import { View, Text, TextInput, Button } from 'react-native';

export default function AdminLoginScreen({ navigation }) {
  return (
    <View style={{ padding:20, marginTop:100 }}>
      <Text style={{ fontSize:22 }}>Admin Login</Text>

      <TextInput
        placeholder="Username"
        style={{ borderWidth:1, marginVertical:10, padding:10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth:1, marginVertical:10, padding:10 }}
      />

      <Button
        title="Login"
        onPress={() => navigation.navigate("AdminDashboard")}
      />
    </View>
  );
}
