import { View, TextInput, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import PrimaryButton from '../Components/PrimaryButton';
import { useState } from 'react';
import axios from 'axios';

export default function VoterLoginScreen({ navigation }) {
  const [roll, setRoll] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, res => {
      if (res.assets) setImage(res.assets[0]);
    });
  };

  const login = async () => {
    if (!roll || !image) {
      Alert.alert('Error', 'All fields required');
      return;
    }

    const form = new FormData();
    form.append('roll', roll);
    form.append('image', {
      uri: image.uri,
      name: 'face.jpg',
      type: image.type,
    });

    try {
      const res = await axios.post(
        'http://192.168.100.112:5000/api/voter/login',
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      Alert.alert('Success', res.data.message);
      navigation.replace('VoterDashboard');
    } catch (e) {
      Alert.alert('Login Failed', e.response?.data?.error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Roll No" onChangeText={setRoll} />
      {image && <Image source={{ uri: image.uri }} style={{ height: 150 }} />}
      <PrimaryButton title="Pick Face Image" onPress={pickImage} />
      <PrimaryButton title="Login" onPress={login} />
    </View>
  );
}
