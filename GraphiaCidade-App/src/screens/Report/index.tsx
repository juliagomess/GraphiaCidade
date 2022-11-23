import {
  AsyncStorage,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Overlay } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Location from 'expo-location';
import { formatBase64 } from '../../utilities/utils';

import simpleApi from '../../services/simpleApi';
import {
  Container,
  Header,
  HeaderElements,
  ScreenTitle,
  TitleArea,
} from './styles';

export default function Home(): JSX.Element {
  const [reportDescription, setReportDescription] = useState<string>('');
  const [myProfile, setMyProfile] = useState<string>('');
  const [audio, setAudio] = useState();
  const [audioUri, setAudioUri] = useState<string>('');
  const [photo, setPhoto] = useState<any>();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<any>();

  const [category, setCategory] = useState<any>();
  const [dimension, setDimension] = useState<any>();

  const navigation = useNavigation();
  const barHeight = getStatusBarHeight();
  const [userToken, setUserToken] = useState<string>('');

  useEffect(() => {
    const getUserToken = async () => {
      const token = await AsyncStorage.getItem('@userToken');
      setUserToken(token || '');
    };
    getUserToken();
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Precisamos de sua permissão para obter a localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    /* const askCameraPermission = async () => {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Precisamos de sua permissão para acessar seus arquivos de midia.',
        );
      }
    }; */

    const askLibraryPermission = async () => {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== 'granted' && status !== 'undetermined') {
        Alert.alert(
          'Precisamos de sua permissão para acessar seus arquivos de midia.',
        );
      }
    };

    // askCameraPermission();
    askLibraryPermission();
  }, []);

  const handleSubmit = async () => {
    if (dimension === '') {
      Alert.alert('Erro!', 'Por favor, selecione seu problema.');
      return;
    }
    
    if (myProfile === '') {
      Alert.alert('Erro!', 'Por favor, selecione seu perfil.');
      return;
    }
    
    if (reportDescription === '') {
      Alert.alert('Erro!', 'Por favor, descreva seu problema.');
      return;
    }

    try {
      setIsSubmiting(true);
      
      let audio = null;
      
      if (audioUri !== '') {
        const options = { encoding: FileSystem.EncodingType.Base64 };
        audio = await FileSystem.readAsStringAsync(audioUri, options);
      }

      const form = {
        problemType: dimension,
        description: reportDescription,
        category: category,
        profileType: myProfile,
        createdAt: new Date(),
        photo: (photo && photo.base64 && formatBase64(photo.base64, 'image/png')) || null,
        audio: (audio && formatBase64(audio, 'audio/mp3')) || null,
        longitude: initialPosition[0],
        latitude: initialPosition[1],
      };

      console.log(form)

      const response = await simpleApi.post('/v1/reports', form, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });

      console.log(response)
      Alert.alert('Sucesso!', 'Seu relato foi enviado com sucesso!');
      cleanForm();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o seu relato, tente novamente.');
    }
  };

  const cleanForm = () => {
    setMyProfile('');
    setDimension('');
    setReportDescription('');
    setCategory('');
    setIsSubmiting(false);
    setAudioUri('');
    setPhoto(null);
  };

  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });
    setPhoto(result);
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });

    setPhoto(result);
  };

  const getCategories = async () => {
    const { data } = await simpleApi.get('/v1/category', {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    });
    setCategories(data.map(o => ({ label: o.categoryName, id: o.id, key: o.id })));
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getDimensions = async () => {
      if (categoryId) {
        const { data } = await simpleApi.get(`/v1/category/${categoryId}`);
        setDimensions(data.subCategories.map(o => ({ label: o, id: o, key: o })));
      }
    };
    getDimensions();
  }, [categoryId]);

  useEffect(() => {
    const getProfiles = async () => {
      const { data } = await simpleApi.get('/v1/profile', {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
      setProfiles(data.map(o => ({ label: o.profileName, id: o.id, key: o.id })));
    };
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await recording.startAsync();
      setAudio(recording);
    } catch (err) {
      Alert.alert('Erro!', 'Não foi possível gravar áudio');
    }
  }

  async function stopRecording() {
    setAudio(undefined);
    await audio.stopAndUnloadAsync();
    const uri = audio.getURI();
    setAudioUri(uri);
  }

  return (
    <Container>
      <StatusBar style="dark" />

      <Header style={Platform.OS === 'android' && { marginTop: barHeight }}>
        <HeaderElements>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="reorder-four-outline" size={32} color="white" />
          </TouchableOpacity>
        </HeaderElements>
      </Header>

      <ScrollView>
        <TitleArea>
          <ScreenTitle>Relatar Problema</ScreenTitle>
        </TitleArea>

        <View style={{ width: '95%', marginLeft: 10 }}>
          <ModalSelector
            key={categories.label}
            data={categories}
            initValue="Selecione uma categoria..."
            onChange={option => {
              if (option.key) {
                setCategoryId(option.key);
                setCategory(option.label);
              }
            }}
            selectedKey={categoryId}
            cancelText="Cancelar"
          />
          <View style={{ marginBottom: 10 }} />
          {dimensions.length !== 0 && (
            <ModalSelector
              data={dimensions}
              initValue="Selecione um problema..."
              onChange={option => {
                if (option.key) {
                  setDimension(option.label);
                }
              }}
              selectedKey={dimension}
              cancelText="Cancelar"
            />
          )}

          <View style={{ marginBottom: 10 }} />
          <ModalSelector
            data={profiles}
            initValue="Selecione um perfil..."
            onChange={option => {
              if (option.key) {
                setMyProfile(option.label);
              }
            }}
            selectedKey={myProfile}
            cancelText="Cancelar"
          />
          <View style={{ marginTop: 20 }}>
            <TextInput
              multiline
              editable
              placeholder="Descreva seu problema"
              numberOfLines={6}
              style={{
                borderColor: '#666',
                height: 200,
                width: '95%',
                borderWidth: 0.5,
                borderRadius: 6,
                marginLeft: 10,
              }}
              placeholderTextColor="#444"
              onChangeText={text => setReportDescription(text)}
              defaultValue={reportDescription}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              title="Adicionar foto"
              buttonStyle={{
                backgroundColor: '#32BB69',
                width: '80%',
                alignSelf: 'center',
              }}
              onPress={() => setIsVisible(true)}
            />
            <Button
              title={audio ? 'Parar de gravar' : 'Gravar áudio'}
              buttonStyle={{
                backgroundColor: '#32BB69',
                width: '80%',
                alignSelf: 'center',
              }}
              onPress={audio ? stopRecording : startRecording}
            />
          </View>
          {photo && (
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <Image
                style={{ height: 80, width: 80, marginLeft: 7 }}
                source={{ uri: `data:image/jpeg;base64,${photo.base64}` }}
              />
            </View>
          )}
          <View
            style={{
              marginTop: 70,
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 25,
            }}
          >
            <Button
              title="Enviar"
              buttonStyle={{
                backgroundColor: '#32BB69',
                width: '100%',
              }}
              onPress={() => handleSubmit()}
              loading={!!isSubmiting}
              disabled={!!isSubmiting}
            />
          </View>
        </View>
        <Overlay
          overlayStyle={{ height: 140, width: 240, alignItems: 'center' }}
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
        >
          <>
            <Text>Como deseja escolher a Imagem?</Text>

            <Button
              title="Tirar foto"
              titleStyle={{ alignSelf: 'center' }}
              buttonStyle={{
                backgroundColor: '#32BB69',
                width: 200,
              }}
              onPress={() => openCamera()}
            />

            <Button
              title="Escolher da galeria"
              titleStyle={{ alignSelf: 'center' }}
              buttonStyle={{
                backgroundColor: '#32BB69',
                width: 200,
                marginTop: 15,
              }}
              onPress={() => pickImageFromLibrary()}
            />
          </>
        </Overlay>
      </ScrollView>
    </Container>
  );
}
