import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome/";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { BACKEND_ADDRESS } from "@env";
import { getFavorites } from "../reducers/user";
import ResultSearch from "../components/ResultSearch";
import Connexion from "../components/Connexion";
const backendAddress = BACKEND_ADDRESS;

export default function FavorisScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  const token = user?.token;
  const Favorites = user?.favorites;
  const dispatch = useDispatch();
  console.log(Favorites)

  const displayFav = Favorites?.map((el, i) => {
    // let isliked;
    return <ResultSearch
      key={i}
      sellerName={el.sellerName}
      offerTitle={el.offerTitle}
      locations={el.locations}
      images={el.images}
      description={el.description}
      price={el.price}
      category={el.category}
      id={el.id}
      navigation={navigation}
      route={route}
      isLiked={true}
    >  </ResultSearch>;
  });
  // useFocusEffect(
  //   React.useCallback(()=>{
  //     console.log('haha')
  //     dispatch(getFavorites())
  //   })
  // )

  useFocusEffect(() => {

    // quand la page n'est plus 'focus' le tableau favoris en backend est modifié 
    return () => {
      const donne = {
        Token: token,
        favorites: Favorites,
      };
      if (token) {
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
              console.log(data);
            } else {
              console.log(data.message);
              return;
            }
          });
      }
      console.log("bye");
    };
  });

  let display;
  // rendu conditionnel jsx variable suivant l'état de connexion et des favoris ajoutés
  if (!token) {
    display = (<>
      <Connexion />
      {/* <Text style={styles.h3}>Vous devez d'abord vous connecter pour accéder à ce service</Text>
      <Connection />
      <Inscription /> */}
    </>
    )
  }
  else if (!Favorites?.length && token) {
    display = (
      <View style={styles.containerContent}>
        <Text style={styles.margin}> No offer added yet ?</Text>

        <Text> ADD NEW OFFER</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("redirectToConnectPage"),
              navigation.navigate("Acceuil");
          }}
          style={styles.plus}
        >
          <FontAwesome name="plus" size={100} />
        </TouchableOpacity>
      </View>
    );
  } else if (Favorites.length && token) {
    display = (
      <ScrollView style={styles.scrollView}>
        {displayFav}
      </ScrollView>
    )

  }

  //console.log(Favorites);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      {/* <Text style={styles.title}> Favoris </Text> */}
      {display}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 50,
    fontSize: 30,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  margin: {
    marginBottom: 50,
    fontSize: 20,
  },
  containerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "",
  },
  plus: {
    width: 100,
    height: 100,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  scrollView: {
    padding: 3,
    maxHeight: '100%',
    marginTop: 30,
    backgroundColor: "#BBDFC5",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 30,
    paddingTop: 30

  },
  productList: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    paddingBottom: '1%',
  },
  h3: {
    // fontFamily: 'MontserratRegular',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 5
  },
});

