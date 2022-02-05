import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Usuário criado com sucesso!')

        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.log(error.code)
      
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('E-mail já está em uso!', 'Escolha outro e-mail para cadastrar.');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('E-mail inválido!');
        }        

        if (error.code === 'auth/weak-password') {
          Alert.alert('Senha inválida!', 'A senha deve ter no mínimo 6 dígitos.');
        } 
      }); 
  }

  function handleSignInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch(error => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          Alert.alert('Usuário não encontrado!', 'E-mail e/ou senha inválida.');
        }
      });
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Redefinir senha', 'Enviamos um link no seu e-mail para você redefinir sua senha.'));
  } 

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        value={email}
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Input
        value={password}
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText 
          title="Recuperar senha" 
          onPress={handleForgotPassword} 
        />

        <ButtonText 
          title="Criar minha conta" 
          onPress={handleCreateUserAccount} 
        />
      </Account>
    </Container>
  );
}