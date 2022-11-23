import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Alert,
  Platform
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as FileSystem from 'expo-file-system';
import { Feather as Icon, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import simpleApi from '../../services/simpleApi';
import { extractBase64 } from '../../utilities/utils';

interface Params {
  reportId: number;
}

interface Data {
  problemType: string;
  description: string;
  createdAt: string;
  photo: string;
  audio: string;
  category: string;
}

const ReportDetails = (): JSX.Element => {
  const [data, setData] = useState<Data>({} as Data);
  const [userToken, setUserToken] = useState<string>('');
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [soundStatus, setSoundStatus] = useState<AVPlaybackStatus | null>(null);
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    const getUserToken = async () => {
      const token = await AsyncStorage.getItem('@userToken');
      setUserToken(token || '');
    };
    getUserToken();
  }, []);

  useEffect(() => {
    simpleApi
      .get(`/v1/reports/${routeParams.reportId}`, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      })
      .then(response => {
        setData(response.data);
      })
      .catch((e) => {
        Alert.alert('Erro!', 'Não foi possível carregar as informações da ocorrência');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParams.reportId]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  async function playStopSound() {
    if (currentSound) {
      stopSound('audio.mp3');
    } else {
      playSound('audio.mp3', data.audio);
    }
  }

  async function playSound(filename: string, source: string) {
    try {
      const uri = `${FileSystem.documentDirectory}${filename}`;
      const media = await FileSystem.getInfoAsync(uri);
      
      if (media.exists) await FileSystem.deleteAsync(uri);
      
      source = extractBase64(source);

      await FileSystem.writeAsStringAsync(uri, source, { encoding: FileSystem.EncodingType.Base64 });
      const { sound } = await Audio.Sound.createAsync({ uri });
      
      setCurrentSound(sound);
      await sound.playAsync();

    } catch (e) {
      Alert.alert('Erro!', 'Não foi possível reproduzir o áudio');
    }
  }

  async function stopSound(filename: string) {
    if (currentSound) {
      const uri = `${FileSystem.documentDirectory}${filename}`;

      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      await FileSystem.deleteAsync(uri);
      setCurrentSound(null);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleNavigateBack()}>
            <Icon 
              name="arrow-left" 
              size={20} 
              color="#FFF" 
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ padding: 15 }}>
            <Text style={styles.pointName}>
              {data.problemType}
            </Text>

            {data.photo && (
              <Image 
                style={styles.pointImage} 
                source={{ uri: data.photo }} 
              />
            )}

            {data.audio && (
              <View style={styles.audioControls}>
                <TouchableOpacity onPress={playStopSound}>
                  <Ionicons 
                    size={75} 
                    name={currentSound 
                      ? 'ios-pause-circle' 
                      : 'ios-play-circle'
                    }
                    color="#32bb69"
                  />
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.pointDescription}>
              {data.description}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    backgroundColor: '#32bb69',
    height: 65,
    width: '100%',
    marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
    paddingTop: 20,
    paddingLeft: 10,
  },

  pointImage: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 15,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    marginTop: 24,
    textTransform: 'uppercase',
  },

  pointDescription: {
    color: '#322153',
    fontSize: 28,
    marginTop: 24,
    textTransform: 'capitalize',
  },

  audioControls: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default ReportDetails;
