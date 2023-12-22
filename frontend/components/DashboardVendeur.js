import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Modal, Alert, Pressable, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, updateToken, updateMail } from '../reducers/user'
import { useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { BACKEND_ADDRESS } from "@env"
import Inscription from './Inscription';
import Connection from './Connection';
import Header from '../components/Header';
import MesVentes from '../screens/MesVentes';
import ResultSearch from './ResultSearch';
const backendAddress = BACKEND_ADDRESS;


export default function DashboardVendeur(props, { navigation, route }) {
    //console.log("nein", navigation)
    const [offersData, setOffersData] = useState([]);
    const [haveOffers, setHaveOffers] = useState(false)
    const user = useSelector((state) => state.user.value);
    const token = user.token
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {

                const response = await fetch(`${backendAddress}/offers/allOffersBySeller/${token}`);
                const newData = await response.json();
                setOffersData(newData.offers);
                if (newData.offers.length === 0) {
                    setHaveOffers(true)
                }
            };
            fetchData();
        }, [])
    );

    const GotoMesVentes = () => {
        props.navigation.navigate("MesVentes", { navigation: navigation })
    }
    const GotoAjouterVente = () => {
        props.navigation.navigate("VendreScreen", { navigation: navigation })
    }
    const offers = offersData && offersData.map((data, i) => {
        console.log(data)
        return (
            <ResultSearch
                key={i}
                offerTitle={data.offerTitle}
                locations={data.locations}
                images={data.images}
                description={data.description}
                price={data.price}
                category={data.category}
                id={data._id}
                navigation={props.navigation}
                route={route}
            />
        )
    });

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {token ?
                <View style={styles.container}>
                    {!haveOffers &&
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={styles.send1} onPress={GotoMesVentes}>
                                <Text >Voir toutes mes offres de vente</Text>
                            </TouchableOpacity >
                            <ScrollView style={styles.scrollView}>

                                <View style={styles.productList}>
                                    {offers}
                                </View>
                            </ScrollView>

                            <TouchableOpacity style={styles.send1}>
                                <Text>Consuler mes derners messages</Text>
                            </TouchableOpacity >
                        </View>}
                </View>
                : <Text>Vous devez vous connecter pour accéder à ce service</Text>}
            <TouchableOpacity style={styles.send1} onPress={GotoAjouterVente}>
                <Text>Ajouter une nouvelle offre</Text>
            </TouchableOpacity >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'

    },
    scrollView: {
        borderBottomWidth: 2,
        borderTopWidth: 2,

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
        marginBottom: '5%',
        marginTop: '5%'

    },

});