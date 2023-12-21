import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Modal, Alert, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, updateToken, updateMail } from '../reducers/user'
import { useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { BACKEND_ADDRESS } from "@env"
const backendAddress = BACKEND_ADDRESS;


export default function Inscription(navigation) {

    const isFocused = useIsFocused()
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [wrong, setWrong] = useState(true);
    const [userExist, setUserExist] = useState(true);
    const [missingField, setMissingField] = useState(true);
    const [passwordDifferent, setPasswordDifferent] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [eye, setEye] = useState(true)
    const [eyeTwo, setEyeTwo] = useState(true)

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const user = useSelector((state) => state.user.value);
    const tokens = user.token
    console.log('oui', user.name)

    useEffect(() => {
        if (isFocused) {

            setWrong(true)
            setUserExist(true)
            setMissingField(true)
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setUsername("")
            setPasswordDifferent(true)
            setEye(true)
        }

    }, [isFocused]);

    const checkConnection = () => {
        setWrong(true)
        setUserExist(true)
        setMissingField(true)
        setPasswordDifferent(true)
        if (EMAIL_REGEX.test(email)) {
            if (password != confirmPassword) {
                setPasswordDifferent(false)
            } else {
                fetch(`${backendAddress}/users/inscription`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
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
                            if (data.message === "user already exists") {
                                setUserExist(false)
                            } else if (data.message === "Missing or empty fields") {
                                setMissingField(false)
                            }
                        }
                    })
            }
        } else {
            setWrong(false)
        }
    }
    const showPassword = () => {
        setEye(!eye)
    }
    const showPasswordTwo = () => {
        setEyeTwo(!eyeTwo)
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.textBox}>   Inscription</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btnConnexion}>
                <Text style={styles.white}>Inscription par mail</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.ModalAcceuil}></Pressable>
                <View style={styles.modalView}>
                    <TextInput onChangeText={(value) => setUsername(value)} value={username} style={styles.input} placeholder=" Nom utilisateur" />
                    <TextInput onChangeText={(value) => setEmail(value)} value={email} style={styles.input} placeholder=" email" keyboardType="email-address" />
                    {!wrong ? < Text style={styles.erreur} > Veuillez entrez une adresse mail</Text> : <></>}
                    <View style={styles.password}>
                        <TextInput onChangeText={(value) => setPassword(value)} value={password} placeholder=" Password" maxLength={200} secureTextEntry={eye ? true : false} style={styles.passwordInput} />
                        <TouchableOpacity onPress={() => showPassword()}>
                            <Ionicons name={eye ? "eye" : 'eye-off'} size={34} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.password}>
                        <TextInput onChangeText={(value) => setConfirmPassword(value)} value={confirmPassword} placeholder=" Password" maxLength={200} secureTextEntry={eyeTwo ? true : false} style={styles.passwordInput} />
                        <TouchableOpacity onPress={() => showPasswordTwo()}>
                            <Ionicons name={eyeTwo ? "eye" : 'eye-off'} size={34} color="black" />
                        </TouchableOpacity>
                    </View>
                    {!userExist ? < Text style={styles.erreur} > Adresse Mail dejà existante</Text> : <></>}
                    {!missingField ? < Text style={styles.erreur} > Veuillez remplir tout les champs</Text> : <></>}
                    {!passwordDifferent ? < Text style={styles.erreur} >Veuillez entrer le même mot de passe</Text> : <></>}
                    <TouchableOpacity onPress={() => checkConnection()} style={styles.btnConnexion} >
                        <Text style={styles.white}>
                            Inscription
                        </Text>
                    </TouchableOpacity >
                </View >
            </Modal>
        </View>
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
        // fontFamily: 'MontserratMedium',
        fontSize: 14,
    },
    box: {
        backgroundColor: '#60935D',
        width: '100%',
        height: '10%',
        borderRadius: 5,
        marginBottom: 20
    },

    textBox: {
        textAlign: 'center',
        color: 'white',
        height: '100%',
        textAlignVertical: 'center',
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    white: {
        color: 'white',
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
    },
    btnConnexion: {
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#14342B",
        fontSize: 40,
        // fontFamily: 'MontserratMedium',
        fontSize: 20,
        borderRadius: 20
    },
    erreur: {
        color: 'red',
    },
    ModalAcceuil: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 48,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconModal: {
        marginRight: 10
    },
    password: {
        margin: 8,
        borderWidth: 2,
        width: 300,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        fontSize: 14,
        paddingLeft: 8,
    },


});