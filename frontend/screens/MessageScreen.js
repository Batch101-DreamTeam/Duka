import {
    View, StyleSheet, Text, ScrollView, TextInput, Pressable
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InfoContainer from '../components/messagesElements/InfoContainer';
import SingleMessage from '../components/messagesElements/SingleMessage';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
// const pusher = Pusher.getInstance();
// await pusher.init({
//     apiKey: "3295d486d5ad2af1a1af",
//     cluster: "eu"
// });
// await pusher.connect();
export default function MessageScreen() {

    const data = [
        {
            userId: 1,
            online: true,
            messageContent: "message 1",
            dateOfCreation: Date
        },
        {
            userId: 2,
            online: true,
            messageContent: "message 2",
            dateOfCreation: Date
        },
        {
            userId: 2,
            online: true,
            messageContent: "message 3",
            dateOfCreation: Date
        },
        {
            userId: 1,
            online: true,
            messageContent: "message 4",
            dateOfCreation: Date
        },
        {
            userId: 1,
            online: true,
            messageContent: "message 5",
            dateOfCreation: Date
        },
        {
            userId: 2,
            online: true,
            messageContent: "message 6",
            dateOfCreation: Date
        },
        {
            userId: 1,
            online: true,
            messageContent: "message 7",
            dateOfCreation: Date
        },
        {
            userId: 2,
            online: true,
            messageContent: "message 8",
            dateOfCreation: Date
        },
        {
            userId: 1,
            online: true,
            messageContent: "message 9",
            dateOfCreation: Date
        },
    ];

    const displayMessages = data
        .filter(message => message.online)
        .map((singleMessage, i) => (
            <SingleMessage key={i} {...singleMessage} />
        ));
    console.log(displayMessages)
    return (
        <View style={styles.container}>
            <Header />
            <InfoContainer />
            <ScrollView style={styles.scrollView}>
                {data && displayMessages}
            </ScrollView>
            <Pressable style={styles.SearchRow} >
                <FontAwesome name="pencil" style={styles.iconSearch} size={20} />
                <TextInput style={styles.inputSearch} placeholder="message" maxLength={200} />
                <Ionicons name="send" size={24} color="black" />
            </Pressable>
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
        // marginHorizontal: 2,
        // marginVertical: 2,
        // minHeight: '40%',
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
    },
})
