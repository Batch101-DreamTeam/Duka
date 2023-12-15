
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, TextInput, Dimensions } from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import React, { useEffect, useState, Dispatch, } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import des fichiers de police
import MontserratRegular from '../res/fonts/Montserrat-Regular.ttf';
import MontserratMedium from '../res/fonts/Montserrat-Medium.ttf';

import { BACKEND_ADDRESS } from "@env";
const backendAddress = BACKEND_ADDRESS;


export default function ProfilScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        MontserratRegular: MontserratRegular,
        MontserratMedium: MontserratMedium,
    });

    if (!fontsLoaded) {
        return null;
    }

    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [description, setDescription] = useState("");
    const [mail, setMail] = useState("");
    const [location, setLocation] = useState("");
    const [favorites, setFavorites] = useState("");
    const [avatar, setAvatar] = useState("");


    const fetchProfilInfos = (profileToken) => {
        fetch(`${backendAddress}/users/getProfilInfos/${profileToken}`)
            .then(response => response.json())
            .then(profileInfos => {
                console.log(profileInfos)
                if (profileInfos.result) {
                    setUsername(profileInfos.username)
                    setContact(profileInfos.contact)
                    setDescription(profileInfos.description)
                    setMail(profileInfos.mail)
                    setAvatar(profileInfos.avatar)
                    setLocation(profileInfos.location)
                    setFavorites(profileInfos.favorites)
                }
            })
    }
    useEffect(() => {
        fetchProfilInfos(token);
    }, []);
    // appeler fetchProfileInfo au démarrage de la page (avec useffect) et choper le token ds le reducer (une fois connecté à l'appli) puis on mettra le tout dans un if
    return (
        <View style={styles.container}>

            <Header />

            <View style={styles.containerContent}>
                <SafeAreaView style={styles.container}>


                    <Text style={styles.h1}>Mon profil</Text>

                    <View style={styles.userBlock}>
                        {/* <View style={styles.blockNamePpContact}> */}
                        <Text style={styles.name}>{username}</Text>
                        <Text style={styles.tel}>{contact}</Text>
                        <Text style={styles.tel}>{mail}</Text>
                        <Image source={avatar} style={styles.pictureProfile} />
                        <View style={styles.nameContact}>
                        </View>
                        {/* </View> */}
                        <TouchableOpacity>
                            <FontAwesome style={styles.modifyPen} name="pencil" size={20} color={'white'} />
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.h2}>Description</Text>


                    <View style={styles.descriptionBloc}>
                        <Text style={styles.whiteText}>{description}</Text>
                        <TouchableOpacity>
                            <FontAwesome style={styles.modifyPenDescription} name="pencil" size={20} color={'white'} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.h2}>Lieux favoris</Text>

                    <View style={styles.localisationContainer}>


                        <TouchableOpacity style={styles.altBtn}>
                            <Text style={styles.whiteText}>{location}</Text>
                        </TouchableOpacity >

                        <TouchableOpacity style={styles.altBtn}>
                            <Text style={styles.whiteText}>{location}</Text>
                        </TouchableOpacity >

                        <TouchableOpacity style={styles.altBtn}>
                            <Text style={styles.whiteText}>{location}</Text>
                        </TouchableOpacity >

                        <TouchableOpacity>
                            <FontAwesome name="plus" style={styles.plusButton} size={20} />
                        </TouchableOpacity >


                    </View>

                    <Text style={styles.h2}>Offres en cours</Text>

                    <View style={styles.localisationContainer}>

                        <TouchableOpacity style={styles.altBtn}>
                            <Text style={styles.whiteText}>{favorites}</Text>
                        </TouchableOpacity >

                        <TouchableOpacity style={styles.altBtn}>
                            <Text style={styles.whiteText}>{favorites}</Text>
                        </TouchableOpacity >

                        <TouchableOpacity style={styles.altBtn}>
                            <Text style={styles.whiteText}>{favorites}</Text>
                        </TouchableOpacity >
                    </View>

                </SafeAreaView >


            </View>

        </View>
    );
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
        marginLeft: 40,
        color: 'white',
    },

    locationRow: {
        backgroundColor: 'orange',
        width: '70%',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
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
    duka: {
        marginTop: 10,
    },

    topRightHeader: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10
    },

    iconRightHeader: {
        marginLeft: 10,
    },

    bars: {
        marginLeft: 10,
        marginTop: 10
    },

    userBlock: {
        backgroundColor: '#60935D',
        width: '98%',
        height: 140,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    pictureProfile: {
        // backgroundColor: 'black',
        width: 100,
        height: 100,
        borderRadius: 80,
        marginTop: -90,
        marginRight: 220,
    },

    name: {
        height: 35,
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center',
        fontSize: 18,
        color: 'white',
        borderBottomWidth: 1,
        fontFamily: 'MontserratMedium',
        marginLeft: 100
    },

    tel: {
        width: 200,
        height: 35,
        marginTop: 0,
        borderRadius: 5,
        fontSize: 18,
        color: 'white',
        borderBottomWidth: 5,
        fontFamily: 'MontserratMedium',
        marginLeft: 165
    },

    blockNamePpContact: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'yellow',

    },
    descriptionBloc: {
        backgroundColor: '#60935D',
        width: '98%',
        height: 110,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,

    },
    descriptionRow: {
        // height: 40,
        marginTop: 0,
        // backgroundColor: 'red',
        borderRadius: 0,

        width: '100%',
        height: 130,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    modifyPen: {
        marginLeft: 250,
        marginBottom: 120

    },
    modifyPenDescription: {
        marginTop: 55,
        marginLeft: 87
    },


    h1: {
        fontFamily: 'MontserratMedium',
        fontSize: 28,
        color: '#14342B',
        marginTop: 20,
    },
    h2: {
        marginTop: 25,
        fontFamily: 'MontserratRegular',
        fontSize: 24,
        color: '#60935D',
    },
    h3: {
        fontFamily: 'MontserratMedium',
        fontSize: 20,
        color: '#14342B',
    },
    text: {
        fontFamily: 'MontserratRegular',
        fontSize: 16,
        color: 'black',
    },

    whiteText: {
        fontFamily: 'MontserratRegular',
        fontSize: 16,
        color: 'white',
        margin: 15,
    },

    topBar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 210,
        backgroundColor: '#60935D',
        width: 400,
        height: 50,
        borderRadius: 10,
    },

    icon: {
        width: 35,
        height: 35,
        color: 'white',
        margin: 8,
    },

    returnToHome: {
        marginLeft: 110,
    },

    green: {
        color: "#BAB700",
        fontFamily: 'MontserratMedium',
        fontSize: 20,
    },

});