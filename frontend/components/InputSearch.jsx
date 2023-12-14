import { StyleSheet, Alert, ImageBackground, Text, View, Pressable, Modal, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// const backendAddress = process.env.BACKEND_ADDRESS;
// const BACKEND_ADDRESS = 'http://192.168.43.46:3000';
// import ModalScreen from './ModalScreen';
// BACKEND_ADDRESS='http://192.168.43.46:3000'
BACKEND_ADDRESS = 'http://192.168.1.7:3000'
export default function InputSearch(navigation) {

    const [modalVisible, setModalVisible] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const handleSubmit = () => {

        if (searchWord.length === 0) {
            return;
        }

        fetch(`${BACKEND_ADDRESS}/offers/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ offerTitle: searchWord }),
        }).then(response => response.json())
            .then(data => {
                if (data) {

                    console.log(data)

                    setSearchWord('');
                    setModalVisible(false);
                }
            });

    };

    let modal;
    modal = (<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            console.log(modalVisible)
        }}>
        <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.ModalAcceuil}>
            <View style={styles.modalView}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>X</Text>
                </Pressable>
                <View style={styles.SearchRow} >
                    <FontAwesome name="search" style={styles.iconSearch} size={20} />
                    <TextInput
                        onChangeText={(value) => setSearchWord(value)} value={searchWord}
                        style={styles.inputSearch}
                        placeholder=" Que cherchez-vous ?"
                        maxLength={200}
                    />
                </View>
                <View style={styles.SearchRow} >
                    <FontAwesome name="search" style={styles.iconSearch} size={20} />
                    <TextInput style={styles.inputSearch} placeholder=" Où ?" maxLength={200} />
                </View>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.btnConnexion} >
                    <Text style={styles.white}>
                        Recherche
                    </Text>
                </TouchableOpacity >
            </View>
        </Pressable>
    </Modal>
    );
    return (



        <View style={styles.moduleSearch}>
            <ImageBackground
                source={require('../assets/oceansearch.jpg')}
                resizeMode="cover"
                style={{
                    backgroundColor: '#fc0',
                    width: '100%', // applied to Image
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                {/* <View style={styles.SearchRow} >
                    <FontAwesome name="search" style={styles.iconSearch} size={20} />
                    <TextInput style={styles.inputSearch} placeholder="Que cherchez vous ?" maxLength={200} />
                </View>



                <View style={styles.SearchRow} >
                    <FontAwesome name="search" style={styles.iconSearch} size={20} />
                    <TextInput style={styles.inputSearch} placeholder="Ou êtes-vous ?" maxLength={200} />
                </View> */}
                <Text style={styles.inputTextSearch}  >

                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}

                    >
                        <Text style={styles.textStyle}> Que cherchez-vous ?</Text>
                    </Pressable>

                </Text>
                <Text style={styles.inputTextSearch}  >

                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}

                    >
                        <Text style={styles.textStyle}> Où ?</Text>
                    </Pressable>

                </Text>

            </ImageBackground>
            {modal}
        </View>
    );
}

const styles = StyleSheet.create({

    moduleSearch: {
        backgroundColor: 'red',
        marginTop: 0,
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    SearchRow: {
        flexDirection: 'row',
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: 'white',
    },
    inputTextSearch: {
        height: 40,
        width: '80%',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: 'white',

    },
    inputSearch: {
        height: 40,
        width: 300,
        borderRadius: 10,


    },
    iconSearch: {
        alignSelf: 'flex-start',
        padding: 10
    },
    ModalAcceuil: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 48,

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 40,
        width: 315,
        borderRadius: 10,
        elevation: 2,

    },
    buttonOpen: {
        backgroundColor: 'white',
    },
    buttonClose: {
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 3,
    },
    // inputSearch: {
    //     height: 40,
    //     width: 300,
    //     borderRadius: 10,

    // },

    // SearchRow: {
    //     flexDirection: 'row',
    //     borderWidth: 2,
    //     borderRadius: 10,
    //     marginBottom: 10
    // },
    // iconSearch: {
    //     alignSelf: 'flex-start',
    //     padding: 10
    // },
    btnConnexion: {
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#60935D",
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    textStyle: {
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
        color: '#14342B',

    },
    white: {
        color: 'white',
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
    },


});