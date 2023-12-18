import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import InputSearch from "../components/InputSearch";
import ResultSearch from "../components/ResultSearch";
import { BACKEND_ADDRESS } from "@env";
import { useSelector, useDispatch } from "react-redux";
const backendAddress = BACKEND_ADDRESS;
// console.log(backendAddress)
//console.log(backendAddress)
// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };
// BACKEND_ADDRESS = 'http://192.168.43.46:3000'
export default function AcceuilScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const token = user.token;
  const Favorites = user.favorites;

  const [offersData, setOffersData] = useState([]);

  console.log(Favorites);

  useEffect(() => {
    fetch(`${backendAddress}/offers/allOffers`)
      .then((response) => response.json())
      .then((data) => {
        if(!data.result){
           return 
        }
        else{
        setOffersData(data.offers);
        }
      });
  }, [Favorites]);

  const offers = offersData.map((data, i) => {
    const isLiked = Favorites.some((offer) => {
        console.log(data)
        return offer.id === data._id});
    return (
      <ResultSearch
        key={i}
        offerTitle={data.offerTitle}
        images={data.images[0]}
        description={data.description}
        price={data.price}
        category={data.category}
        id={data._id}
        isLiked={isLiked}
      />
    );
  });
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <InputSearch />
      <View style={styles.containerContent}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.productList}>{offers}</View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  containerContent: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "white",
  },
  scrollView: {
    padding: 3,
    maxHeight: "100%",
  },
  productList: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    paddingBottom: "1%",
  },
});
