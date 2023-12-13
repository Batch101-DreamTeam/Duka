import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Modal, Pressable, Image, Alert } from 'react-native';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import MontserratRegular from '../res/fonts/Montserrat-Regular.ttf';
import MontserratMedium from '../res/fonts/Montserrat-Medium.ttf';
import { useDispatch, useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'
import { MaterialIcons } from '@expo/vector-icons';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Foundation } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Connection from '../components/Connection';

export default function Vendre({ navigation }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [locations, setLocations] = useState('');
    const [category, setCategory] = useState('');
    const store = ["Loisir", 'Informatique', "Maison", "Jardin", 'Vêtement', "Automobile"]
    const citiesData = ['Moroni', 'Mutsamudu', 'Fomboni', 'Iconi', 'Itsandra', 'MalÃ©', 'Ouellah', 'Sima'];
    const [fillField, setFillField] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null); // image cherché depuis la bibliothèque du téléphone

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const user = useSelector((state) => state.user.value);
    const token = user.token
    console.log(token)

    let date = new Date().toJSON();


    let [fontsLoaded] = useFonts({
        MontserratRegular: MontserratRegular,
        MontserratMedium: MontserratMedium,
    });

    if (!fontsLoaded) {
        return null;
    }
    const Validate = () => {
        if (name != "" & description != "" & price != "") {
            fetch('http://172.16.0.153:3000/offers/addOffer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    seller: 'id',//prendre valeur reducer (id)
                    name: name,
                    images: 'image',// recup dans le reducer
                    category: category,
                    description: description,
                    price: price,
                    dateOfCreation: date,
                    locations: locations,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("oui")
                    if (data.result) {

                    } else {

                    }
                });
        } else {
            setFillField(false)
        }
    }

    const takePicture = () => {
        navigation.navigate('Photo')
    }

    return (
        //mettre condition pour savoir si la personne est connecté
        <View style={styles.container}>

            <Header />
            {token ? <View style={styles.containerContent}>
                <View style={styles.box}>
                    <Text style={styles.textBox}>Ajouter une vente</Text>
                </View>
                <View style={styles.SearchRow} >
                    <FontAwesome name="pencil" style={styles.iconSearch} size={20} />
                    <TextInput onChangeText={(value) => setName(value)} value={name} style={styles.inputSearch} placeholder=" Nom" maxLength={200} />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addPicture}>
                    <Text>Ajoutez des photos</Text>
                    <MaterialIcons name="add-a-photo" size={55} color="black" />
                </TouchableOpacity>
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
                            <TouchableOpacity style={styles.send} onPress={pickImage}>
                                <Foundation name="photo" size={24} color="white" style={styles.iconModal} />
                                <Text style={styles.whiteSmall}>
                                    A partir de la bibliothèque
                                </Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={styles.send} onPress={() => takePicture()}>
                                <FontAwesome name="camera" size={24} color="white" style={styles.iconModal} />
                                <Text style={styles.whiteSmall}>
                                    Prendre une photo
                                </Text>
                            </TouchableOpacity >
                        </View>
                    </Pressable>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </Modal>
                <View style={styles.SearchRow} >
                    <FontAwesome name="pencil" style={styles.iconSearch} size={20} />
                    <TextInput onChangeText={(value) => setDescription(value)} value={description} style={styles.inputSearch} placeholder=" Description" maxLength={200} />
                </View>
                <View style={styles.SearchRow} >
                    <FontAwesome name="tag" style={styles.iconSearch} size={20} />
                    <TextInput onChangeText={(value) => setPrice(value)} value={price} style={styles.inputSearch} placeholder=" Prix" maxLength={200} keyboardType="numeric" />
                </View>
                <SelectDropdown
                    data={store}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setCategory(selectedItem)
                    }}
                    defaultButtonText={'Catégorie'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />
                <SelectDropdown
                    data={citiesData}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setLocations(selectedItem)
                    }}
                    defaultButtonText={'Ville'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />
                <TouchableOpacity onPress={() => Validate()} style={styles.send}>
                    <Text style={styles.white}>
                        Ajouter
                    </Text>
                </TouchableOpacity >
                {!fillField ? <Text>Veuillez remplir les champs correctement</Text> : <></>}


            </View> : <Connection />}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',

    },
    containerContent: {
        flex: 1,
        backgroundColor: '',
        alignItems: 'center'

    },
    box: {
        backgroundColor: '#60935D',
        width: '80%',
        height: '6%',
        borderRadius: 5,
    },

    textBox: {
        textAlign: 'center',
        color: 'white',
        height: '100%',
        textAlignVertical: 'center',
        fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    iconSearch: {
        alignSelf: 'flex-start',
        padding: 10,
    },
    inputSearch: {
        margin: 8,
        height: 40,
        width: 300,
        borderRadius: 10,
        fontFamily: 'MontserratMedium',
        fontSize: 14,

    },
    SearchRow: {
        margin: 8,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#BBDFC5',
        fontFamily: 'MontserratMedium',
        fontSize: 14,
    },
    white: {
        color: 'white',
        fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    whiteSmall: {
        color: 'white',
        fontFamily: 'MontserratMedium',
        fontSize: 12,
    },
    send: {
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#60935D",
        fontFamily: 'MontserratMedium',
        fontSize: 20,
        width: '85%',
        marginBottom: 10
    },
    addPicture: {
        width: '50%',
        height: '30%',
        borderWidth: 1,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
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
    iconModal: {
        marginRight: 10
    }

});