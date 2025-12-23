import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import VoteConfirmScreen from '../screens/VoteConfirmScreen';
import CandidateScreen from '../screens/CandidateScreen';
import StartScreen from '../screens/StartScreen';
import VoterLoginScreen from '../screens/VoterLoginScreen';
import ResultScreen from '../screens/ResultScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import VoterAuthScreen from '../screens/VoterAuthScreen';
import VoterRegisterScreen from '../screens/VoterRegisterScreen'
import VoterDashboardScreen from '../screens/VoterDashboardScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="VoterLogin" component={VoterLoginScreen} />
        <Stack.Screen name="VoterRegister" component={VoterRegisterScreen} />
        <Stack.Screen name="VoterDashboard" component={VoterDashboardScreen} />
        <Stack.Screen name="CandidateScreen" component={CandidateScreen} />
        <Stack.Screen name="VoteConfirm" component={VoteConfirmScreen} />
        <Stack.Screen name="Results" component={ResultScreen} />
        <Stack.Screen name="VoterAuth" component={VoterAuthScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
