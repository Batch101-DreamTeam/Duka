//Les photos prises et inportés de la bibliothèque du tel ne sont pas sauvegardés sur cloudinary
import { StyleSheet, ScrollView, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image, Modal, Pressable } from 'react-native';
import Header from '../components/Header';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BACKEND_ADDRESS } from "@env"
const backendAddress = BACKEND_ADDRESS;
import { SelectList } from 'react-native-dropdown-select-list'
import { removePhoto, addPhoto, deleteAllPhoto } from '../reducers/user'
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Foundation } from '@expo/vector-icons';
import Photo from '../components/Photo';

export default function FicheVente({ route, navigation }) {
    const dispatch = useDispatch()
    //console.log(route.locations)
    const { dataOffers } = route.params; // recuperation des infos du parent

    const offerTitle = dataOffers.offerTitle
    const idProduct = dataOffers._id
    const descriptionOffer = dataOffers.description
    const categoryOffer = dataOffers.category
    const cityData = dataOffers.locations[0]
    const priceOffer = dataOffers.price
    const images = dataOffers.images[0] // mapper les photos pour toutes les afficher par la suite
    const imagesToMap = dataOffers.images

    const [modify, setModify] = useState(false) // affichage conditionel en cours de modification

    const [modalVisible, setModalVisible] = useState(false);
    const [modalAddPhoto, setmMdalAddPhoto] = useState(false)
    const [emptyField, setEmptyField] = useState(false)
    const [openTakePhotoModal, setOpenTakePhotoModal] = useState(false); // modal pour prendre une photo

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [locations, setLocations] = useState('');
    const [category, setCategory] = useState('');
    const store = ["Loisir", 'Informatique', "Maison", "Jardin", 'Vêtement', "Automobile"]
    const citiesData = ['Moroni', 'Mutsamudu', 'Fomboni', 'Iconi', 'Itsandra', 'MalÃ©', 'Ouellah', 'Sima'];



    const user = useSelector((state) => state.user.value);
    const token = user.token
    const photoReducer = user.photos



    useFocusEffect(
        React.useCallback(() => {
            dispatch(deleteAllPhoto())
            setName(offerTitle)
            setDescription(descriptionOffer)
            setPrice(priceOffer)
            setLocations(cityData)
            setCategory(categoryOffer)
            for (let i = 0; i < imagesToMap.length; i++) {
                dispatch(addPhoto(imagesToMap[i]))
            }
        }, [])
    );


    const ConfirmationDelete = () => {
        setModalVisible(true)
    }
    const deleteOffer = () => {
        fetch(`${backendAddress}/offers/deleteOffer/${idProduct}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                setModalVisible(!modalVisible)
                navigation.navigate("MesVentes")
            });
    }
    const changeOffer = () => {
        setModify(true)
    }
    const confirmChange = () => {
        if (name === "" || description === '' || price === '') {
            setEmptyField(true)
        } else {
            fetch(`${backendAddress}/offers/modifyOffer/${idProduct}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    offerTitle: name,
                    images: photoReducer,
                    description: description,
                    category: category,
                    price: price,
                    locations: locations,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    dispatch(deleteAllPhoto())
                    navigation.navigate("MesVentes")
                })
        }
    }
    const deletePhotoDisplay = (picture) => {
        console.log(picture)
        dispatch(removePhoto(picture))
    }


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
            setmMdalAddPhoto(false)
        }
    };

    const takePicture = () => {
        navigation.navigate('Photo', { from: 'FicheVente' })
    }

    const photos = photoReducer.map((data, i) => { // afficher les photos stockés dans le reducer (mettre une limite max?)
        return (
            <TouchableOpacity key={i}  >
                <ImageBackground source={{ uri: data }} style={{ width: 120, height: 120, marginRight: 20 }} >
                    <TouchableOpacity onPress={() => deletePhotoDisplay(data)}>
                        <AntDesign name="closecircle" size={30} color="green" style={{ marginLeft: '75%', marginTop: 10 }} />
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
        );
    });
    const closeTakePhotoModalFicheVente = () => {
        setOpenTakePhotoModal(false);
        setmMdalAddPhoto(false)
    };
    return (
        <View style={styles.container}>

            <Header />
            <View style={styles.displayPhoto}>
                {photos}
            </View>
            <TouchableOpacity onPress={() => setmMdalAddPhoto(true)} style={styles.addPicture}>
                <Text>Ajoutez des photos</Text>
                <MaterialIcons name="add-a-photo" size={55} color="black" />
            </TouchableOpacity>
            <View style={styles.product}>


                <View style={styles.descProd}>
                    <Text> Nom de l'offre</Text>
                    <View style={styles.SearchRow}>

                        {!modify ?
                            <Text >{offerTitle}</Text>
                            : <TextInput onChangeText={(value) => setName(value)} value={name} style={styles.inputSearch} placeholder=" Nom" maxLength={200}></TextInput>}
                    </View>
                    <Text> Description de l'offre</Text>
                    <View style={styles.SearchRow}>
                        {!modify ?
                            <Text >{descriptionOffer}</Text>
                            : <TextInput onChangeText={(value) => setDescription(value)} value={description} style={styles.inputSearch} placeholder=" Description" maxLength={400}></TextInput>}
                    </View>
                    <Text> Prix</Text>
                    <View style={styles.SearchRow}>
                        {!modify ?
                            <Text >{priceOffer}</Text>
                            : <TextInput onChangeText={(value) => setPrice(value)} value={price} style={styles.inputSearch} placeholder=" Prix" maxLength={200} keyboardType="numeric"></TextInput>}
                    </View>

                    <View style={styles.slectlist}>
                        {!modify ? <View style={styles.SearchRowList}>
                            <Text>{categoryOffer} </Text>
                        </View> :
                            (<SelectList
                                setSelected={(val) => setCategory(val)}
                                data={store}
                                save="value"
                                placeholder={category}
                                search={false}
                                maxHeight={150}
                            />)}
                        {!modify ? <View style={styles.SearchRowList}>
                            <Text>{cityData} </Text>
                        </View> :
                            (<SelectList
                                setSelected={(val) => setLocations(val)}
                                data={citiesData}
                                save="value"
                                placeholder={locations}
                                search={false}
                            />)}
                    </View>
                    {modify ?
                        <View style={styles.blocModiSuppr}>
                            <TouchableOpacity onPress={() => confirmChange()} style={styles.send}>
                                <Text> Confirmer les changements</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.suppr} onPress={() => { setModify(false); setEmptyField(false) }}>
                                <Text> Annuler</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.blocModiSuppr}>
                            {emptyField && <Text>Veuillez remplir les champs</Text>}
                            <TouchableOpacity onPress={() => changeOffer()} style={styles.send1}>
                                <Text> Modifier les informations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.suppr} onPress={() => ConfirmationDelete()}>
                                <Text> Supprimer l'offre</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    //console.log(modalVisible)
                }}>
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.ModalAcceuil} >
                    <View style={styles.modalView}>
                        <View>
                            <Text>Etes vous sur de vouloir supprimer cette offre ? </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => deleteOffer()}>
                                <Text>Oui</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Text>Non</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAddPhoto}
                onRequestClose={() => {
                    setmMdalAddPhoto(!modalAddPhoto);
                    //console.log(modalVisible)
                }}>
                <Pressable onPress={() => setmMdalAddPhoto(!modalAddPhoto)} style={styles.ModalAcceuil}>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={openTakePhotoModal}
                onRequestClose={() => {
                    setOpenTakePhotoModal(!openPhoto);
                    //console.log(modalVisible)
                }}>

                <Photo closeModal={closeTakePhotoModalFicheVente} />


            </Modal>
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

    product: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
        padding: 5,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        // backgroundColor: 'green',
    },
    image: {
        margin: 1,
        padding: 1,
        width: 250,
        height: 250,
        borderRadius: 10,
        marginTop: 20,
    },
    descProd: {
        width: '100%',
        height: '100%',
        padding: 5,
        margin: 1,

    },
    SearchRow: {
        margin: 8,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#BBDFC5',
        // fontFamily: 'MontserratMedium',
        fontSize: 14,
        height: '8%',
        alignItems: 'center'

    },
    SearchRowList: {
        margin: 8,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#BBDFC5',
        // fontFamily: 'MontserratMedium',
        fontSize: 14,
        alignItems: 'center'

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
        marginBottom: 10,

    },
    send1: {
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
    suppr: {
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "red",
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
        width: '85%',
        marginBottom: 10
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
    inputSearch: {
        margin: 8,
        height: 40,
        width: 300,
        borderRadius: 10,
        // fontFamily: 'MontserratMedium',
        fontSize: 14,


    },
    displayPhoto: {
        flexDirection: 'row'
    },
    blocModiSuppr: {
        alignItems: 'center',
    },
    addPicture: {
        width: '40%',
        height: '15%',
        borderWidth: 1,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconModal: {
        marginRight: 10
    },
})