import { useEffect, useState } from 'react';
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

export default function AcceuilScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const token = user.token
    const Favorites = user.favorites;
    const offer = useSelector((state) => state.offer.value);

    const offerName = offer.nameOfResearch
    const resultSearchUser = offer.resultSearch
    console.log(offer)
    const dispatch = useDispatch();

    const [offersData, setOffersData] = useState([]);

    useEffect(() => {
// <<<<<<< HEAD
//         fetch(`${backendAddress}/offers/allOffers`)
//             .then(response => response.json())
//             .then(data => {
//                 // console.log(data.offers)
//                 if(data.offers.length){
//                 setOffersData(data.offers);
//                 // setArticlesData(data.articles.filter((data, i) => i > 0));
//                 }
//                 else{
//                   console.log('aucune donnée')
//                   return 
//                 }
//             });
//     }, [Favorites]);

    // const offers = offersData.map((data, i) => {
    //   if(!Favorites.length){
    //     return <ResultSearch
    //     key={i}
    //     offerTitle={data.offerTitle}
    //     images={data.images[0]}
    //     description={data.description}
    //     price={data.price}
    //     category={data.category}
    //     id={data._id}
    //     isLiked={false}
    //     />;
    //   }
    //   else{
    //     const isLiked = Favorites.some((offer) => offer.id === data._id);
        if (resultSearchUser) {
            setOffersData(resultSearchUser.searchOnWord)
        } else {
            fetch(`${backendAddress}/offers/allOffers`)
                .then(response => response.json())
                .then(data => {
                    console.log("alors fetch")
                    if (data.offers) {
                        setOffersData(data.offers);
                        // setArticlesData(data.articles.filter((data, i) => i > 0));
                    }
                    else {
                        console.log('aucune donnée')
                        return
                    }
                });
        }
    }, [resultSearchUser]);

    useEffect(() => {
        return () => dispatch(newSearch(""));
    }, []);

    const deleteSearch = () => {
        dispatch(newSearch())
        dispatch(nameSearch())
    }

    const handleNavigate = (data) => {
        navigation.navigate("OfferScreen", { dataOffers: data });
    };

    const offers = offersData && offersData.map((data, i) => {
        // const isLiked = Favorites.some((offer) => offer._id === data._id);
        return <ResultSearch
            key={i}
            offerTitle={data.offerTitle}
            images={data.images[0]}
            description={data.description}
            price={data.price}
            category={data.category}
            id={data._id}
            handleNavigate={handleNavigate}
        // isLiked={isLiked}
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
                            <Text>Votre recherche:</Text>
                            <Text>{offerName}</Text>
                            <TouchableOpacity onPress={() => deleteSearch()}>
                                <MaterialIcons name="cancel" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {!offer.resultSearch.result && <Text>Pas de résultat</Text>}
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