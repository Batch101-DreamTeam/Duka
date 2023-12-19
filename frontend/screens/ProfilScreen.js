
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, TextInput, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Inscription from '../components/Inscription';
import React, { useEffect, useState, Dispatch, } from 'react';
import { useSelector } from 'react-redux';


// Import des fichiers de police
import { useFonts } from 'expo-font';
// import MontserratRegular from '../res/fonts/Montserrat-Regular.ttf';
// import MontserratMedium from '../res/fonts/Montserrat-Medium.ttf';

import { BACKEND_ADDRESS } from "@env";
import Connection from '../components/Connection';
import { useFocusEffect } from '@react-navigation/native';
const backendAddress = BACKEND_ADDRESS;





//Créer un nouveau profil
export default function ProfilScreen({ navigation }) {
    const [profileData, setProfileData] = useState({
        username: "",
        contact: "",
        description: "",
        mail: "",
        location: "",
        favorites: "",
        avatar: "",
    });

    //Mettre à jour son profil
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedContact, setUpdatedContact] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [modifyField, setModifyField] = useState(false);
    const user = useSelector((state) => state.user.value);
    const token = user.token;


    useEffect(() => {
        fetch(`${backendAddress}/users/getProfilInfos/${token}`)
            .then(response => response.json())
            .then(profileInfos => {
                // console.log(profileInfos);
                if (profileInfos.result) {
                    setProfileData({
                        username: profileInfos.username,
                        contact: profileInfos.contact,
                        description: profileInfos.description,
                        mail: profileInfos.mail,
                        avatar: profileInfos.avatar,
                        location: profileInfos.location,
                        favorites: profileInfos.favorites,
                    });
                    setUpdatedUsername(profileInfos.username)
                    setUpdatedContact(profileInfos.contact)
                    setUpdatedDescription(profileInfos.description)
                }
            })
            .catch(error => {
                console.error("Error fetching profile information:", error);
                // Handle error gracefully
            });
    }, [token]);

    const updateProfilInfo = () => {
        fetch(`${backendAddress}/users/modifyProfil/${token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: updatedUsername,
                contact: updatedContact,
                description: updatedDescription,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setModifyField(false)
            })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.container}>
                <Header />
                {token ? (
                    <View style={styles.containerContent}>
                        <SafeAreaView style={styles.container}>
                            <ScrollView contentContainerStyle={styles.scrollView}>

                                <Text style={styles.h1}>Mon profil</Text>

                                <View style={styles.userBlock}>
                                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => setModifyField(true)}>
                                        <FontAwesome style={styles.modifyContactSlidePen} name="pencil" size={20} color={'white'} />
                                    </TouchableOpacity>
                                    {!modifyField ? <Text style={styles.name}>Username : {profileData.username}</Text> : <TextInput onChangeText={(value) => setUpdatedUsername(value)} style={styles.textInputUsername} />}
                                    {!modifyField ? <Text style={styles.tel}>Tél. : {profileData.contact}</Text> : <TextInput onChangeText={(value) => setUpdatedContact(value)} style={styles.textInputTel} />}
                                    <Text style={styles.mail}>email :  {profileData.mail}</Text>
                                    <Image source={{ uri: profileData.avatar }} style={styles.pictureProfile} />

                                </View>
                                <Text style={styles.h2}>Description</Text>
                                <View style={styles.descriptionBloc}>
                                    {!modifyField ? <Text style={styles.whiteText}>{profileData.description}</Text> : <TextInput onChangeText={(value) => setUpdatedDescription(value)} style={styles.textInputDescription} />}
                                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => setModifyField(true)}>
                                        <FontAwesome style={styles.modifyPenDescription} name="pencil" size={20} color={'white'} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.h2}>Lieux favoris</Text>
                                <View style={styles.localisationContainer}>
                                    {[1, 2, 3].map((item) => (
                                        <TouchableOpacity activeOpacity={0.8} key={item} style={styles.altBtn}>
                                            <Text style={styles.whiteText}>{profileData.location}</Text>
                                        </TouchableOpacity>
                                    ))}
                                    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                                        <FontAwesome name="plus" style={styles.plusButton} size={20} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.h2}>Offres en cours</Text>
                                <View style={styles.localisationContainer}>
                                    {[1, 2, 3].map((item) => (
                                        <TouchableOpacity activeOpacity={0.8} key={item} style={styles.altBtn}>
                                            <Text style={styles.whiteText}>{profileData.favorites}</Text>
                                        </TouchableOpacity>
                                    )

                                    )}
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => updateProfilInfo()} activeOpacity={0.8} style={styles.btn}>
                                        <Text style={styles.white}>
                                            Enregistrer les modifications
                                        </Text>
                                    </TouchableOpacity >

                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.h3}>Vous devez d'abord vous connecter pour accéder à ce service</Text>
                        <Connection />
                        <Inscription />
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white'

    },

    containerContent: {
        flex: 1,
        backgroundColor: '',
    },

    plusButton: {
        marginLeft: 230,
        color: '#BAB700',
    },

    localisationContainer: {
        flexDirection: 'row',
        backgroundColor: '#60935D',
        width: '98%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    header: {
        height: '100%',
        width: '100%',
        // height: '7%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        marginBottom: 10,
        backgroundColor: '#60935D'
    },
    scrollView: {
        alignItems: 'center',
        paddingBottom: 20,
    },

    userBlock: {
        backgroundColor: '#60935D',
        width: '100%',
        height: '20%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 0,
        // backgroundColor:'red'
    },

    pictureProfile: {
        backgroundColor: 'purple',
        width: 100,
        height: 100,
        borderRadius: 80,
        marginTop: -125,
        // marginBottom: 100,
        // marginRight: 220,
        marginLeft: -275
    },

    name: {
        // height: 35,
        marginTop: -40,
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: 'center',
        fontSize: 18,
        color: 'white',
        borderBottomWidth: 1,
        // fontFamily: 'MontserratMedium',
        marginLeft: 100,
        // backgroundColor:'#BAB700'
    },

    tel: {
        width: 200,
        height: 20,
        marginTop: 0,
        fontSize: 18,
        color: 'white',
        borderBottomWidth: 5,
        // fontFamily: 'MontserratMedium',
        marginLeft: 165,
        // backgroundColor:"red"
    },

    mail: {
        marginTop: 20,
        width: 200,
        height: 35,
        borderRadius: 5,
        fontSize: 14,
        color: 'white',
        borderBottomWidth: 5,
        // fontFamily: 'MontserratMedium',
        marginLeft: 165
    },

    descriptionBloc: {
        backgroundColor: '#60935D',
        width: '98%',
        height: 110,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    modifyContactSlidePen: {
        marginLeft: 350,
        marginBottom: 0,
        marginTop: 20,
        width: 50,
        height: 50,
        color: '#BAB700',

    },
    modifyPenDescription: {
        marginTop: -30,
        marginLeft: 300,
        color: '#BAB700'
    },


    h1: {
        // fontFamily: 'MontserratMedium',
        fontSize: 28,
        color: '#BAB700',
        marginTop: 20,
        fontWeight: 'bold'
    },
    h2: {
        marginTop: 25,
        // fontFamily: 'MontserratRegular',
        fontSize: 24,
        color: '#BAB700',
    },
    h3: {
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
        color: '#14342B',
    },
    text: {
        // fontFamily: 'MontserratRegular',
        fontSize: 16,
        color: 'black',
    },

    whiteText: {
        // fontFamily: 'MontserratRegular',
        fontSize: 16,
        color: 'white',
        margin: 15,
    },

    textInputUsername: {
        backgroundColor: '#BBDFC5',
        width: 200,
        height: 30,
        marginLeft: 130,
        marginTop: -55,
    },

    textInputTel: {
        backgroundColor: '#BBDFC5',
        width: 200,
        height: 30,
        marginLeft: 130,
        marginTop: 8,
    },

    textInputDescription: {
        backgroundColor: '#BBDFC5',
        width: 370,
        height: 90,
        marginLeft: 0,
        marginTop: 15
    },

    btn: {
        marginTop: 20,
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#BAB700",
        // fontFamily: 'MontserratMedium', 
        fontSize: 20,

    },
});