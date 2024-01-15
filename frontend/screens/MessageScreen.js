
import {
    KeyboardAvoidingView, View, StyleSheet, Text, ScrollView, TextInput, Pressable, Image, TouchableOpacity
} from 'react-native';
// import NetInfo from "@react-native-community/netinfo";
import Connexion from '../components/Connexion';
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


export default function MessageScreen(props) {
    console.log(props)
    const idProduct = props.route.params.data.id;
    const imgProduct = props.route.params.data.images[0];
    // console.log("regarde ici", imgProduct);

    const isFocused = useIsFocused();
    const user = useSelector((state) => state.user.value);
    // console.log(user)
    const [objInfo, setObjInfo] = useState({});
    const [product, setProduct] = useState([]);
    const [seller, setSeller] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const chatname = idProduct + user.name;
    let pusher = null

    // Join chat
    useEffect(() => {


        (async () => {
            const response = idProduct && await fetch(`${backendAddress}/offers/search/${idProduct}`)
            const data = await response.json();
            setSeller(data.message.seller);
            setProduct(data.message);



            pusher = new Pusher('3295d486d5ad2af1a1af', { cluster: 'eu' });
            const respon = await fetch(`${backendAddress}/messages/previousMessages/${chatname}`)
            const dataPrev = await respon.json();
            // console.log('dataprev', isFocused)
            setMessages(dataPrev.messages)


            const resp = await fetch(`${backendAddress}/messages/${chatname}/${user.name}`, {
                method: 'PUT',
            })
            const dataMess = await resp.json();

            const subscription = pusher.subscribe(chatname);

            subscription.bind('pusher:subscription_succeeded', () => {
                subscription.bind('message', handleReceiveMessage);
            });

        })();

    }, []);


    // const imgProduct = 'https://res.cloudinary.com/dzdrlauim/image/upload/v1702893055/mfuued7dtdxewhdqmghl.jpg';
    // const imgProduct = props.route.params.data.images;
    // console.log(product.images)

    // Leave chat
    // useEffect(() => {
    //     return async () => {
    //         await pusher.disconnect();
    //         fetch(`${backendAddress}/messages/${chatname}/${user.name}`, {
    //             method: 'DELETE',
    //         });
    //     };
    // }, []);

    const handleReceiveMessage = async (data) => {

        setMessages((messages) => [...messages, data]);

    };

    const handleSendMessage = () => {

        if (!messageText) {
            return;
        }

        const payload = {
            tokenBuyer: user.token,
            tokenSeller: seller.token,
            idProduct: idProduct,
            text: messageText,
            username: user.name,
            chatname: chatname,
            createdAt: new Date(),
            id: Math.floor(Math.random() * 100000),
        };
        fetch(`${backendAddress}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        // console.log(messageText)
        setMessageText('');
    };


    const messagesTextJsx = messages.map((message, i) => {
        const userId = message.username === user.name ? 1 : 2
        return (
            <SingleMessage key={i} userId={userId} messageContent={message.text} />
        )
    })




    return (
        // objInfo.sellerName &&
        <View style={styles.container}>
            <Header navigation={props.navigation} />
            {user.token != undefined ? <>
                <View style={styles.infos}>
                    <View style={styles.infosArticle}>
                        <Text style={styles.white}>Vendeur : {seller.username}  </Text>
                        <Text style={styles.white}> Produit: {props.route.params.data.offerTitle} </Text>
                    </View>
                    <View style={styles.photoArticle}>
                        <Image style={styles.image} source={{ uri: imgProduct }} />

                    </View>

                </View>
                <ScrollView style={styles.scrollView}>
                    {messagesTextJsx}
                </ScrollView>
                <View style={styles.SearchRow} >
                    <FontAwesome name="pencil" style={styles.iconSearch} size={20} />
                    <TextInput
                        onChangeText={(value) => setMessageText(value)}
                        value={messageText}
                        style={styles.inputSearch}
                        placeholder="message"
                        autoFocus
                        maxLength={200}
                    />
                    <TouchableOpacity
                        //   style={styles.rotate}
                        // title="Flip" 
                        onPress={() => handleSendMessage()}>
                        <Ionicons
                            name="send" size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </> :
                <View>
                    {/* <Text style={styles.h3}>Vous devez d'abord vous connecter pour accéder à ce service</Text> */}
                    <Connexion />
                    {/* <Connection />
                    <Inscription /> */}
                </View>}
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'black',
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
        backgroundColor: '#14342B',
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
