import { StyleSheet, Text, View } from 'react-native';

export default function Profil({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titleAc}>Welcome to Profil</Text>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});