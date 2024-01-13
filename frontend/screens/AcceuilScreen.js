import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import ResultSearch from '../components/ResultSearch';
import AlternHome from '../components/AlternHome';
import { BACKEND_ADDRESS } from "@env"
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { newSearch, nameSearch, filterApply } from '../reducers/offer'
import { MaterialIcons } from '@expo/vector-icons';
const backendAddress = BACKEND_ADDRESS;

export default function AcceuilScreen({ navigation, route }) {// ne pas mettre PROPS
    //console.log("acceuil", navigation)
    
    const [refreshing, setRefreshing] = useState(false);
    const user = useSelector((state) => state.user.value);
    const token = user.token
    const Favorites = user.favorites;
    const offer = useSelector((state) => state.offer.value);
    const filterOn = offer.haveFilter
    const offerName = offer.nameOfResearch
    const resultSearchUser = offer.resultSearch
    const dispatch = useDispatch();
    const [offersData, setOffersData] = useState([]);



    const callOfData = () => {
        fetch(`${backendAddress}/offers/allOffers`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log("alors fetch")
                if (data.offers) {
                    setOffersData(data.offers);
                    setRefreshing(false);
                    // console.log('rechaokrge')
                    // setArticlesData(data.articles.filter((data, i) => i > 0));                       
                }
                else {
                    console.log('aucune donnée')
                    return
                }
            });
    }

    const onRefresh = () => {
        console.log('res')
        setRefreshing(true); // Démarre le rafraîchissement
        callOfData(); // Appelle la fonction pour récupérer les nouvelles données
    };

    useFocusEffect(
        React.useCallback(() => {
            if (resultSearchUser) {
                setOffersData(resultSearchUser)
            } else {
                // setOffersData([]);
                // console.log(backendAddress)
                callOfData()
            }
        }, [resultSearchUser, Favorites])
    )
    useEffect(() => {
        return () => dispatch(newSearch(""));
    }, [Favorites]);

    const deleteSearch = () => {
        dispatch(newSearch())
        dispatch(nameSearch())
        dispatch(filterApply(false))
    }

    const offers = offersData && offersData.map((data, i) => {
        const isLiked = Favorites?.some((offer) => {
            //    console.log(offer._id)
            return offer.id === data._id
        });
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
            date={data.dateOfCreation}
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
                        {!offersData.length && <Text>Pas de résultat</Text>}
                    </View>}
                {filterOn &&
                    <View style={styles.votreRecherche}>
                        <Text>Supprimer les filtres</Text>
                        <TouchableOpacity onPress={() => deleteSearch()}>
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                }
                <ScrollView
                    style={styles.scrollView}
                //  refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
                //     />
                // }
                >
                    {offersData ?

                        <View style={styles.productList}>
                            {offers}
                        </View> :
                        <AlternHome />

                    }

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