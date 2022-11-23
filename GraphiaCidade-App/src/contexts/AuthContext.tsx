import React, { useReducer, useMemo, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { encodeBase64 } from '../utilities/utils'
import sessionApi from '../services/sessionApi';

const initialState = {
  isLoading: true,
  isSignout: false,
  firstRun: false,
  loggedIn: false,
  name: null,
  email: null,
  address: null,
};

const initialContext = [{ ...initialState }, () => {}];

export const AuthContext = createContext(initialContext);

const reducerAuth = (prevState: any, action: any) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        loggedIn: true,
        firstName: action.username,
        email: action.email,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        loggedIn: false,
        firstName: null,
        email: null,
        photoUrl: null,
      };
    default:
      throw new Error('INVALID_ACTION');
  }
};

export function AuthController({ children }: any) {
  const [state, dispatch] = useReducer(reducerAuth, initialState);
  const actions = useMemo(
    () => ({
      signIn: async ({ email, password }: any) => {
        const response = await sessionApi.get('/v1/login/signin', {
          headers:{
            authorization:`Basic ${encodeBase64(`${email}:${password}`)}`
          }
        });
        await AsyncStorage.setItem(
          '@userToken',
          response.data.jwtToken,
        );
        dispatch({ ...response.data , type: 'SIGN_IN'});
      },
      signOut: async () => {
        const token = await AsyncStorage.getItem('@userToken');
        console.log(token);
        await AsyncStorage.removeItem('@userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      revalidateToken: async (jwt: any) => {
        try {
          if (!jwt) throw new Error('Invalid jwt');
          const response = await sessionApi.post('/auth/validation', { jwt });
          await AsyncStorage.setItem('@userToken', response.data.jwt);
          dispatch({ type: 'SIGN_IN', ...response.data });
        } catch (error) {
          dispatch({ type: 'SIGN_OUT' });
        }
      },
      updateUserData: (userData: any) => {
        dispatch({ type: 'UPDATE_USER_DATA', ...userData });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{ actions, state }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
