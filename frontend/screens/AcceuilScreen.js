import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import ResultSearch from '../components/ResultSearch';

import { BACKEND_ADDRESS } from "@env";
const backendAddress = BACKEND_ADDRESS;
//console.log(backendAddress)
// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };
// BACKEND_ADDRESS = 'http://192.168.43.46:3000'
export default function AcceuilScreen({ navigation }) {

    const [offersData, setOffersData] = useState([]);

    useEffect(() => {
        fetch(`${backendAddress}/offers/allOffers`)
            .then(response => response.json())
            .then(data => {
                // console.log(data.offers)
                setOffersData(data.offers);
                // setArticlesData(data.articles.filter((data, i) => i > 0));
            });
    }, []);

    const offers = offersData.map((data, i) => {
        // const isLiked = likedMovies.some(movie => movie === data.title);
        return <ResultSearch
            key={i}
            offerTitle={data.offerTitle}
            images={data.images[0]}
            description={data.description}
            price={data.price}
            category={data.category}
        />;
    });
    return (



        <View style={styles.container}>

            <Header navigation={navigation} />
            <InputSearch />
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