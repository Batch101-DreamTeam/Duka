import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_ADDRESS } from "@env";
import { updateName, updateToken, updateMail, deleteAllPhoto, deleteAllfavs, removeProfilePhoto } from '../reducers/user';
import React, { useState, useEffect, useRef } from 'react';
import { Foundation } from '@expo/vector-icons';
const backendAddress = BACKEND_ADDRESS;


export default function ListeMessages(props) {
    console.log('props', props)
    // let messages = messages.push(props.messages);

    // console.log('promes', messages)
    // let username = props.messages[0].username;
    // let text = props.messages[0].text;
    // const handleNavigate = (data) => {
    //     console.log(data.offer)
    //     dataOffers = data.offer;
    // props.navigation.navigate("Message", { dataOffers: dataOffers });
    // };
    const goToMessage = () => {

        props.navigation.navigate("MessageBis", { offerId: props.offer._id, userTwo: props.messages[0].username })
        // props.navigation.navigate("MessageBis", { data: dataOffers })
        console.log('props2', props.offer._id)
    }
    return (
        <>

            <TouchableOpacity onPress={goToMessage}>
                <View>
                    <Text>{props.dateOfCreation}</Text>
                    <Text>{props.offer.offerTitle}</Text>
                    {/* <Text>{text}</Text> */}
                </View>
            </TouchableOpacity>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        marginBottom: 0,
        backgroundColor: '#14342B',
        marginTop: 30,
    },
    duka: {
        marginTop: 10,
        fontSize: 28,

    },
    topRightHeader: {
        flexDirection: 'row',
        color: 'white'
    },
    iconRightHeader: {
        color: 'white'
    },

    logo: {
        width: '35%',
        height: '35%',
        marginRight: 10,
        padding: 25,
        marginTop: 10,
        marginBottom: 20
    },

});