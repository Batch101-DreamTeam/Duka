import { StyleSheet, ScrollView, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Header from '../components/Header';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResultSearch from '../components/ResultSearch';

import { BACKEND_ADDRESS } from "@env"
const backendAddress = BACKEND_ADDRESS;

export default function MesVentes({ navigation }) {

    const [offersData, setOffersData] = useState([]);
    const user = useSelector((state) => state.user.value);
    const token = user.token

    useEffect(() => {
        fetch(`${backendAddress}/offers/allOffersBySeller/${token}`)
            .then(response => response.json())
            .then(data => {
                setOffersData(data.offers);
            });
    }, []);

    const handleNavigate = (data) => {
        navigation.navigate("FicheVente", { offerData: data });
    };


    const offers = offersData.map((data, i) => {
        return (
            <TouchableOpacity key={i} data={data} onPress={() => handleNavigate(data)}>
                <ResultSearch
                    offerTitle={data.offerTitle}
                    images={data.images[0]}
                    description={data.description}
                    price={data.price}
                    category={data.category}
                />
            </TouchableOpacity>
        )
    });


    return (
        <View style={styles.container}>

            <Header />

            <View style={styles.containerContent}>
                <ScrollView style={styles.scrollView}>

                    <View style={styles.productList}>
                        {offers}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    containerContent: {
        flex: 1,
        borderRadius: 20,
        // marginTop: 100,
        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    scrollView: {
        // backgroundColor: 'red',
        padding: 3,
        // marginHorizontal: 2,
        // marginVertical: 2,
        // minHeight: '40%',
        maxHeight: '100%',
    },
    productList: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        // minHeight: '45%',
        // padding: 0,
        paddingBottom: '1%',
        // backgroundColor: 'black',
        // justifyContent: 'center',
        // alignItems: 'center',
    },

});