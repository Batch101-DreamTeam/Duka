import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Modal, Pressable, Image, Alert, ImageBackground } from 'react-native';
import Header from '../components/Header';
import React, { useState, useEffect, useRef } from 'react';

import { BACKEND_ADDRESS } from "@env"
const backendAddress = BACKEND_ADDRESS;

export default function MesVentes({ navigation }) {



    return (
        <View style={styles.container}>

            <Header />
            <Text>Couous</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',

    }
})