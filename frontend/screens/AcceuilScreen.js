import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
export default function AcceuilScreen({ navigation }) {
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
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    containerContent: {
        flex: 1,
        // marginTop: 100,
        backgroundColor: '',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    SearchRow: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10
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


});