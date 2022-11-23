import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import simpleApi from '../../services/simpleApi';

interface Item {
  id: number;
  problemType: string;
  photo?: string;
}

interface Report {
  problemType: string;
  description: string;
  icon: string;
  id: number;
  latitude: string;
  longitude: string;
}

const Map = () => {
  const [items] = useState<Item[]>([]);
  const [points, setPoints] = useState<Report[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loadingPosition, setLoadingPosition] = useState<boolean>(false);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const navigation = useNavigation();
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
      setLoadingPosition(true);
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ooops...',
          'Precisamos de sua permissão para obter a localização.',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
      setLoadingPosition(false);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    const getAllReports = async () => {
      try {
        const response = await simpleApi.get(`/v1/my-reports`, {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        });
        setPoints(response.data);
      } catch (error) {
        Alert.alert('Erro!', 'Não foi possível obter ocorrências registradas');
      }
    };

    getAllReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleSelectItem(id: number) {
    const alreadSelected = selectedItems.findIndex(item => item === id);

    if (alreadSelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleNavigateBack()}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Ocorrências</Text>
        <Text style={styles.description}>
          Ocorrências próximas à você aparecerão aqui.
        </Text>

        {loadingPosition && (
          <ActivityIndicator
            size="large"
            color="#32bb69"
            style={{ marginTop: 5 }}
          />
        )}

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              <Marker
                style={styles.mapMarker}
                coordinate={{
                  latitude: initialPosition[0],
                  longitude: initialPosition[1],
                }}
              >
                <View style={styles.mapMarkerContainerEu}>
                  {/* <Image
                    style={styles.mapMarkerImage}
                    source={{
                      uri: photoUrl,
                    }}
                  /> */}
                  <Text style={styles.mapMarkerTitle}>Eu</Text>
                </View>
              </Marker>
              {points.map(point => (
                <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  onPress={
                    () =>
                      navigation.navigate('ReportDetails', {
                        reportId: point.id,
                      })

                    /* {
                    console.log(point.description)
                    console.log(point.id)
                  } */
                  }
                  coordinate={{
                    latitude: Number(point.latitude),
                    longitude: Number(point.longitude),
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    {/* <Image
                      style={styles.mapMarkerReportImage}
                      source={{ uri: point.icon }}
                    /> */}
                    <Text style={styles.mapMarkerTitle}>
                      {point.problemType}
                    </Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map(item => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {},
              ]}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <Icon size={20} name="anchor" />
              <Text style={styles.itemTitle}>{item.problemType}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainerEu: {
    width: 50,
    height: 50,
    backgroundColor: '#4169E1',
    flexDirection: 'column',
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#DC143C',
    flexDirection: 'column',
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerReportImage: {
    marginTop: 10,
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },

  mapMarkerTitle: {
    flex: 1,
    color: '#FFF',
    fontSize: 12,
    lineHeight: 23,
    textAlignVertical: 'center',
    textAlign: 'center',
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Map;
