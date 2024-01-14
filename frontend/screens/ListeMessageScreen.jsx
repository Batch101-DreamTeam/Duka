
import {
    KeyboardAvoidingView, View, StyleSheet, Text, ScrollView, TextInput, Pressable, Image, TouchableOpacity
} from 'react-native';
// import NetInfo from "@react-native-community/netinfo";
import ListeMessages from '../components/ListeMessages';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js/react-native';
import Connexion from '../components/Connexion';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import InfoContainer from '../components/messagesElements/InfoContainer';
import SingleMessage from '../components/messagesElements/SingleMessage';
import Header from '../components/Header';
// import ButtonIcon from '../components/buttons/ButtonIcon';
import { Ionicons } from '@expo/vector-icons';
import { BACKEND_ADDRESS } from "@env";
const backendAddress = BACKEND_ADDRESS;



export default function ListeMessageScreen(props, { navigation }) {
    console.log(props)
    const idProduct = props.route.params.data.id;
    const imgProduct = props.route.params.data.images[0];
    const user = useSelector((state) => state.user.value);
    const [messagesProduct, setMessagesProduct] = useState([{}]);
    const [product, setProduct] = useState([{}]);
    // console.log('messagesp', messagesProduct[0].messages[0].createdAt)


    useEffect(() => {
        (async () => {
            const response = idProduct && await fetch(`${backendAddress}/messages/messagesByProduct/${idProduct}`)
            const data = await response.json();
            setMessagesProduct(data.messagesProduct);
            setProduct(data.product);
            // console.log('messagesp', data)
            // console.log('product', data.product)
        })();

    }, []);


    const listeMessages = messagesProduct && messagesProduct.map((data, i) => {
        return <ListeMessages
            key={i}
            dateOfCreation={data.dateOfCreation}
            messages={data.messages}
            navigation={props.navigation}
            offer={product}
            route={props.route}
        // username={data.messages[0].username}
        // text={data.messages[0].text}
        // username={data.messages[i].username}
        />;
    }
    );


    return (
        // objInfo.sellerName &&
        <View style={styles.container}>
            <Header navigation={props.navigation} />
            {user.token ? (

                <ScrollView style={styles.scrollView}>

                    {/* <ListeMessages /> */}
                    {listeMessages}

                </ScrollView>
            ) : (
                <View>
                    <Connexion />
                </View>
            )}

        </View>


    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',

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
