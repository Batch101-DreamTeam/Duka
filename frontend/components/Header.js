import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, updateToken, updateMail, deleteAllPhoto } from '../reducers/user'


export default function Header({ navigation }) {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(updateName(null))
        dispatch(updateToken(null))
        dispatch(updateMail(null))
        dispatch(deleteAllPhoto())
    }

    return (
        <>

            {/* <SafeAreaView style={styles.safeTop}> */}
            <View style={styles.header}>
                <Text ></Text>
                <Image style={styles.logo} source={require('../assets/Logo_DUKA.png')} />
                {/* <Text style={styles.duka} >dUka</Text> */}
                <View style={styles.topRightHeader} >
                    <TouchableOpacity style={styles.iconRightHeader}>
                        <FontAwesome name="bell" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => logout()} style={styles.iconRightHeader}>
                        <AntDesign name="logout" size={24} color="black" />
                    </TouchableOpacity>

                </View>

            </View>
            {/* </SafeAreaView > */}





        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    safeTop: {
        // marginTop: 10,

    },
    header: {
        height: '100%',
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        marginBottom: 0,
        backgroundColor: '#60935D',
        marginTop: 30,
    },
    duka: {
        marginTop: 10,
        fontSize: 28,

    },
    topRightHeader: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10
    },
    iconRightHeader: {
        marginLeft: 10,
    },

    logo: {
        width: '25%',
        height: '25%',
        marginRight:-30,
        marginLeft:55,
        padding:25
    },

});