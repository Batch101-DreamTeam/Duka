import { StyleSheet, Text, View } from 'react-native';

export default function Acceuil({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titleAc}>Welcome to Acceuil</Text>



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