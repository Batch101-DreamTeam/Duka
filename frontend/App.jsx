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
import OfferScreen from "./components/OfferScreen.js";
import Header from "./components/Header.js";
import Photo from "./components/Photo.js";
import MesVentes from "./screens/MesVentes.js";
import FicheVente from "./components/FicheVente.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// navigation.goBack() (pour le retour en arriere (stack) pour le bouton dans le header)
// redirection automatique si utilisateur non connecté:  return <Redirect to="/Message" />
// idée du dimanche soir:  réduire les fetch inutiles seulement pour les grands évent soit return de useefect(sur screen) soit dé(focused) des screens 
//  = -de routes pas nécéssaires et une appel au back qand besoins le rest c'est  le réducer qui gère. 

// sécurité : guetter que le token ne change pas si il change une route spéciale dans le back vérifi que se soit le bon(useefect) sécurité d'authenticité du token sur chaque routes avant une action;

// lundi 18 : favoris ok à 13h pusher ok à 17


// reducer
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from './reducers/user.js';
import offer from "./reducers/offer.js";

const persistConfig = {
  key: 'duka',
  storage: AsyncStorage,
};

const reducers = combineReducers({ user, offer });
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
const persistor = persistStore(store)

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Main = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="AcceuilScreen" component={AcceuilScreen} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="Photo" component={Photo} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="Header" component={Header} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="VendreScreen" component={VendreScreen} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="MesVentes" component={MesVentes} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="FicheVente" component={FicheVente} screenOptions={{ headerShown: false }} />
      <Stack.Screen name="OfferScreen" component={OfferScreen} screenOptions={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Acceuil' screenOptions={({ route }) => ({
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
      <Tab.Screen name="Acceuil" component={Main} />
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

          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}