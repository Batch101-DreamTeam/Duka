import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import ResultSearch from '../components/ResultSearch';
import { BACKEND_ADDRESS } from "@env"
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { newSearch, nameSearch } from '../reducers/offer'
import { MaterialIcons } from '@expo/vector-icons';
const backendAddress = BACKEND_ADDRESS;

export default function AcceuilScreen({ navigation, route }) {
    // console.log("acceuil", route)
    const user = useSelector((state) => state.user.value);
    const token = user.token
    const Favorites = user.favorites;
    const offer = useSelector((state) => state.offer.value);

    const offerName = offer.nameOfResearch
    const resultSearchUser = offer.resultSearch
    // console.log(offer)
    const dispatch = useDispatch();

    const [offersData, setOffersData] = useState([]);
    console.log(resultSearchUser);
    useFocusEffect(
        React.useCallback(() => {
            if (resultSearchUser) {
                setOffersData(resultSearchUser)
            } else {
                // setOffersData([]);
                console.log(backendAddress)
                fetch(`${backendAddress}/offers/allOffers`, {
                    method: 'GET',
                    // headers: { 
                    //     'Cache-Control': 'no-cache',
                    //   }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("alors fetch")
                        if (data.offers) {
                            setOffersData(data.offers);
                            console.log('rechaokrge')
                            // setArticlesData(data.articles.filter((data, i) => i > 0));
                        }
                        else {
                            console.log('aucune donnée')
                            return
                        }
                    });
            }
        }, [resultSearchUser, Favorites])
    )

    useEffect(() => {
        return () => dispatch(newSearch(""));
    }, []);

    const deleteSearch = () => {
        dispatch(newSearch())
        dispatch(nameSearch())
    }

    const offers = offersData && offersData.map((data, i) => {
        const isLiked = Favorites?.some((offer) => offer.id === data._id);
        return <ResultSearch
            key={i}
            sellerName={data.sellerName}
            offerTitle={data.offerTitle}
            locations={data.locations}
            images={data.images}
            description={data.description}
            price={data.price}
            category={data.category}
            id={data._id}
            navigation={navigation}
            route={route}
            isLiked={isLiked}
        />;
    }
    );
    return (



        <View style={styles.container}>

            <Header navigation={navigation} />
            <InputSearch />
            <View style={styles.containerContent}>
                {offerName &&
                    <View>
                        <View style={styles.votreRecherche}>
                            <Text>Votre recherche: </Text>
                            <Text>{offerName}</Text>
                            <TouchableOpacity onPress={() => deleteSearch()}>
                                <MaterialIcons name="cancel" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {!offersData && <Text>Pas de résultat</Text>}
                    </View>}
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
    votreRecherche: {
        flexDirection: 'row'

    }

});