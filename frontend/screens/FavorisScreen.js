import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome/';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Connection from '../components/Connection';
import Inscription from '../components/Inscription';

export default function FavorisScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const token = user.token
    const Favorites = user.favorites;
    const dispatch = useDispatch();
    // const displayFav = Favorites.map((el, i) => {
    //     return <Text key={i}> {el.id} </Text>
    // })

    let display;

    if (!token) {
        display = <View style={styles.containerContent}>
            <Text style={styles.h3}>Vous devez d'abord vous connecter pour accéder à ce service</Text>
            <Connection />
            <Inscription />
        </View>
    }
    else if (token && !Favorites.length) {
        display = <View style={styles.containerContent}>
            <Text style={styles.margin}> No offer added yet ?</Text>

            <Text> ADD NEW OFFER</Text>
            <TouchableOpacity onPress={() => { console.log('redirectToConnectPage'), navigation.navigate('Acceuil') }} style={styles.plus}>
                <FontAwesome name="plus" size={100} />
            </TouchableOpacity>
        </View>
    }
    else if (token && Favorites.length) {
        display = <>{displayFav}</>
    }
    console.log(Favorites)
    //  console.log(user)




    return (
        <SafeAreaView style={styles.container}>
            <Header />
            {display}
            {/* { !Favorites.length ? (  
            <View style={styles.containerContent}>
                <Text style={styles.margin}>No offer added yet ?</Text>

                <Text> ADD NEW OFFER</Text>
                    <TouchableOpacity onPress={()=> {console.log('redirectToConnectPage'), navigation.navigate('Acceuil')}} style={styles.plus}>
                        <FontAwesome name="plus" size={100} />
                    </TouchableOpacity>
            </View>
            ) : ( 
            <View style={styles.containerContent}>
             {displayFav} 
             </View>
            )} */}
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    margin: {
        marginBottom: 50,
        fontSize: 20
    },
    containerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '',
    },
    plus: {
        width: 100,
        height: 100,
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    }



});