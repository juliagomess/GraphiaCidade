import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import {
  Container,
  Header,
  HeaderElements,
  ScreenTitle,
  TitleArea,
  ReportTitle,
  AllReportsArea,
  ReportView,
  ReportDescription,
  EmptyReportsText,
} from './styles';
import { IReport } from '../../core/interfaces/Reports';
import simpleApi from '../../services/simpleApi';

export default function Home(): JSX.Element {
  const [reports, setReports] = useState<IReport[]>([]);
  const [userToken, setUserToken] = useState<string>('');
  const [loadingReports, setLoadingReports] = useState<boolean>(false);

  const navigation = useNavigation();
  const barHeight = getStatusBarHeight();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getUserToken = async () => {
      const token = await AsyncStorage.getItem('@userToken');
      setUserToken(token || '');
    };
    getUserToken();
  }, []);

  useEffect(() => {
    const loadReports = async () => {
      if (userToken) {
        setLoadingReports(true);
        const { data } = await simpleApi.get('/v1/my-reports', {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        });
        setReports(data);
        setLoadingReports(false);
      }
    };

    loadReports();
  }, [isFocused, userToken]);

  const renderMyReports = ({ item }: { item: IReport }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ReportDetails', {
              reportId: item.id,
            })}
        >
          <ReportView>
            <ReportTitle style={{ textTransform: 'uppercase' }}>
              {item.problemType}
            </ReportTitle>
            <View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image
                  source={{ uri: item.icon }}
                  resizeMode="contain"
                  style={{
                    width: 70,
                    height: 85,
                    marginTop: 5,
                    marginBottom: 3,
                    marginLeft: 10,
                  }}
                />
              </View>
              <View>
                <ReportDescription style={{ textTransform: 'capitalize' }}>
                  {item.description}
                </ReportDescription>
              </View>
            </View>
          </ReportView>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container>
      <StatusBar style="dark" />

      <Header
        style={
          Platform.OS === 'android' ? { marginTop: barHeight } : { height: 100 }
        }
      >
        <HeaderElements>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="reorder-four-outline" size={32} color="white" />
          </TouchableOpacity>
        </HeaderElements>
      </Header>

      <TitleArea>
        <ScreenTitle>Meus chamados</ScreenTitle>
      </TitleArea>

      <AllReportsArea>
        <FlatList
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={reports}
          renderItem={renderMyReports}
          ListEmptyComponent={
            loadingReports ? (
              <ActivityIndicator size="large" color="#32bb69" />
            ) : (
              <EmptyReportsText>
                Nenhum chamado encontrado, crie um clicando no botão vermelho
                abaixo
              </EmptyReportsText>
            )
          }
        />
      </AllReportsArea>
    </Container>
  );
}
