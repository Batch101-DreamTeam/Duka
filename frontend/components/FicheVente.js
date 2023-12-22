//Les photos prises et inportés de la bibliothèque du tel ne sont pas sauvegardés sur cloudinary
import { StyleSheet, ScrollView, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image, Modal, Pressable, Dimensions } from 'react-native';
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
import Photo from './Photo';
import { LogBox } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import ProfilScreen from '../screens/ProfilScreen';


export default function FicheVente(props, { route, navigation }) {
    const dispatch = useDispatch()
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    //console.log("route", props.route.params.route)
    const dataOffers = props.route.params.dataOffers; // recuperation des infos du parent

    const offerTitle = dataOffers.offerTitle
    const idProduct = dataOffers.id
    const descriptionOffer = dataOffers.description
    const categoryOffer = dataOffers.category
    const cityData = dataOffers.locations[0]
    const sellerNameOffer = dataOffers.sellerName
    const priceOffer = dataOffers.price
    // const images = dataOffers.images[0] // mapper les photos pour toutes les afficher par la suite
    const imagesToMap = dataOffers.images
    const dateData = dataOffers.date
    const date = new Date(dateData)
    let jour = date.getDate()
    let mois = date.getMonth() + 1
    let annee = date.getFullYear()
    let dateMiseEnVente = `${jour}/${mois}/${annee}`

    const [modify, setModify] = useState(false) // affichage conditionel en cours de modification

    const [modalVisible, setModalVisible] = useState(false);
    const [modalAddPhoto, setmMdalAddPhoto] = useState(false)
    const [modalProfilVendeur, setModalProfilVendeur] = useState(false)
    const [emptyField, setEmptyField] = useState(false)
    const [openTakePhotoModal, setOpenTakePhotoModal] = useState(false); // modal pour prendre une photo
    const [openPhoto, setOpenPhoto] = useState(false);
    const [displayOpenPhoto, setDisplayOpenPhoto] = useState("")
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

    const [contactSeller, setContactSeller] = useState("")
    const [mailSeller, setMailSeller] = useState("")
    const [descriptionSeller, setDescriptionSeller] = useState("")
    const [lieuxSeller, setLieuxSeller] = useState("")
    const [avatarSeller, setAvatarSeller] = useState("")

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [locations, setLocations] = useState('');
    const [category, setCategory] = useState('');
    const store = ["Loisir", 'Informatique', "Maison", "Jardin", 'Vêtement', "Automobile"]
    const citiesData = ['Moroni', 'Mutsamudu', 'Fomboni', 'Iconi', 'Itsandra', 'MalÃ©', 'Ouellah', 'Sima'];

    const [isOwner, setIsOwner] = useState(false)


    //console.log(dateMiseEnVente)
    const user = useSelector((state) => state.user.value);
    const token = user.token
    const photoReducer = user.photos
    // console.log(photoReducer)



    useFocusEffect(
        React.useCallback(() => {
            //console.log('ici')
            dispatch(deleteAllPhoto())
            setName(offerTitle)
            setDescription(descriptionOffer)
            setPrice(priceOffer)
            setLocations(cityData)
            setCategory(categoryOffer)
            for (let i = 0; i < imagesToMap.length; i++) {
                dispatch(addPhoto(imagesToMap[i]))
            }
            // Vérifier si l'utilisateur est celui qui a posté l'offre de vente: si oui: alors accès aux boutons modifier et si non accès au bouton contact et profil vendeur
            fetch(`${backendAddress}/users/checkIfUserIsSeller`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: token,
                    id: idProduct,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        setIsOwner(data.result)
                    } else {
                        if (data.info) {
                            // console.log('aqui', data)
                            setContactSeller(data.username)
                            setMailSeller(data.mail)
                            setDescriptionSeller(data.description)
                            setLieuxSeller(data.location)
                            setAvatarSeller(data.avatarUrl)
                        }
                    }
                })
        }, [])
    );
    //console.log(photoReducer)
    const ConfirmationDelete = () => {
        setModalVisible(true)
    }
    const deleteOffer = () => {
        console.log("ici")
        fetch(`${backendAddress}/offers/deleteOffer/${idProduct}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                setModalVisible(!modalVisible)
                props.navigation.navigate("AcceuilScreen")
            });
    }
    const changeOffer = () => {
        setModify(true)
    }
    const confirmChange = async () => {
        if (name === "" || description === '' || price === '') {
            setEmptyField(true)
        } else {
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

                // console.log('response trouvée : ', photoSaveCloudinaty)

                photos.push(photoSaveCloudinaty.url) // stock les url cloudinary dans une var
                //console.log('photos', photos)

            }
            fetch(`${backendAddress}/offers/modifyOffer/${idProduct}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    offerTitle: name,
                    images: photos,
                    description: description,
                    category: category,
                    price: price,
                    locations: locations,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    dispatch(deleteAllPhoto())
                    props.navigation.navigate("AcceuilScreen")
                })
        }
    }
    const deletePhotoDisplay = (picture) => {
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
        setOpenTakePhotoModal(true)
    }

    const closeTakePhotoModal = () => {
        setOpenTakePhotoModal(false);
        setmMdalAddPhoto(false)
    };

    const openModalPhoto = (data) => {
        setOpenPhoto(true)
        setDisplayOpenPhoto(data)
    }
    const navigateNext = () => {
        setCurrentPhotoIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            return newIndex >= photoReducer.length ? 0 : newIndex;
        });
    };

    const goToMessage = () => {
        props.navigation.navigate("Message", { data: dataOffers })
    }
    const photos = photoReducer && photoReducer.map((data, i) => {
        return (
            <TouchableOpacity key={i} onPress={() => openModalPhoto(data)} style={{ width: '100%', height: '45%' }}>
                <ImageBackground source={{ uri: data }} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        {modify && <View style={styles.displayPhoto}>
                            <TouchableOpacity onPress={() => setmMdalAddPhoto(true)} style={styles.addPicture}>
                                <Text>Ajoutez des photos</Text>
                                <MaterialIcons name="add-a-photo" size={55} color="black" />
                            </TouchableOpacity>
                        </View>}
                        <View style={{ marginLeft: '50%' }}>
                            {modify && <TouchableOpacity onPress={() => deletePhotoDisplay(data)} style={{ marginTop: '5%', height: '20%', borderRadius: 50 }}>
                                <Entypo name="circle-with-cross" size={35} color="black" style={{ backgroundColor: 'white' }} />
                            </TouchableOpacity>}
                            {currentPhotoIndex === i && (
                                <TouchableOpacity onPress={navigateNext} style={!modify ?
                                    { marginLeft: '80%', marginTop: '65%', backgroundColor: 'white', borderRadius: 18, height: '21%', width: '20%', alignItems: 'center', justifyContent: 'center' }
                                    : { marginTop: '250%', backgroundColor: 'white', borderRadius: 50, height: '17%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Feather name="arrow-right" size={32} color="black" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <Text style={{ color: 'white', marginLeft: '90%', marginTop: '28%' }}>{i + 1}/{photoReducer.length}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    });

    return (
        <View style={styles.container}>

            <Header />
            {photos[currentPhotoIndex]}
            <View style={styles.product}>

                <View style={styles.descProd}>
                    <View >

                        {!modify ?
                            <Text style={styles.detail} >{offerTitle}</Text>
                            : <TextInput onChangeText={(value) => setName(value)} value={name} style={styles.detail} placeholder=" Nom" maxLength={200}></TextInput>}
                    </View>
                    <View >
                        {!modify ?
                            <Text style={styles.description}>{descriptionOffer}</Text>
                            : <TextInput onChangeText={(value) => setDescription(value)} value={description} style={styles.description} placeholder=" Description" maxLength={400}></TextInput>}
                    </View>
                    <View >

                        {!modify ? (<View style={{ flexDirection: 'row' }}>
                            <Text style={styles.price} >{priceOffer}</Text>
                            <Text style={{ marginLeft: '5%' }}>CFA</Text>
                        </View >)
                            : <TextInput onChangeText={(value) => setPrice(value)} value={price} style={styles.price} placeholder=" Prix" maxLength={200} keyboardType="numeric"></TextInput>}
                    </View>
                    <Text>Date de mise en ligne: {dateMiseEnVente}</Text>
                    {!modify ? <View >
                        <Text style={styles.list} >{categoryOffer} </Text>
                    </View> :
                        (<SelectList
                            setSelected={(val) => setCategory(val)}
                            data={store}
                            save="value"
                            placeholder={category}
                            search={false}
                            maxHeight={100}
                        />)}
                    {!modify ? <View >
                        <Text style={styles.list}>{cityData} </Text>
                    </View> :
                        (<SelectList
                            setSelected={(val) => setLocations(val)}
                            data={citiesData}
                            save="value"
                            placeholder={locations}
                            search={false}
                            maxHeight={100}
                        />)}

                    {isOwner ?
                        <View >
                            {modify ?
                                <View style={styles.blocModiSuppr} >
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
                        : <View style={styles.blocModiSuppr}>
                            <TouchableOpacity style={styles.send1} onPress={() => { setModalProfilVendeur(!modalProfilVendeur) }} >
                                <Text>Voir le profil du vendeur {sellerNameOffer} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.send1} onPress={goToMessage}>
                                <Text>Contacter le vendeur</Text>
                            </TouchableOpacity>
                        </View>}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.ModalAcceuil} >
                    <View style={styles.modalView}>
                        <View>
                            <Text>Etes vous sur de vouloir supprimer cette offre ? </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => deleteOffer()} style={styles.send1}>
                                <Text>Oui</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.suppr}>
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
                    setOpenTakePhotoModal(!openTakePhotoModal);
                    //console.log(modalVisible)
                }}>
                <Photo closeModal={closeTakePhotoModal} />
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
                    <ImageBackground source={{ uri: displayOpenPhoto }} style={{ width: 380, height: 450, margin: 20 }} >
                        <TouchableOpacity onPress={() => { deletePhotoDisplay(displayOpenPhoto); setOpenPhoto(!openPhoto) }}>
                            {isOwner && modify && (<AntDesign name="closecircle" size={30} color="green" style={{ marginLeft: '75%', marginTop: 10 }} />)}
                        </TouchableOpacity>
                    </ImageBackground>
                </Pressable>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalProfilVendeur}
                onRequestClose={() => {
                    setModalProfilVendeur(!modalProfilVendeur);
                    //console.log(modalVisible)
                }}>
                <Pressable onPress={() => setModalProfilVendeur(!modalProfilVendeur)} style={styles.ModalProfil} >
                    <View style={styles.containerContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.h1}>Profil du Vendeur</Text>
                            <TouchableOpacity onPress={() => setModalProfilVendeur(!modalProfilVendeur)}>
                                <AntDesign name="closecircle" size={30} color="green" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userBlock}>

                            {avatarSeller ? <Image source={{ uri: avatarSeller }} style={{ height: '100%', width: '40%', marginLeft: '5%' }} /> : <></>}

                            <View style={styles.allinfosProfil}>
                                <Text style={styles.name}>Nom : {sellerNameOffer}</Text>
                                <Text style={styles.tel}>Tél. : {contactSeller}</Text>
                                <Text style={styles.mail}>email : {mailSeller} </Text>
                            </View>

                        </View>
                        <Text style={styles.h2}>Description</Text>
                        <View style={styles.descriptionBloc}>
                            <Text style={styles.whiteText}>{descriptionSeller}</Text>
                        </View>
                        <Text style={styles.h2}>Lieux favoris</Text>
                        <View style={styles.descriptionBloc}>
                            <Text style={styles.whiteText}>test</Text>
                        </View>

                        <View>

                        </View>


                    </View>
                </Pressable>
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

    detail: {
        fontSize: 25,
    },

    containerContent: {
        width: '85%',
        height: '70%',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'space-between'
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
        alignItems: 'center',
        height: '8%'

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
    ModalProfil: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        height: 30,
        width: '100%',
        borderRadius: 10,
        // fontFamily: 'MontserratMedium',
        fontSize: 14,

    },
    displayPhoto: {
        flexDirection: 'row',
        marginTop: '15%'

    },
    blocModiSuppr: {
        alignItems: 'center',
        marginTop: '5%'
    },
    addPicture: {
        width: 120,
        height: 120,
        marginRight: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100%'
    },
    iconModal: {
        marginRight: 10
    },
    description: {
        fontSize: 16,
    },
    list: {
        fontSize: 15
    },
    price: {
        fontSize: 16
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
    h1: {
        // fontFamily: 'MontserratMedium',
        fontSize: 28,
        color: '#BAB700',
        fontWeight: 'bold'
    },
    allinfosProfil: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: '5%'
    },
    name: {
        // height: 35,
        marginTop: '5%',
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: 'flex-start',
        color: 'white',
    },

    tel: {
        marginBottom: '2%',
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
    whiteText: {
        // fontFamily: 'MontserratRegular',
        fontSize: 16,
        color: 'white',
    },
})