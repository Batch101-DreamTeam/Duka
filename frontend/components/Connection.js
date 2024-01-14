import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateName,
  updateToken,
  updateMail,
  getFavorites,
} from "../reducers/user";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { BACKEND_ADDRESS } from "@env";
const backendAddress = BACKEND_ADDRESS;

export default function Connection() {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const token = user?.token;
  const Favorites = user?.favorites;
  //console.log(Favorites);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(true);
  const [userNotFound, setUserNotFound] = useState(true);
  const [missingField, setMissingField] = useState(true);
  const [authentification, setAuthentification] = useState(true);
  const [eye, setEye] = useState(true);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const user = useSelector((state) => state.user.value);
  //   const tokens = user.token;
  // console.log(user)

  useEffect(() => {
    if (isFocused) {
      //Update the state you want to be updated
      setWrong(true);
      setUserNotFound(true);
      setMissingField(true);
      setAuthentification(true);
      setEmail("");
      setPassword("");
      setEye(true);
    }
  }, [isFocused]);

  const checkConnection = () => {
    setWrong(true);
    setUserNotFound(true);
    setMissingField(true);
    setAuthentification(true);
    if (EMAIL_REGEX.test(email)) {
      fetch(`${backendAddress}/users/connexion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          mail: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(updateName(data.data.username));
            dispatch(updateToken(data.data.token));
            dispatch(updateMail(data.data.mail));
            dispatch(getFavorites(data.data.favorites));
          } else {
            if (data.message === "no user found") {
              setUserNotFound(false);
            } else if (data.message === "Missing or empty fields") {
              setMissingField(false);
            } else if (data.message === "bad authentification") {
              setAuthentification(false);
            }
          }
        }
        );

    } else {
      setWrong(false);
    }
  };

  const showPassword = () => {
    setEye(!eye);
  };
  return (
    <View style={styles.containerConnection}>
      <View style={styles.box}>
        <Text style={styles.textBox}> Connexion</Text>
      </View>
      <TextInput
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.input}
        placeholder=" email"
        keyboardType="email-address"
      />
      {!wrong ? (
        <Text style={styles.erreur}> Veuillez entrer une adresse mail</Text>
      ) : (
        <></>
      )}
      <View style={styles.password}>
        <TextInput
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholder=" Password"
          maxLength={200}
          secureTextEntry={eye ? true : false}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => showPassword()}>
          <Ionicons name={eye ? "eye" : "eye-off"} size={34} color="black" />
        </TouchableOpacity>
      </View>

      {!userNotFound ? (
        <Text style={styles.erreur}> Adresse Mail non valide</Text>
      ) : (
        <></>
      )}
      {!missingField ? (
        <Text style={styles.erreur}> Veuillez remplir tout les champs</Text>
      ) : (
        <></>
      )}
      {!authentification ? (
        <Text style={styles.erreur}> Mot de passe invalide</Text>
      ) : (
        <></>
      )}
      <TouchableOpacity
        onPress={() => checkConnection()}
        style={styles.btnConnexion}
      >
        <Text style={styles.white}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerConnection: {
    // flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    // marginBottom: 35,
    padding: 5,
  },
  input: {
    margin: 15,
    padding: 10,
    borderWidth: 2,
    height: 40,
    width: 300,
    borderRadius: 10,
    // fontFamily: 'MontserratMedium',
    fontSize: 14,
  },

  box: {
    backgroundColor: "#60935D",
    width: "100%",
    height: "20%",
    borderRadius: 5,
    // marginTop: 20,
  },

  textBox: {
    textAlign: "center",
    color: "white",
    height: "100%",
    width: 400,
    textAlignVertical: "center",
    // fontFamily: 'MontserratMedium',
    fontSize: 14,
    padding: 12
  },
  white: {
    color: "white",
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
    borderRadius: 20,
  },
  erreur: {
    color: "red",
  },
  password: {
    margin: 8,
    borderWidth: 2,
    width: 300,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",

  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    fontSize: 14,
    paddingLeft: 8,
  },
});
