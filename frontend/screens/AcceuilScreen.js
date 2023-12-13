import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import ResultSearch from '../components/ResultSearch';
// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

export default function AcceuilScreen({ navigation }) {
    return (



        <View style={styles.container}>

            <Header />
            <InputSearch />
            <View style={styles.containerContent}>
                <ResultSearch />
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
        borderRadius: 20,
        // marginTop: 100,
        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

});