import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Modal, Alert, Pressable, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, updateToken, updateMail } from '../reducers/user'
import { useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { BACKEND_ADDRESS } from "@env"
import Inscription from './Inscription';
import Connection from './Connection';
const backendAddress = BACKEND_ADDRESS;


export default function Connexion() {
    // console.log('ici')


    return (

        <View style={styles.containerConnexion}>


            <View>
                <Text style={styles.h3}>Vous devez d'abord vous connecter pour accéder à ce service</Text>
                <Connection />

                <Inscription />

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    containerConnexion: {
        // flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
    h3: {

        padding: 10,
        backgroundColor: '#FF579F',

        // fontFamily: 'MontserratMedium',
        fontSize: 20,
        color: '#14342B',
    },


});