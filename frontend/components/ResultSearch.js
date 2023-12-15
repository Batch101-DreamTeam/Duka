import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorites, suppFavorites } from '../reducers/user';
// const user = useSelector((state) => state.user.value);
// const token = user.token
// const Favorites = user.favorites;
// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

export default function ResultSearch(props) {
    
    const dispatch = useDispatch();

    return (
        <View style={styles.product}>
            <Image style={styles.image} source={{ uri: props.images }} />
 
            <View style={styles.descProd}>
                <Text >{props.offerTitle}</Text>
                <Text >{props.description}</Text>
                <Text >{props.price} CFA</Text>
              { !props.isLiked ? (
                <TouchableOpacity onPress={()=> dispatch(suppFavorites(props))}>
                <FontAwesome style={styles.red} name='heart' size={20} />
                </TouchableOpacity>
               ) : (
                <TouchableOpacity onPress={()=> dispatch(addFavorites(props))}>
                <FontAwesome name='heart' size={20} />
                </TouchableOpacity>
              )
               }
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    red:{
        color: 'red'
    },
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