import React, { useContext, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';

export default function Login(): JSX.Element {
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    actions: { signIn },
  } = useContext(AuthContext);

  async function handleSignIn() {
    setLoading(true);
    try {
      await signIn({
        email,
        password,
      });
      setEmail('');
      setPassword('');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro!', 'Não foi possível efetuar login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cabeçalho}>
          <Text style={styles.textoLogo}>GraphiaCidade</Text>

          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
          />
          <Text style={styles.useLoginText}>Faça seu login abaixo</Text>
          <TextInput
            style={styles.inputEmail}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Seu email"
            value={email}
            onChangeText={text => setEmail(text)}
            ref={inputRef}
          />

          <TextInput
            style={styles.inputPassword}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Sua senha"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            ref={inputRef}
          />
        </View>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#32bb69"
            style={{ marginTop: 5 }}
          />
        )}

        <View style={styles.entrar}>
          <TouchableOpacity style={styles.botaoLogin} onPress={handleSignIn}>
            <View style={styles.btnAreaLogin}>
              <Text style={styles.btnTexto}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  useLoginText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    color: '#FFF',
  },
  cabeçalho: {
    // flex: 1,
    backgroundColor: '#32BB69',
    height: 600,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputEmail: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  inputPassword: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  logo: {
    width: 300,
    height: 300,
  },
  textoLogo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  entrar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoLogin: {
    width: 230,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#32BB69',
    marginTop: 15,
  },
  btnAreaLogin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTexto: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    justifyContent: 'center',
  },
});
