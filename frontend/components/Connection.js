import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, updateToken, updateMail } from '../reducers/user'
import { useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';


export default function Connection(navigation) {

    const isFocused = useIsFocused()
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrong, setWrong] = useState(true);
    const [userNotFound, setUserNotFound] = useState(true);
    const [missingField, setMissingField] = useState(true);
    const [authentification, setAuthentification] = useState(true);
    const [eye, setEye] = useState(true)

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const user = useSelector((state) => state.user.value);
    const tokens = user.token
    //console.log(user)

    useEffect(() => {
        if (isFocused) {
            //Update the state you want to be updated
            setWrong(true)
            setUserNotFound(true)
            setMissingField(true)
            setAuthentification(true)
            setEmail("")
            setPassword("")
            setEye(true)
        }

    }, [isFocused]);

    const checkConnection = () => {
        setWrong(true)
        setUserNotFound(true)
        setMissingField(true)
        setAuthentification(true)
        if (EMAIL_REGEX.test(email)) {
            fetch('http://192.168.0.23:3000/users/connexion', { //'http://172.16.0.153:3000/users/connexion'
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mail: email,
                    password: password
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.result) {
                        dispatch(updateName(data.data.username))
                        dispatch(updateToken(data.data.token))
                        dispatch(updateMail(data.data.mail)) // ajouter la photo de profil
                    } else {
                        if (data.message === "no user found") {
                            setUserNotFound(false)
                        } else if (data.message === "Missing or empty fields") {
                            setMissingField(false)
                        } else if (data.message === "bad authentification") {
                            setAuthentification(false)
                        }
                    }
                })
        } else {
            setWrong(false)
        }
    }

    const showPassword = () => {
        setEye(!eye)
    }
    return (

        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.textBox}> Connexion</Text>
            </View>
            <TextInput onChangeText={(value) => setEmail(value)} value={email} style={styles.input} placeholder=" email" keyboardType="email-address" />
            {!wrong ? < Text style={styles.erreur} > Veuillez entre une adresse mail</Text> : <></>}
            <View style={styles.password}>
                <TextInput onChangeText={(value) => setPassword(value)} value={password} placeholder=" Password" maxLength={200} secureTextEntry={eye ? true : false} />
                <TouchableOpacity onPress={() => showPassword()}>
                    <Ionicons name={eye ? "eye" : 'eye-off'} size={34} color="black" />
                </TouchableOpacity>
            </View>

            {!userNotFound ? < Text style={styles.erreur} > Adresse Mail non valide</Text> : <></>}
            {!missingField ? < Text style={styles.erreur} > Veuillez remplir tout les champs</Text> : <></>}
            {!authentification ? < Text style={styles.erreur} > Mot de passe invalide</Text> : <></>}
            <TouchableOpacity onPress={() => checkConnection()} style={styles.btnConnexion} >
                <Text style={styles.white}>
                    Connexion
                </Text>
            </TouchableOpacity >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center'

    },
    input: {
        margin: 8,
        borderWidth: 2,
        height: 40,
        width: 300,
        borderRadius: 10,
        fontFamily: 'MontserratMedium',
        fontSize: 14,
    },
    password: {
        margin: 8,
        borderWidth: 2,
        height: 40,
        width: 300,
        borderRadius: 10,
        fontFamily: 'MontserratMedium',
        fontSize: 14,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    box: {
        backgroundColor: '#60935D',
        width: '80%',
        height: '10%',
        borderRadius: 5,
        marginTop: 20
    },

    textBox: {
        textAlign: 'center',
        color: 'white',
        height: '100%',
        textAlignVertical: 'center',
        fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    white: {
        color: 'white',
        fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    btnConnexion: {
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#14342B",
        fontSize: 40,
        fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    erreur: {
        color: 'red',
    }


});