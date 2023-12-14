import { View, StyleSheet, Text, ScrollView,
} from 'react-native'
import InfoContainer from '../components/messagesElements/InfoContainer';
import SingleMessage from '../components/messagesElements/SingleMessage';
import Header from '../components/Header';export default function MessageScreen() {

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
            online: false,
            messageContent: "message 7",
            dateOfCreation: Date
        },
    ];

    const displayMessages = data
        .filter(message => message.online) 
        .map((singleMessage, i) => (
            <SingleMessage key={i} {...singleMessage} />
          ));

  return (
    <View style={styles.container}>
        <Header/>
        <ScrollView>
        <InfoContainer/>
        <Text>messagePage</Text>
        {data && displayMessages}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
})
