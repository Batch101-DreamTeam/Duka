import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_ADDRESS } from "@env";
import { updateName, updateToken, updateMail, deleteAllfavs, removeProfilePhoto } from '../reducers/user';

import { Foundation } from '@expo/vector-icons';
import { removeToken } from '../reducers/user';
const backendAddress = BACKEND_ADDRESS;


export default function Header(props) {
    // console.log(props.navigation.navigate)

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);
    const token = user?.token
    const Favorites = user?.favorites;


    const updateAllFavsBeforeLogOut = () => {
        const donne = {
            Token: token,
            favorites: Favorites,
        };
        fetch(`${backendAddress}/users/setFavorites`, {
            method: "put",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donne),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    //console.log(data);
                    dispatch(updateName(null))
                    dispatch(updateToken(null))
                    dispatch(updateMail(null))
                    dispatch(deleteAllfavs())
                    dispatch(removeProfilePhoto())
                }
                // else {
                //     console.log(data.message);
                //     return;
                // }
            })
            .catch(err => console.log(err.message));
    }

    const localLogout = () => {
        updateAllFavsBeforeLogOut()
        dispatch(removeToken());
    }


    return (
        <>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate('DashboardVendeur')} style={styles.iconRightHeader}>
                    <Foundation name="monitor" size={25} color="white" />
                </TouchableOpacity>
                <Image style={styles.logo} source={require('../assets/Logo_DUKA.png')} />

                <View style={styles.topRightHeader} >
                    <TouchableOpacity onPress={() => localLogout()} style={styles.iconRightHeader}>
                        {token && <AntDesign name="logout" size={25} color="white" />}
                    </TouchableOpacity>
                </View>

            </View>






        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        marginBottom: 0,
        backgroundColor: '#14342B',
        marginTop: 30,
    },
    duka: {
        marginTop: 10,
        fontSize: 28,

    },
    topRightHeader: {
        flexDirection: 'row',
        color: 'white'
    },
    iconRightHeader: {
        color: 'white'
    },

    logo: {
        width: '35%',
        height: '35%',
        marginRight: 10,
        padding: 25,
        marginTop: 10,
        marginBottom: 20
    },

});