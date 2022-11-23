import './src/config/ReactotronConfig';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthController } from './src/contexts/AuthContext';
import Routes from './routes';

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <AuthController>
        <Routes />
      </AuthController>
    </NavigationContainer>
  );
}
