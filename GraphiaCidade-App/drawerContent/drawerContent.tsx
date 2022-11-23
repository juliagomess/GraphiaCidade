import React, { useContext,useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Alert, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import PropTypes from 'prop-types';

import { AuthContext } from '../src/contexts/AuthContext';
import {
  Container,
  LogoutText,
  LogoutArea,
  AvatarContainer,
  WelcomeText,
  MyTicketsArea,
  PoliticsArea,
} from './styles';

const CustomDrawerContent: React.FC = ({ navigation }: any) => {

  const [loading, setLoading] = useState<boolean>(false);

  const {
    actions: { signOut },
    state: { firstName, photoUrl },
  } = useContext(AuthContext);

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOut();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro!', 'Algo inesperado aconteceu');
    } finally {
      setLoading(false);
    }
  }

  const logoutConfirmation = () => {
    navigation.closeDrawer();
    Alert.alert(
      'ToAqui',
      'Deseja realmente sair?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => handleSignOut(),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <Container>
      <DrawerContentScrollView>
        <AvatarContainer>
          <WelcomeText>Olá, {firstName} ;)</WelcomeText>
        </AvatarContainer>

        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <MyTicketsArea>
            <LogoutText>Meus relatos</LogoutText>
          </MyTicketsArea>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity onPress={() => logoutConfirmation()}>
          <PoliticsArea>
            <LogoutText>Política de privacidade</LogoutText>
          </PoliticsArea>
        </TouchableOpacity>

        <Divider />

        <TouchableOpacity onPress={() => logoutConfirmation()}>
          <LogoutArea>
            <LogoutText>Sair</LogoutText>
          </LogoutArea>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </Container>
  );
};

CustomDrawerContent.propTypes = {
  navigation: PropTypes.shape({
    closeDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default CustomDrawerContent;
