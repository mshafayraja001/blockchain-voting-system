import axios from 'axios';

const BASE_URL = 'http://192.168.100.112:5000/api';

export const registerVoter = async (name, roll, image) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('roll', roll);
  formData.append('image', {
    uri: image.uri,
    name: image.fileName || 'face.jpg',
    type: image.type || 'image/jpeg',
  });

  const res = await axios.post(
    `${BASE_URL}/voter/register`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return res.data;
};
