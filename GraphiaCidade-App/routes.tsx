import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, Feather } from '@expo/vector-icons';

import DrawerContent from './drawerContent/drawerContent';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Report from './src/screens/Report';
import Map from './src/screens/Map';
import ReportDetails from './src/screens/ReportDetails';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { backgroundColor: '#32BB69', borderTopWidth: 0, height: 90 },
        activeTintColor: 'black',
        inactiveTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={32}
              color={focused ? 'black' : 'white'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProblemScreen"
        component={Report}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 100,
                height: 80,
                width: 80,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather
                name="alert-triangle"
                size={32}
                color={focused ? 'black' : 'white'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={Map}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="map-pin"
              size={32}
              color={focused ? 'black' : 'white'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={MainTabScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name="ReportDetails"
        component={ReportDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default (): JSX.Element => (
  <Drawer.Navigator
    drawerStyle={{ marginTop: 0 }}
    drawerContent={props => <DrawerContent {...props} />}
  >
    <Drawer.Screen
      name="Home"
      component={StackScreen}
      options={{ headerShown: false }}
    />
  </Drawer.Navigator>
);
