import { StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

export default function ResultSearch(props) {
    return (



        <View style={styles.product}>
            <Image style={styles.image} source={{ uri: props.images }} />

            <View style={styles.descProd}>
                <Text >{props.offerTitle}</Text>
                <Text >{props.description}</Text>
                <Text >{props.price} CFA</Text>
                <FontAwesome name='heart' size={20} />
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

    product: {
        flex: 1,
        flexDirection: 'row',
        margin: 1,
        padding: 5,
        width: '100%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    image: {
        margin: 1,
        padding: 1,
        width: 170,
        height: 170,
        borderRadius: 10,
    },
    descProd: {
        width: '50%',
        height: '100%',
        padding: 5,
        // backgroundColor: 'gold',
        margin: 1,
    },


});