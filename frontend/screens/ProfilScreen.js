
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Modal, ImageBackground, Pressable } from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Inscription from '../components/Inscription';
import React, { useEffect, useState, Dispatch, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Camera } from 'expo-camera';
import Photo from '../components/Photo';
import { removePhoto, addPhoto, deleteAllPhoto } from '../reducers/user';
import { Foundation } from '@expo/vector-icons';


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

    const dispatch = useDispatch();

    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedContact, setUpdatedContact] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [modifyField, setModifyField] = useState(false);
    const user = useSelector((state) => state.user.value);
    const token = user.token
    console.log(token)
    const [openPhoto, setOpenPhoto] = useState(false);
    const [displayOpenPhoto, setDisplayOpenPhoto] = useState("")
    const [openTakePhotoModal, setOpenTakePhotoModal] = useState(false); // modal pour prendre une photo
    const [modalVisible, setModalVisible] = useState(false);
    // console.log(user)
    useFocusEffect(
        React.useCallback(() => {
            setModalVisible(false);
            dispatch(deleteAllPhoto())
        }, [])
    );
    useFocusEffect(
        React.useCallback(() => {
            fetch(`${backendAddress}/users/getProfilInfos/${token}`)
                .then(response => response.json())
                .then(profileInfos => {

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

                });

        }, [])
    );

    //Mettre à jour son profil
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

    const takePicture = () => {
        setOpenTakePhotoModal(true)
        //navigation.navigate('Photo', { from: 'VendreScreen' })
    }
    const refresh = () => { // ne fonctionne pas
        navigation.replace('VendreScreen')
    }

    const deletePhotoDisplay = (picture) => {
        dispatch(removePhoto(picture))
    }
    const openModalPhoto = (data) => {
        setOpenPhoto(true)
        setDisplayOpenPhoto(data)
    }

    const closeTakePhotoModal = () => {
        setOpenTakePhotoModal(false);
        setModalVisible(false)
    };

    //Pour aller chercher une photo dans la librairie du smartphone
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            //console.log(result.assets)
            const formData = new FormData();
            formData.append('photoFromFront', {
                uri: result.assets[0].uri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            })
            dispatch(addPhoto(result.assets[0].uri)) //vise les photos de produits dans le reducer
            setModalVisible(false)
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={styles.container}>
                <Header />
                {user.token ? (
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
                                    <Image style={styles.pictureProfile} />
                                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addPicture}>
                                        <FontAwesome style={styles.modifyProfilePhotoPen} name="pencil" size={20} color={'white'} />
                                    </TouchableOpacity>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={modalVisible}
                                        onRequestClose={() => {
                                            setModalVisible(!modalVisible);
                                            //console.log(modalVisible)
                                        }}>
                                        <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.ModalAcceuil}>
                                            <View style={styles.modalView}>
                                                <TouchableOpacity style={styles.send} onPress={pickImage}>
                                                    <Foundation name="photo" size={24} color="white" style={styles.iconModal} />
                                                    <Text style={styles.whiteSmall}>
                                                        A partir de la bibliothèque
                                                    </Text>
                                                </TouchableOpacity >
                                                <TouchableOpacity style={styles.send} onPress={() => takePicture()}>
                                                    <FontAwesome name="camera" size={24} color="white" style={styles.iconModal} />
                                                    <Text style={styles.whiteSmall}>
                                                        Prendre une photo
                                                    </Text>
                                                </TouchableOpacity >
                                            </View>
                                        </Pressable>
                                        {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                                    </Modal>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={openTakePhotoModal}
                onRequestClose={() => {
                    setOpenTakePhotoModal(!openTakePhotoModal);
                    //console.log(modalVisible)
                }}>

                <Photo closeModal={closeTakePhotoModal} />


            </Modal>
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
        marginLeft: -190
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

    modifyProfilePhotoPen: {
        marginLeft: -115,
        marginBottom: 0,
        marginTop: -100,
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

    photoReducer: {
        flexDirection: 'row'
    },
    addPicture: {
        width: '40%',
        height: '15%',
        borderWidth: 1,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ModalAcceuil: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 48,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconModal: {
        marginRight: 10
    },
});