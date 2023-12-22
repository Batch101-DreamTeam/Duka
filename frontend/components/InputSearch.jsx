import { StyleSheet, Alert, ImageBackground, Text, View, Pressable, Modal, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { RemoteDataSetExample2 } from '../components/autodrop';
import { useDispatch, useSelector } from 'react-redux';
import { newSearch, nameSearch, filterApply } from '../reducers/offer'
import { SelectList } from 'react-native-dropdown-select-list';
import { ServerContainer, useFocusEffect } from '@react-navigation/native';
const citiesData = ['Moroni', 'Mutsamudu', 'Fomboni', 'Iconi', 'Itsandra', 'MalÃ©', 'Ouellah', 'Sima'];
// const pricesRange = [10, ', 'Fomboni', 'Iconi', 'Itsandra', 'MalÃ©', 'Ouellah', 'Sima'];
// import RNPickerSelect from 'react-native-picker-select';
// import { Dropdown } from './Dropdown';
import { BACKEND_ADDRESS } from "@env"
const backendAddress = BACKEND_ADDRESS;
// const backendAddress = process.env.BACKEND_ADDRESS;
// const BACKEND_ADDRESS = 'http://192.168.43.46:3000';
// import ModalScreen from './ModalScreen';
// BACKEND_ADDRESS = 'http://192.168.43.46:3000'
// BACKEND_ADDRESS = 'http://192.168.1.7:3000';


export default function InputSearch(navigation) {
    const [selectedItem, setSelectedItem] = useState(null);
    const price = ["Prix croissant", "Prix décroisssant"]
    const place = ["Par produit le plus proche", "Par prix décroisssant"]
    const store = ["Loisir", 'Informatique', "Maison", "Jardin", 'Vêtement', "Automobile"]
    const [isResult, setIsResult] = useState(true);
    const [result, setResult] = useState("")
    const dispatch = useDispatch()


    const [modalVisible, setModalVisible] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocations] = useState('');
    const [priceChoice, setPriceChoice] = useState(null);

    // const offer = useSelector((state) => state.offer.value);
    //console.log(offer.resultSearch.searchOnWord)
    const updatePrice = () => {

    }
    useFocusEffect(
        React.useCallback(() => {
            return (() => console.log('bye'))
        }, [modalVisible]))

    useFocusEffect(
        React.useCallback(() => {
            setSearchWord("")
            setCategory("")
            setLocations("")
            setPriceChoice("")
        }, []))


    const handleSubmit = () => {
        // console.log("ok")
        // const filterString = searchWord.trim()
        // if (filterString.length === 0) {
        //     return;
        // }
        fetch(`${backendAddress}/offers/search/Bycate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify({
                name: searchWord,
                category: category,
                city: location,
                price: priceChoice
            }),
        }).then(response => response.json())
            .then((data) => {
                if (data?.result) {
                    setResult(data.resultQuery)
                    dispatch(newSearch(data.resultQuery))
                    dispatch(nameSearch(searchWord))
                    dispatch(filterApply(true))
                    // setSearchWord(null);
                    // setCategory(null);
                    // setLocations(null);
                    setModalVisible(false);
                }
                else {
                    setIsResult(false)
                    setResult([])
                    dispatch(newSearch([]))
                    dispatch(nameSearch(searchWord))
                    setSearchWord('');
                    setModalVisible(false);
                    setSearchWord(null);
                    setCategory(null);
                    setLocations(null);
                    setModalVisible(false);
                    setPriceChoice(null)
                }
            });

    };

    let modal;
    modal = (<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
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


                <View style={styles.slectlist}>
                    <SelectList
                        data={store}
                        save="value"
                        setSelected={(val) => setCategory(val)}
                        placeholder='Catégorie'
                        search={false}
                        defaultOption={{ key: null, value: 'Catégorie' }}
                        maxHeight={150}
                    />
                    <SelectList
                        setSelected={(val) => { setLocations(val) }}
                        data={citiesData}
                        save="value"
                        placeholder='Ville'
                        search={false}
                    />
                    <TextInput
                        style={styles.numbInput}
                        keyboardType='number-pad'
                        onChangeText={(e) => { setPriceChoice(e) }}
                        value={priceChoice}
                        placeholder='prix'
                    />
                </View>
                {/* 
                <TouchableOpacity style={styles.margiT} onPress={() => console.log({
                    name: searchWord,
                    category: category,
                    city: location
                })}>


                </TouchableOpacity> */}

                <RemoteDataSetExample2 />

                {/* <Dropdown /> */}

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
                    // justifyContent: 'center',
                    alignItems: 'center',

                }}>
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
                {/* <View style={styles.selectFilter}>

                </View> */}
            </ImageBackground>
            {modal}
        </View>
    );
}

const styles = StyleSheet.create({
    numbInput: {
        // color: 'red',
        // backgroundColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        maxHeight: 45,
        borderColor: 'grey'

    },
    moduleSearch: {
        backgroundColor: 'red',
        marginTop: 0,
        height: '25%',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    margiT: {
        marginTop: 50,
        borderWidth: 2,
    },
    slectlist: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //    backgroundColor: 'green',
        width: "100%",
        flex: 1
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
        marginTop: 10,
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
    selectFilter: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

        // height: 20,
        width: '80%',
        // borderRadius: 10,
        marginTop: 15,
        // padding: 3,

    },
    selectDrop: {
        backgroundColor: 'white',
        // height: 10,
    },


});