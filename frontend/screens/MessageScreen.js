// import {
//     Pusher,
//     PusherMember,
//     PusherChannel,
//     PusherEvent,
// } from '@pusher/pusher-websocket-react-native';
import {
    View, StyleSheet, Text, ScrollView, TextInput, Pressable
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js/react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InfoContainer from '../components/messagesElements/InfoContainer';
import SingleMessage from '../components/messagesElements/SingleMessage';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { BACKEND_ADDRESS } from "@env";
const backendAddress = BACKEND_ADDRESS;
// const pusher = Pusher.getInstance();

// await pusher.init({
//     apiKey: "3295d486d5ad2af1a1af",
//     cluster: "eu"
// });

// await pusher.connect();
// await pusher.subscribe({
//     channelName: "my-channel",
//     onEvent: () => {
//         console.log(`Event received: ${event}`);
//     }
// });

export default function MessageScreen({ navigation }) {

    let pusher = null;
    const isFocused = useIsFocused();
    const user = useSelector((state) => state.user.value);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    const chatname = 'nono';
    const theOther = 'didi';
    // params.chat.traveler.firstname === user.firstname
    //     ? params.chat.host
    //     : params.chat.traveler;

    // Join chat
    useEffect(() => {
        if (isFocused) {
            (async () => {
                pusher = new Pusher('3295d486d5ad2af1a1af', { cluster: 'eu' });
                fetch(`${backendAddress}/messages/previousMessages/${chatname}`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        setMessages(data.messages);
                    });
                fetch(`${backendAddress}/messages/${chatname}/${user.firstname}`, {
                    method: 'PUT',
                })
                    .then((resp) => resp.json())
                    .then(() => {
                        const subscription = pusher.subscribe(chatname);

                        subscription.bind('pusher:subscription_succeeded', () => {
                            subscription.bind('message', handleReceiveMessage);
                        });
                    });
            })();
        }
    }, [isFocused]);

    // Leave chat
    useEffect(() => {
        return async () => {
            await pusher.disconnect();
            fetch(`${backendAddress}/chats/${chatname}/${user.firstname}`, {
                method: 'DELETE',
            });
        };
    }, []);

    const handleReceiveMessage = async (data) => {
        setMessages((messages) => [...messages, data]);
    };

    const handleSendMessage = () => {
        if (!messageText) {
            return;
        }

        const payload = {
            text: messageText,
            username: user.firstname,
            chatname: params.chat.traveler._id + params.chat.host._id,
            // createdAt: new Date(),
            // id: Math.floor(Math.random() * 100000),
        };
        fetch(`${backendAddress}/chats/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        setMessageText('');
    };

    // const pusher = new Pusher('3295d486d5ad2af1a1af', {
    //     cluster: 'eu',
    //     encrypted: true
    // });
    // console.log(pusher)

    const data = [
        {
            userC: 1,
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

    // const displayMessages = data
    //     .filter(message => message.online)
    //     .map((singleMessage, i) => (
    //         <SingleMessage key={i} {...singleMessage} />
    //     ));
    // console.log(displayMessages)
    // let singleMessage = <SingleMessage />
    return (
        <View style={styles.container}>
            <Header />
            <InfoContainer />
            <View style={styles.inset}>
                <ScrollView
                    ref={(ref) => {
                        this.scrollView = ref;
                    }}
                    onContentSizeChange={() =>
                        this.scrollView.scrollToEnd({ animated: true })
                    }
                    style={styles.scroller}>
                    {data.map((singleMessage, i) => (
                        <View
                            style={styles.scrollView}
                            key={i}
                        // style={[
                        // 	styles.messageWrapper,
                        // 	{
                        // 		...(message.username === user.firstname
                        // 			? styles.messageSent
                        // 			: styles.messageRecieved),
                        // 	},
                        // ]}
                        >
                            {/* {message.username !== user.firstname && (
								<Image
									source={{
										uri: theOther.avatarUrl,
									}}
									style={styles.smallAvatar}
								/>
							)} */}
                            <View
                            // style={[
                            // 	styles.message,
                            // 	{
                            // 		...(message.username === user.firstname
                            // 			? styles.messageSentBg
                            // 			: styles.messageRecievedBg),
                            // 	},
                            // ]}
                            >
                                <Text style={styles.messageText}>{singleMessage.messageContent}</Text>
                            </View>
                            {/* <Text style={styles.timeText}>
                                {new Date(message.createdAt).getHours()}:
                                {String(new Date(message.createdAt).getMinutes()).padStart(
                                    2,
                                    '0'
                                )}
                            </Text> */}
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(value) => setMessageText(value)}
                        value={messageText}
                        style={styles.input}
                        autoFocus
                    />


                    <Pressable style={styles.SearchRow} >
                        <View style={styles.blocMessage}>
                            <FontAwesome name="pencil" style={styles.iconSearch} size={20} />
                            <TextInput
                                onChangeText={(value) => setMessageText(value)}
                                value={messageText}

                                autoFocus
                                style={styles.message}
                                placeholder="message"
                                maxLength={200}
                            />
                        </View>
                        <Ionicons name="send" size={24} color="black" onpress={() => handleSendMessage()} />
                    </Pressable>
                </View>
            </View>
            {/* <ScrollView
                style={styles.scrollView}
            > */}
            {/* {data && displayMessages} */}
            {/* </ScrollView> */}

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
})
