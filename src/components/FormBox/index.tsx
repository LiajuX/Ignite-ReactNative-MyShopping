import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { Container } from './styles';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';

export function FormBox() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  async function handleProductAdd() {
    firestore()
    .collection('products')
    .add({
      description,
      quantity,
      done: false,
      createdAt: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {    
      setDescription('');
      setQuantity('');    
    })
    .catch((error) => console.log(error));
  }

  return (
    <Container>
      <Input
        value={description}
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
      />

      <Input
        value={quantity}
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={setQuantity}
      />

      <ButtonIcon
        size='large'
        icon="add-shopping-cart"
        onPress={handleProductAdd}
      />
    </Container>
  );
}
