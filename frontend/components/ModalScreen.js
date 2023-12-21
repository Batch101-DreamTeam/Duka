import { StyleSheet, Alert, Text, View, TextInput, Modal, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

// Importez le fichier de police
// import MontserratRegular from '../res/fonts/Montserrat-Regular.ttf';
// import MontserratMedium from '../res/fonts/Montserrat-Medium.ttf';


export default function ModalScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    let [fontsLoaded] = useFonts({
        MontserratRegular: MontserratRegular,
        MontserratMedium: MontserratMedium,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.inputTextSearch}  >
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)} >
                    <Text style={styles.textStyle}> Que cherchez-vous ?</Text>
                </Pressable>
            </Text>




            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}> Que cherchez-vous ?</Text>
            </Pressable> */}

            <Modal
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
                        <View style={styles.SearchRow} >
                            {/* <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable> */}
                            <FontAwesome name="search" style={styles.iconSearch} size={20} />
                            <TextInput style={styles.inputSearch} placeholder="Que cherchez-vous ?" maxLength={200} />
                        </View>
                        <View style={styles.SearchRow} >
                            <FontAwesome name="search" style={styles.iconSearch} size={20} />
                            <TextInput style={styles.inputSearch} placeholder=" Où ?" maxLength={200} />
                        </View>
                        <TouchableOpacity style={styles.btnConnexion} >
                            <Text style={styles.white}>
                                Recherche
                            </Text>
                        </TouchableOpacity >
                    </View>
                </Pressable>
            </Modal>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 40,
        width: 300,
        borderRadius: 10,
        elevation: 2,

    },
    buttonOpen: {
        backgroundColor: '#BAB700',
    },
    buttonClose: {
        backgroundColor: 'black',
    },
    inputSearch: {
        height: 40,
        width: 300,
        borderRadius: 10,

    },
    inputTextSearch: {
        height: 40,
        width: 300,
        borderRadius: 10,
        backgroundColor: 'white',

    },
    SearchRow: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10
    },
    iconSearch: {
        alignSelf: 'flex-start',
        padding: 10
    },
    btnConnexion: {
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#60935D",
        fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    textStyle: {
        fontFamily: 'MontserratMedium',
        fontSize: 20,
        color: '#14342B',

    },
    white: {
        color: 'white',
        fontFamily: 'MontserratMedium',
        fontSize: 20,
    },

});