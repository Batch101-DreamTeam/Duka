import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InputSearch(navigation) {
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
                <View style={styles.SearchRow} >
                    <FontAwesome name="search" style={styles.iconSearch} size={20} />
                    <TextInput style={styles.inputSearch} placeholder="Que cherchez vous ?" maxLength={200} />
                </View>



                <View style={styles.SearchRow} >
                    <FontAwesome name="search" style={styles.iconSearch} size={20} />
                    <TextInput style={styles.inputSearch} placeholder="Ou êtes-vous ?" maxLength={200} />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({

    moduleSearch: {
        // backgroundColor: 'red',
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