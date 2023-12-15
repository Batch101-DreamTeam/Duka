import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AcceuilScreen from "./screens/AcceuilScreen.js";
import FavorisScreen from "./screens/FavorisScreen.js";
import VendreScreen from "./screens/VendreScreen.js";
import MessageScreen from "./screens/MessageScreen.js";
import ProfilScreen from "./screens/ProfilScreen.js";
import Photo from "./components/Photo.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// navigation.goBack() (pour le retour en arriere (stack) pour le bouton dans le header)
// redirection automatique si utilisateur non connecté:  return <Redirect to="/Message" />

// reducer
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from './reducers/user.js';

const persistConfig = {
  key: 'duka',
  storage: AsyncStorage,
};

const reducers = combineReducers({ user });
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
const persistor = persistStore(store)

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Acceuil') {
          iconName = 'home';
        } else if (route.name === 'Favoris') {
          iconName = 'heart';
        }
        else if (route.name === 'Vendre') {
          iconName = 'plus';
        }
        else if (route.name === 'Message') {
          iconName = 'envelope';
        }
        else if (route.name === 'Profil') {
          iconName = 'user';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Acceuil" component={AcceuilScreen} />
      <Tab.Screen name="Favoris" component={FavorisScreen} />
      <Tab.Screen name="Vendre" component={VendreScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />

    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Photo" component={Photo} />
            <Stack.Screen name="VendreScreen" component={VendreScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}