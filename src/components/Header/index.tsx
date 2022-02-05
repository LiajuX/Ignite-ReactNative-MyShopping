import React from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import auth from '@react-native-firebase/auth';

import { ButtonIcon } from '../ButtonIcon';

import { Container, Title } from './styles';

type Props = {
  title: string;
  showLogoutButton?: boolean;
}

const statusBarHeight = getStatusBarHeight(); 

export function Header({ title, showLogoutButton = false }: Props) {
  function handleLogout() {
    auth().signOut();
  }

  return (
    <Container showLogoutButton={showLogoutButton}>
      <Title>
        {title}
      </Title>

      {
        showLogoutButton &&
        <ButtonIcon
          icon="logout"
          color="alert"
          style={{ marginTop: statusBarHeight }}
          onPress={handleLogout}
        />
      }
    </Container>
  );
}
