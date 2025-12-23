import { TouchableOpacity, Text } from 'react-native';

export default function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#2e86de',
        padding: 12,
        marginVertical: 8,
        borderRadius: 6,
        alignItems: 'center'
      }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
