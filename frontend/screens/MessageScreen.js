import { StyleSheet, Text, View } from 'react-native';

export default function Message({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titleAc}>Welcome to Message</Text>



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