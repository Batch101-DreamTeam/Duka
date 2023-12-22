import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_ADDRESS } from "@env";
import { updateName, updateToken, updateMail, deleteAllPhoto, deleteAllfavs } from '../reducers/user'
import React, { useState, useEffect, useRef } from 'react';
const backendAddress = BACKEND_ADDRESS;



export default function Header(props, { navigation }) {


    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);
    const token = user?.token
    const Favorites = user?.favorites;

  
 const updateAllFavsBeforeLogOut = ()=>{
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
            // console.log(data);
            dispatch(updateName(null))
            dispatch(updateToken(null))
            dispatch(updateMail(null))
            dispatch(deleteAllfavs())
          } else {
            console.log(data.message);
            return;
          }
        });
 }

    const logout = () => {
        
        if (token) {
            updateAllFavsBeforeLogOut()
            
        } else {
            props.navigation.navigate("InscriptionConnection", { navigation: navigation })
        }

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
                        <FontAwesome name="bell" size={20} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => logout()} style={styles.iconRightHeader}>
                        <AntDesign name="logout" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('DashboardVendeur')} style={styles.iconRightHeader}>
                        <AntDesign name="infocirlce" size={20} color="white" />
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
        // height: '100%',
        width: '100%',
        // height: '7%',
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
        marginTop: 10,
        marginRight: 10,
        color: 'white'
    },
    iconRightHeader: {
        marginLeft: 10,
        color: 'white'
    },

    logo: {
        width: '15%',
        height: '15%',
        marginRight: 10,
        marginLeft: 130,
        padding: 15,
        marginTop: 10,
        marginBottom: 20
    },

});