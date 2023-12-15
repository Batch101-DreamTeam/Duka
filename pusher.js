// pusher.trigger(  channelChatName  ,   RoleEvent  ,   {   message  :  messageContent   }  ) 
// // publication d'un event dans un channelChat

// pusher.trigger(  [channelName1, channelName2]  ,   Role  ,   {   message  :  messageContent   }  ) 

// // publication d'un event dans 2 channelChat


// pousseur.sendToUser(utilisateur,   roleEvent  ,   {   message  :  messageContent   }  ) 

// // publication d'un event à un utilisateur validé par websocketId (autorisé par le channelChat)


// import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
// import Header from '../components/Header';
// import InfoContainer from '../components/messagesElements/InfoContainer';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// const MessageScreen = ({ navigation })=> {
//     const data = [
//         { 
//             userId: 1,
//             online: true,
//             messageContent: "message 1",
//             dateOfCreation: Date
//         },
//         { 
//             userId: 2,
//             online: true,
//             messageContent: "message 2",
//             dateOfCreation: Date
//         },
//         { 
//             userId: 2,
//             online: true,
//             messageContent: "message 3",
//             dateOfCreation: Date
//         },
//         { 
//             userId: 1,
//             online: true,
//             messageContent: "message 4",
//             dateOfCreation: Date
//         },
//         { 
//             userId: 1,
//             online: true,
//             messageContent: "message 5",
//             dateOfCreation: Date
//         },
//         { 
//             userId: 2,
//             online: true,
//             messageContent: "message 6",
//             dateOfCreation: Date
//         },
//         { 
//             userId: 1,
//             online: false,
//             messageContent: "message 7",
//             dateOfCreation: Date
//         },
//     ];


//     // const displayMessages = data
//     //     .filter(message => message.online) 
//     //     .map((singleMessage, i) => (
//     //         <MessageComp key={i} {...singleMessage} />
//     //       ));


//     return (
//         <View style={styles.container}>
//         <Header/>
//         <View>
//             <InfoContainer />
//             <View style={styles.content}>
//               {/* {data.length && displayMessages} */}
//             </View>
//          </View>
//         </View>
//     );
// }

// export default MessageScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         backgroundColor: 'white',
//     },
//     content: {
//         flex: 1,
//         backgroundColor: '',
//     },

// });





// //



// import React from 'react'
// import { View, StyleSheet } from 'react-native'

// function MessageComp(props) {

// return (
//     <View style={styles.MessageRange}>
//        <View style={styles.MessageAppearence} >
//          <Text>{props.messageContent}</Text>
//        </View>
//     </View>
//   )
// }

// export default MessageComp

// const styles = StyleSheet.create({
//     MessageRange:{
//         width: "100%",
//         paddingTop: 20,
//         paddingBottom: 20,
//     },
//     // MessageAppearence:{
//     //     backgroundColor: 'blue',
//     //     paddingTop: 5,
//     //     paddingBottom: 5,
//     // }
// })