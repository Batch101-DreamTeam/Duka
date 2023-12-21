import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Modal, Alert, Pressable } from 'react-native';
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


export default function DashboardVendeur(props, { navigation }) {
    console.log('ici', props)
    const user = useSelector((state) => state.user.value);
    const token = user.token


    return (
        <View style={styles.container}>
            <Text>Mes dernières offres de vente</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center'

    },


});