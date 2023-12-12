import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Header from '../components/Header';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import MontserratRegular from '../res/fonts/Montserrat-Regular.ttf';
import MontserratMedium from '../res/fonts/Montserrat-Medium.ttf';
import { useDispatch, useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'

export default function Vendre({ navigation }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [locations, setLocations] = useState('');
    const [category, setCategory] = useState('');
    const store = ["Loisir", 'Informatique', "Maison", "Jardin", 'Vêtement', "Automobile"]
    const citiesData = ['Moroni', 'Mutsamudu', 'Fomboni', 'Iconi', 'Itsandra', 'MalÃ©', 'Ouellah', 'Sima'];
    const [fillField, setFillField] = useState(true)

    //const user = useSelector((state) => state.user.value);

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
                    images: 'image',
                    category: category,
                    description: description,
                    price: price,
                    dateOfCreation: date, //valeur reducer
                    locations: locations, // à récupérer sous forme de liste déroulante dans le front
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


    return (
        //mettre condition pour savoir si la personne est connecté
        <View style={styles.container}>

            <Header />
            <View style={styles.containerContent}>
                <View style={styles.box}>
                    <Text style={styles.textBox}>Ajouter une vente</Text>
                </View>
                <View style={styles.SearchRow} >
                    <FontAwesome name="pencil" style={styles.iconSearch} size={20} />
                    <TextInput onChangeText={(value) => setName(value)} value={name} style={styles.inputSearch} placeholder=" Nom" maxLength={200} />
                </View>
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


            </View>



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
    send: {
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#60935D",
        fontFamily: 'MontserratMedium',
        fontSize: 20,
    }



});