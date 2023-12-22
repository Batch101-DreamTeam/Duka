
import {
    KeyboardAvoidingView, View, StyleSheet, Text, ScrollView, TextInput, Pressable, Image, TouchableOpacity
} from 'react-native';
// import NetInfo from "@react-native-community/netinfo";
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js/react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import InfoContainer from '../components/messagesElements/InfoContainer';
import SingleMessage from '../components/messagesElements/SingleMessage';
import Header from '../components/Header';
// import ButtonIcon from '../components/buttons/ButtonIcon';
import { Ionicons } from '@expo/vector-icons';
import { BACKEND_ADDRESS } from "@env";
const backendAddress = BACKEND_ADDRESS;


export default function ListeMessageScreen(props, { navigation }) {
    const isFocused = useIsFocused();
    let pusher = null;
    const user = useSelector((state) => state.user.value);
    // console.log(user)
    useEffect(() => {
        if (isFocused) {

            (async () => {
                // const response = await fetch(`${backendAddress}/messages/allPreviousMessages/${user.token}`)
                // const data = await response.json();
                // console.log("la data:", data);


                // aller chercher tous les messages reçus par le user

                // const response = await fetch(`${backendAddress}/messages/${user.token}`)
                // const data = await response.json();
                // console.log(data);

                // pusher = new Pusher('3295d486d5ad2af1a1af', { cluster: 'eu' });
                // const respon = await fetch(`${backendAddress}/messages/previousMessages/${chatname}`)
                // const dataPrev = await respon.json();
                // setMessages(dataPrev.messages)


                // const resp = await fetch(`${backendAddress}/messages/${chatname}/${user.name}`, {
                //     method: 'PUT',
                // })


                // const subscription = pusher.subscribe(chatname);

                // subscription.bind('pusher:subscription_succeeded', () => {
                //     subscription.bind('message', handleReceiveMessage);
                // });

            })();
        }
    }, [isFocused]);

    return (
        // objInfo.sellerName &&
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.infos}>
                <View style={styles.infosArticle}>
                    {/* <Text style={styles.white}>Vendeur : {seller.username}  </Text>
                        <Text style={styles.white}> Produit: {product.offerTitle} </Text> */}
                </View>
                <View style={styles.photoArticle}>
                    {/* <Image style={styles.image} source={{ uri: imgProduct }} /> */}

                </View>

            </View>
            <ScrollView style={styles.scrollView}>
                <Text>message reçus</Text>
            </ScrollView>
            <View style={styles.SearchRow} >



            </View>
        </View>


    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },

    scrollView: {
        backgroundColor: 'white',
        padding: 3,
        maxHeight: '100%',
    },
    SearchRow: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        // marginBottom: 15,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    blocMessage: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        textAlign: 'left',
        width: '90%',
        height: '100%',
        borderWidth: 2,
        borderRadius: 10,
        // marginBottom: 15,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    message: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        textAlign: 'center',
        width: '90%',
        height: '100%',
        borderWidth: 2,
        borderRadius: 10,
        // marginBottom: 15,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infos: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 70,
        // backgroundColor: 'rgba(52, 52, 52)',
        backgroundColor: 'grey',
        // opacity: 0.9,
        padding: '1%',
        marginTop: 1,
    },
    white: {
        color: 'white',

    },
    image: {
        height: 60,
        width: 80,
    },

})
