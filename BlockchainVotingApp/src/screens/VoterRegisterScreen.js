import { View, TextInput, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import PrimaryButton from '../Components/PrimaryButton';
import { useState } from 'react';
import { registerVoter } from '../services/api';

export default function VoterRegisterScreen({navigation}) {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1
      },
      (res) => {
        if (res.didCancel) return;

        if (res.errorCode) {
          Alert.alert('Error', res.errorMessage || 'Image picker error');
          return;
        }

        if (res.assets && res.assets.length > 0) {
          setImage(res.assets[0]);
        }
      }
    );
  };

  const register = async () => {
  if (!name || !roll || !image) {
    Alert.alert('Error', 'All fields are required');
    return;
  }

  try {
    const res = await registerVoter(name, roll, image);

    Alert.alert('Success', res.message);

    navigation.navigate('VoterDashboard');
  } catch (err) {
    Alert.alert(
      'Registration Failed',
      err.response?.data?.error || 'Server error'
    );
  }
};


  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Roll No"
        value={roll}
        onChangeText={setRoll}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ height: 150, marginBottom: 10 }}
        />
      )}

      <PrimaryButton title="Pick Face Image" onPress={pickImage} />
      <PrimaryButton title="Register" onPress={register} />
    </View>
  );
}
