import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Header from '../components/Header';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Vendre({ navigation }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [locations, setLocations] = useState('');
    return (
        <View style={styles.container}>

            <Header />
            <View style={styles.containerContent}>
                <View style={styles.SearchRow} >
                    <FontAwesome name="search" style={styles.iconSearch} size={20} />
                    <TextInput style={styles.inputSearch} placeholder=" Search" maxLength={200} />
                </View>

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



});