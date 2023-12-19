import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Modal, Pressable, Image, Alert, ImageBackground } from 'react-native';
import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
// import MontserratRegular from '../res/fonts/Montserrat-Regular.ttf';
// import MontserratMedium from '../res/fonts/Montserrat-Medium.ttf';
import { useDispatch, useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'
import { SelectList } from 'react-native-dropdown-select-list'
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Connection from '../components/Connection';
import Inscription from '../components/Inscription';
import { AntDesign } from '@expo/vector-icons';
import { removePhoto, addPhoto, deleteAllPhoto } from '../reducers/user'
import { BACKEND_ADDRESS } from "@env"
import { useFocusEffect } from '@react-navigation/native';
import Photo from '../components/Photo';
const backendAddress = BACKEND_ADDRESS;

export default function VendreScreen({ route, navigation }) {
    const dispatch = useDispatch();


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [locations, setLocations] = useState('');
    const [category, setCategory] = useState('');
    const store = ["Loisir", 'Informatique', "Maison", "Jardin", 'Vêtement', "Automobile"]
    const citiesData = ['Moroni', 'Mutsamudu', 'Fomboni', 'Iconi', 'Itsandra', 'MalÃ©', 'Ouellah', 'Sima'];
    const [fillField, setFillField] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [offerRegister, setOfferRegister] = useState(false);
    const [selected, setSelected] = useState("")
    const [openPhoto, setOpenPhoto] = useState(false);
    const [displayOpenPhoto, setDisplayOpenPhoto] = useState("")
    const [openTakePhotoModal, setOpenTakePhotoModal] = useState(false); // modal pour prendre une photo

    //console.log(locations)

    useFocusEffect(
        React.useCallback(() => {
            setModalVisible(false);
            dispatch(deleteAllPhoto())
        }, [])
    );



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
            dispatch(addPhoto(result.assets[0].uri))
            setModalVisible(false)
        }
    };
    const user = useSelector((state) => state.user.value);
    const token = user.token
    const photoReducer = user.photos


    let dateOfTheDay = new Date(); // obtenir la date du jour


    const Validate = async () => {
        if (name != "" || description != "" || price != "") {
            const photos = []
            for (let i = 0; i < photoReducer.length; i++) { // boucle pour sauvegarder toutes les photos du reducer dns le backend
                const formData = new FormData();
                formData.append('photoFromFront', {
                    uri: photoReducer[i],
                    name: 'photo.jpg',
                    type: 'image/jpeg',
                });

                const response = await fetch(`${backendAddress}/offers/upload`, { // http://172.16.0.153:3000/offers/upload
                    method: 'POST',
                    body: formData,
                })
                const photoSaveCloudinaty = await response.json() // pas du TOUT opti car toute les photos sont saves avant de savoir si la requete pour save va passer

                console.log('response trouvée : ', photoSaveCloudinaty)

                photos.push(photoSaveCloudinaty.url) // stock les url cloudinary dans variable d'état
                //console.log('photos', photos)

            }

            fetch(`${backendAddress}/offers/addOffer`, {// http://172.16.0.153:3000/offers/addOffer
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: token,
                    offerTitle: name,
                    images: photos,// recup dans le tableau au dessus
                    category: category,
                    description: description,
                    price: price,
                    dateOfCreation: dateOfTheDay,
                    locations: locations,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    //console.log('reponse du back addoffer', data)
                    if (data.result) {
                        setName("")
                        setDescription("")
                        setPrice("")
                        dispatch(deleteAllPhoto())
                        setCategory("")
                        setLocations("")
                        setOfferRegister(!offerRegister)
                    } else {

                    }
                });
        } else {
            setFillField(false)
        }
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
    const photos = user.photos.map((data, i) => { // afficher les photos stockés dans le reducer (mettre une limite max?)
        return (
            <TouchableOpacity key={i} onPress={() => openModalPhoto(data)} >
                <ImageBackground source={{ uri: data }} style={{ width: 120, height: 120, marginRight: 20 }} >
                    <TouchableOpacity onPress={() => deletePhotoDisplay(data)}>
                        <AntDesign name="closecircle" size={30} color="green" style={{ marginLeft: '75%', marginTop: 10 }} />
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
        );
    });
    const closeTakePhotoModal = () => {
        setOpenTakePhotoModal(false);
        setModalVisible(false)
    };


    return (
        <View style={styles.container}>

            <Header />
            {token != undefined ? <View style={styles.containerContent}>
                <View style={styles.box}>
                    <Text style={styles.textBox}>Ajouter une vente</Text>
                </View>
                <View style={styles.SearchRow} >
                    <FontAwesome name="pencil" style={styles.iconSearch} size={20} />
                    <TextInput onChangeText={(value) => setName(value)} value={name} style={styles.inputSearch} placeholder=" Nom" maxLength={200} />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addPicture}>
                    <Text>Ajoutez des photos</Text>
                    <MaterialIcons name="add-a-photo" size={55} color="black" />
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
                <View style={styles.photoReducer}>
                    {photos}
                </View>
                <View style={styles.SearchRow} >
                    <FontAwesome name="pencil" style={styles.iconSearch} size={20} />
                    <TextInput onChangeText={(value) => setDescription(value)} value={description} style={styles.inputSearch} placeholder=" Description" maxLength={200} />
                </View>
                <View style={styles.SearchRow} >
                    <FontAwesome name="tag" style={styles.iconSearch} size={20} />
                    <TextInput onChangeText={(value) => setPrice(value)} value={Number(price)} style={styles.inputSearch} placeholder=" Prix" maxLength={200} keyboardType="numeric" />
                </View>
                <View style={styles.slectlist}>
                    <SelectList
                        setSelected={(val) => setCategory(val)}
                        data={store}
                        save="value"
                        placeholder='Catégorie'
                        search={false}
                        maxHeight={150}
                    />
                    <SelectList
                        setSelected={(val) => setLocations(val)}
                        data={citiesData}
                        save="value"
                        placeholder='Ville'
                        search={false}
                    />
                </View>
                <TouchableOpacity onPress={() => Validate()} style={styles.send}>
                    <Text style={styles.white}>
                        Ajouter
                    </Text>
                </TouchableOpacity >
                {!fillField ? <Text>Veuillez remplir les champs correctement</Text> : <></>}


            </View> :
                <View style={styles.container}>
                    <Text style={styles.h3}>Vous devez d'abord vous connecter pour accéder à ce service</Text>
                    <Connection />
                    <Inscription />
                </View>}
            <Modal
                animationType="slide"
                transparent={true}
                visible={offerRegister}
                onRequestClose={() => {
                    setOfferRegister(!offerRegister);
                    //console.log(modalVisible)
                }}>
                <Pressable onPress={() => setOfferRegister(!offerRegister)} style={styles.ModalAcceuil}>
                    <View style={styles.modalView}>
                        <Text>Vottre offre a bien été enregistré</Text>
                        <TouchableOpacity style={styles.send} onPress={() => refresh()}>
                            <Text style={styles.whiteSmall}>Ajouter une nouvelle offre</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.send}>
                            {/* // ajouter onPress vers tableau de bord */}
                            <Text style={styles.whiteSmall}>Consulter mon Tableau de bord</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={openPhoto}
                onRequestClose={() => {
                    setOpenPhoto(!openPhoto);
                    //console.log(modalVisible)
                }}>
                <Pressable onPress={() => setOpenPhoto(!openPhoto)} style={styles.ModalAcceuil} >
                    <ImageBackground source={{ uri: displayOpenPhoto }} style={{ width: 400, height: 400, margin: 20 }} >
                        <TouchableOpacity onPress={() => { deletePhotoDisplay(displayOpenPhoto); setOpenPhoto(!openPhoto) }}>
                            <AntDesign name="closecircle" size={30} color="green" style={{ marginLeft: '75%', marginTop: 10 }} />
                        </TouchableOpacity>
                    </ImageBackground>
                </Pressable>
            </Modal>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',

    },
    containerContent: {
        flex: 1,
        backgroundColor: '',
        alignItems: 'center'

    },
    box: {
        backgroundColor: '#60935D',
        width: '100%',
        height: '6%',
        borderRadius: 0,
    },

    textBox: {
        textAlign: 'center',
        color: 'white',
        height: '100%',
        textAlignVertical: 'center',
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    iconSearch: {
        alignSelf: 'flex-start',
        padding: 10,
    },
    inputSearch: {
        margin: 8,
        height: 40,
        width: 300,
        borderRadius: 10,
        // fontFamily: 'MontserratMedium',
        fontSize: 14,

    },
    SearchRow: {
        margin: 8,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#BBDFC5',
        // fontFamily: 'MontserratMedium',
        fontSize: 14,
    },
    white: {
        color: 'white',
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    whiteSmall: {
        color: 'white',
        // fontFamily: 'MontserratMedium',
        fontSize: 12,
    },
    send: {
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#60935D",
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
        width: '85%',
        marginBottom: 10
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
    h3: {
        // fontFamily: 'MontserratRegular',
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginTop: 5
    },
    photoReducer: {
        flexDirection: 'row'
    },
    slectlist: {
        flexDirection: 'row',
        margin: 10,

    }

});