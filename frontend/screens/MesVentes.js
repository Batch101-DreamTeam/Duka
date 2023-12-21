import { StyleSheet, ScrollView, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Header from '../components/Header';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResultSearch from '../components/ResultSearch';
import { useFocusEffect } from '@react-navigation/native';
import { BACKEND_ADDRESS } from "@env"
const backendAddress = BACKEND_ADDRESS;

export default function MesVentes({ navigation, route }) {
    //console.log('ici')
    const [offersData, setOffersData] = useState([]);
    const user = useSelector((state) => state.user.value);
    const token = user.token
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const response = await fetch(`${backendAddress}/offers/allOffersBySeller/${token}`);
                const newData = await response.json();
                setOffersData(newData.offers);
            };
            fetchData();
        }, [])
    );
    // const handleNavigate = (data) => {
    //     navigation.navigate("FicheVente", { dataOffers: data });
    // };


    const offers = offersData && offersData.map((data, i) => {
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
                navigation={navigation}
                route={route}
            />
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