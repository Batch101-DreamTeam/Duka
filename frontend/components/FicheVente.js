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

export default function FicheVente({ route, navigation }) {
    const dispatch = useDispatch()
    //console.log(route.locations)
    const { offerData } = route.params; // recuperation des infos du parent

    const offerTitle = offerData.offerTitle
    const idProduct = offerData._id
    const descriptionOffer = offerData.description
    const categoryOffer = offerData.category
    const cityData = offerData.locations[0]
    const priceOffer = offerData.price
    const images = offerData.images[0] // mapper les photos pour toutes les afficher par la suite
    const imagesToMap = offerData.images

    const [modify, setModify] = useState(false) // affichage conditionel en cours de modification

    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
    const [emptyField, setEmptyField] = useState(false)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [locations, setLocations] = useState('');
    const [category, setCategory] = useState('');
    const store = ["Loisir", 'Informatique', "Maison", "Jardin", 'Vêtement', "Automobile"]
    const citiesData = ['Moroni', 'Mutsamudu', 'Fomboni', 'Iconi', 'Itsandra', 'MalÃ©', 'Ouellah', 'Sima'];

    // console.log(name)

    const user = useSelector((state) => state.user.value);
    const token = user.token
    const photoReducer = user.photos


    useEffect(() => {
        setName(offerTitle)
        setDescription(descriptionOffer)
        setPrice(priceOffer)
        setLocations(cityData)
        setCategory(categoryOffer)
        dispatch(deleteAllPhoto)
        for (let i = 0; i < photoReducer; i++) {
            dispatch(addPhoto(photoReducer[i]))
        }
    }, []);

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
                    // images: req.body.images,
                    description: description,
                    category: category,
                    price: price,
                    locations: locations,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    navigation.navigate("MesVentes")
                })
        }
    }
    const photos = imagesToMap.map((data, i) => { // afficher les photos stockés dans le reducer (mettre une limite max?)
        return (
            <TouchableOpacity key={i}  >
                <ImageBackground source={{ uri: data }} style={{ width: 120, height: 120, marginRight: 20 }} >
                    <TouchableOpacity>
                        <AntDesign name="closecircle" size={30} color="green" style={{ marginLeft: '75%', marginTop: 10 }} />
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
        );
    });

    return (
        <View style={styles.container}>

            <Header />
            {photos}
            <View style={styles.product}>


                <View style={styles.descProd}>
                    <View style={styles.row}>
                        <Text> Nom</Text>
                        {!modify ?
                            <Text >{offerTitle}</Text>
                            : <TextInput onChangeText={(value) => setName(value)} value={name} style={styles.inputSearch} placeholder=" Nom" maxLength={200}></TextInput>}
                    </View>
                    <View style={styles.row}>
                        <Text> description</Text>
                        {!modify ?
                            <Text >{descriptionOffer}</Text>
                            : <TextInput onChangeText={(value) => setDescription(value)} value={description} style={styles.inputSearch} placeholder=" Description" maxLength={400}></TextInput>}
                    </View>
                    <View style={styles.row}>
                        <Text> Prix</Text>
                        {!modify ?
                            <Text >{priceOffer}</Text>
                            : <TextInput onChangeText={(value) => setPrice(value)} value={price} style={styles.inputSearch} placeholder=" Prix" maxLength={200} keyboardType="numeric"></TextInput>}
                    </View>

                    <View style={styles.slectlist}>
                        {!modify ? <Text>{categoryOffer} </Text> :
                            (<SelectList
                                setSelected={(val) => setSelected(val)}
                                data={store}
                                save="value"
                                placeholder={category}
                                search={false}
                                maxHeight={150}
                            />)}
                        {!modify ? <Text>{cityData} </Text> :
                            (<SelectList
                                setSelected={(val) => setLocations(val)}
                                data={citiesData}
                                save="value"
                                placeholder={locations}
                                search={false}
                            />)}
                    </View>
                    {modify ? <TouchableOpacity onPress={() => confirmChange()} style={styles.send}>
                        <Text> Confirmer les changements</Text>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => changeOffer()} style={styles.send}>
                            <Text> Modifier les informations</Text>
                        </TouchableOpacity>}
                    {emptyField && <Text>Veuillez remplir les champs</Text>}
                    {modify ? <TouchableOpacity style={styles.suppr} onPress={() => { setModify(false); setEmptyField(false) }}>
                        <Text> Annuler</Text>
                    </TouchableOpacity>
                        : <TouchableOpacity style={styles.suppr} onPress={() => ConfirmationDelete()}>
                            <Text> Supprimer l'offre</Text>
                        </TouchableOpacity>}

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
        height: 180,
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
    row: {
        flexDirection: "column",
        backgroundColor: 'yellow',
        marginBottom: 10
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
})