
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Modal, ImageBackground, Pressable } from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Camera } from 'expo-camera';
import Photo from '../components/Photo';
import { removePhoto, addPhoto, deleteAllPhoto, addProfilePhoto, removeProfilePhoto } from '../reducers/user';
import { Foundation } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Connexion from '../components/Connexion';

// Import des fichiers de police
import { useFonts } from 'expo-font';
// import MontserratRegular from '../res/fonts/Montserrat-Regular.ttf';
// import MontserratMedium from '../res/fonts/Montserrat-Medium.ttf';

import { BACKEND_ADDRESS } from "@env";
import { useFocusEffect } from '@react-navigation/native';

const backendAddress = BACKEND_ADDRESS;




export default function ProfilScreen(props) {
    const [profileData, setProfileData] = useState({
        username: "",
        contact: "",
        description: "",
        mail: "",
        location: "",
        favorites: "",
        avatar: "",
    });

    const user = useSelector((state) => state.user.value);
    const tokenUser = user.token
    const photoProfileReducer = user.profilePhoto


    const dispatch = useDispatch();

    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedContact, setUpdatedContact] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [modifyField, setModifyField] = useState(false);
    const [profilPicture, setProfilPicture] = useState('');
    const [openPhoto, setOpenPhoto] = useState(false);
    const [displayOpenPhoto, setDisplayOpenPhoto] = useState("")
    const [openTakePhotoModal, setOpenTakePhotoModal] = useState(false); // modale pour prendre une photo
    const [modalVisible, setModalVisible] = useState(false);
    const [switche, setSwitche] = useState(false);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         setModifyField(false)
    //         setModalVisible(false);
    //         dispatch(deleteAllPhoto())
    //     }, [])
    // );
    useFocusEffect(
        React.useCallback(() => {
            dispatch(removeProfilePhoto())
            // console.log('AVANT LE FETCH')
            fetch(`${backendAddress}/users/getProfilInfos/${user.token}`)
                .then(response => response.json())
                .then(profileInfos => {
                    //console.log(profileInfos)
                    if (profileInfos.result) {
                        setProfileData({
                            username: profileInfos.username,
                            contact: profileInfos.contact,
                            description: profileInfos.description,
                            mail: profileInfos.mail,
                            avatarProfil: profileInfos.avatar,
                            location: profileInfos.location,
                            // favorites: profileInfos.favorites,
                        });
                        //console.log(profileData.avatarProfil)
                        setUpdatedUsername(profileInfos.username)
                        setUpdatedContact(profileInfos.contact)
                        setUpdatedDescription(profileInfos.description)
                        setUpdatedDescription(profileInfos.description)
                        setProfilPicture(profileData.avatarProfil)
                        dispatch(addProfilePhoto(profileData.avatarProfil))
                    }
                })
                .catch(error => { console.log(error)
                    //console.error("Error fetching profile information:", error);

                });

        }, [switche, tokenUser])
    );
    // console.log('photoProfileReducer', photoProfileReducer)
    //Mettre à jour son profil
    const updateProfilInfo = async () => {

        const formData = new FormData();
        formData.append('photoFromFront', {
            uri: photoProfileReducer,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

        const response = await fetch(`${backendAddress}/offers/upload`, { // http://172.16.0.153:3000/offers/upload
            method: 'POST',
            body: formData,
        })
        const photoSaveCloudinaty = await response.json()
        fetch(`${backendAddress}/users/modifyProfil/${user.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: updatedUsername,
                contact: updatedContact,
                description: updatedDescription,
                avatar: photoSaveCloudinaty.url
            }),
        })
            .then(response => response.json())
            .then(data => {
                setSwitche(!switche)
                setModifyField(false)
            })
    }

    const takePicture = () => {
        setOpenTakePhotoModal(true)
    }
    // const refresh = () => { // ne fonctionne pas
    //     navigation.replace('VendreScreen')
    // }

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
            dispatch(addProfilePhoto(result.assets[0].uri)) //vise les photos de produits dans le reducer : à modifier!
            setSwitche(!switche)
            setModalVisible(!modalVisible)
        }
    };




    return (

        <View style={styles.container}>
            <Header navigation={props.navigation} />

            <View style={styles.containerContent}>
                {user.token ? (
                    <View>
                        <ScrollView Style={styles.scrollView}>

                            <Text style={styles.h1}>Mon profil</Text>

                            <View style={styles.userBlock}>
                                <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.8} style={{ height: '100%', width: '40%', marginLeft: '5%' }} >
                                    {/* <FontAwesome style={styles.modifyProfilePhotoPen} name="pencil" size={50} color={'white'} /> */}
                                    {photoProfileReducer && <Image source={{ uri: photoProfileReducer }} style={{ height: '90%', width: '90%', borderRadius: 80 }} />}
                                </TouchableOpacity>

                                <View style={styles.allinfosProfil}>
                                    {!modifyField ? <Text style={styles.name}>Nom : {profileData.username}</Text> : <TextInput onChangeText={(value) => setUpdatedUsername(value)} value={updatedUsername} style={styles.textInputUsername} />}
                                    {!modifyField ? <Text style={styles.tel}>Tél. : {profileData.contact}</Text> : <TextInput onChangeText={(value) => setUpdatedContact(value)} value={updatedContact} style={styles.textInputTel} />}
                                    <Text style={styles.mail}>email :  {profileData.mail}</Text>
                                </View>

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
                                                <Foundation name="photo" size={24} color="black" style={styles.iconModal} />
                                                <Text style={styles.whiteSmall}>
                                                    A partir de la bibliothèque
                                                </Text>
                                            </TouchableOpacity >
                                            <TouchableOpacity style={styles.send} onPress={() => takePicture()}>
                                                <FontAwesome name="camera" size={24} color="black" style={styles.iconModal} />
                                                <Text style={styles.whiteSmall}>
                                                    Prendre une photo
                                                </Text>
                                            </TouchableOpacity >
                                        </View>
                                    </Pressable>
                                </Modal>
                            </View>
                            <Text style={styles.h2}>Description</Text>
                            <View style={styles.descriptionBloc}>
                                {!modifyField ? <Text style={styles.whiteText}>{profileData.description}</Text> : <TextInput onChangeText={(value) => setUpdatedDescription(value)} value={updatedDescription} style={styles.textInputDescription} />}
                            </View>
                            <Text style={styles.h2}>Lieux favoris</Text>
                            <View style={styles.localisationContainer}>
                                {[1, 2, 3].map((item) => (
                                    <TouchableOpacity activeOpacity={0.8} key={item} style={styles.altBtn}>
                                        <Text style={styles.whiteText}>{profileData.location}</Text>
                                    </TouchableOpacity>
                                ))}

                            </View>

                            <View>
                                {!modifyField ? <TouchableOpacity onPress={() => setModifyField(true)} activeOpacity={0.8} style={styles.btn}>
                                    <Text style={styles.white}>
                                        Modifier le profil
                                    </Text>
                                </TouchableOpacity >
                                    : <View>
                                        <TouchableOpacity onPress={() => updateProfilInfo()} activeOpacity={0.8} style={styles.btn1}>
                                            <Text style={styles.white}>
                                                Enregistrer les modifications
                                            </Text>
                                        </TouchableOpacity >
                                        <TouchableOpacity onPress={() => setModifyField(false)} activeOpacity={0.8} style={styles.btn}>
                                            <Text style={styles.white}>
                                                Annuler
                                            </Text>
                                        </TouchableOpacity >

                                    </View>
                                }

                            </View>
                        </ScrollView>
                    </View>
                ) : (
                    <View>
                        <Connexion />
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
        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        backgroundColor: 'white'

    },

    allinfosProfil: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: '5%'
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

    scrollView: {
        alignItems: 'center',
        flex: 1,
    },

    userBlock: {
        backgroundColor: '#60935D',
        width: '100%',
        height: '20%',
        borderRadius: 10,
        alignItems: 'center',

        flexDirection: 'row'
        // backgroundColor:'blue'
    },

    addPicture: {
        width: "auto",
        height: "auto",
        borderRadius: 80,
        marginLeft: '0%',
        marginTop: -20,
        backgroundColor: 'red'
    },

    name: {
        // height: 35,
        marginTop: '5%',
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: 'flex-start',
        fontSize: 18,
        color: 'white',
    },

    tel: {
        marginBottom: '2%',
        fontSize: 18,
        color: 'white',
    },

    mail: {
        marginTop: 20,
        width: 200,
        height: 35,
        borderRadius: 5,
        fontSize: 14,
        color: 'white',
        // borderBottomWidth: 5,
        // fontFamily: 'MontserratMedium',
    },

    descriptionBloc: {
        backgroundColor: '#60935D',
        width: '98%',
        height: 80,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
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
        marginTop: '10%'

    },

    textInputTel: {
        backgroundColor: '#BBDFC5',
        width: 200,
        marginTop: 8,
    },

    textInputDescription: {
        backgroundColor: '#BBDFC5',
        width: 370,
        height: 50,
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
        marginRight: 10,
    },
    btn1: {
        marginTop: 20,
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#60935D",
        // fontFamily: 'MontserratMedium', 
        fontSize: 20,
    },

});