import { StyleSheet, Text, View } from 'react-native';

export default function Favoris({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titleAc}>Welcome to Favoris</Text>



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