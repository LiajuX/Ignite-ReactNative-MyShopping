import React, { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';

import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';
import { useFocusEffect } from '@react-navigation/native';

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState('');
  const [photoSelectedInfo, setPhotoSelectedInfo] = useState('');

  async function fetchImages() {
    storage().ref('images').list().then(result => {
      const files: FileProps[] = [];

      result.items.forEach(file => {
        files.push({
          name: file.name,
          path: file.fullPath,
        });
      });

      setPhotos(files);
    });
  }

  useFocusEffect(() => {
    fetchImages();
  });

  async function handleShowImage(path: string) {
    const imageURL = await storage().ref(path).getDownloadURL();

    setPhotoSelected(imageURL);

    const info = await storage().ref(path).getMetadata();

    setPhotoSelectedInfo(`Upload realizado em ${info.timeCreated}`)
  } 

  async function handleDeleteImage(path: string) {
    storage()
      .ref(path)
      .delete()
      .then(() => {
        fetchImages();

        setPhotoSelected('');
        setPhotoSelectedInfo('');
      })
      .catch(error => console.error(error));
  } 

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>{photoSelectedInfo}</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
