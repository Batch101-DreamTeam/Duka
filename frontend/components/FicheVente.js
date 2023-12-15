import { StyleSheet, ScrollView, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image, Modal, Pressable } from 'react-native';
import Header from '../components/Header';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BACKEND_ADDRESS } from "@env"
const backendAddress = BACKEND_ADDRESS;

export default function FicheVente({ route }) {
    const { offerData } = route.params; // recuperation des infos du parent
    const offerTitle = offerData.offerTitle
    const idProduct = offerData._id
    const description = offerData.description
    const price = offerData.price
    const images = offerData.images[0] // mapper les photos pour toutes les afficher par la suite
    const [modalVisible, setModalVisible] = useState(false);


    const user = useSelector((state) => state.user.value);
    const token = user.token

    const ConfirmationDelete = () => {
        setModalVisible(true)
    }
    const deleteOffer = () => {
        fetch(`${backendAddress}/offers/deleteOffer/${idProduct}`,
            // method: Delete
        )
            .then(response => response.json())
            .then(data => {
                setOffersData(data.offers);
            });
    }
    return (
        <View style={styles.container}>

            <Header />
            <Image style={styles.image} source={{ uri: images }} />
            <View style={styles.product}>


                <View style={styles.descProd}>
                    <View style={styles.row}>
                        <Text> Nom</Text>
                        <Text >{offerTitle}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text> description</Text>
                        <Text >{description}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text> price</Text>
                        <Text >{price}</Text>
                    </View>
                    <TouchableOpacity style={styles.send}>
                        <Text> Modifier les informations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.suppr} onPress={() => ConfirmationDelete()}>
                        <Text> Supprimer l'offre</Text>
                    </TouchableOpacity>
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
        flexDirection: "row",
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
})