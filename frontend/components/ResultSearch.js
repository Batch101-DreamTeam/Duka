import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { addFavorites, suppFavorites } from "../reducers/user";
// const user = useSelector((state) => state.user.value);
import { useEffect, useState } from "react";
// const token = user.token
// const Favorites = user.favorites;
// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

export default function ResultSearch(props) {
  //console.log("props", props)
  const { navigation } = props;
  // console.log("ici", props)
  const [isLiked, setIsliked] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const token = user.token;

  //console.log('id ', props.id, 'like ', props.isLiked)

  const suppLike = () => {
    if (!token) {
      return;
    } else {
      dispatch(suppFavorites(props));
      setIsliked(false);
    }
  };
  const addLike = () => {
    if (!token) {
      return;
    } else {
      dispatch(addFavorites(props));
      setIsliked(true);
    }
  };

  useEffect(() => {
    if (props.isLiked == true) {
      setIsliked(true);
    }
  });

  const handleNavigate = (data) => {
    navigation.navigate("FicheVente", { dataOffers: data, route: props.route });
  };

  return (
    <TouchableOpacity onPress={() => handleNavigate(props)}>
      <View style={styles.product}>
        {props.images && (
          <Image style={styles.image} source={{ uri: props.images[0] }} />
        )}

        <View style={styles.descProd}>
          <Text>{props.offerTitle}</Text>
          <Text>{props.description}</Text>
          <Text>{props.price} CFA</Text>
          {isLiked ? (
            <TouchableOpacity
              onPress={() => {
                suppLike();
              }}
            >
              <FontAwesome style={styles.red} name="heart" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                addLike();
              }}
            >
              <FontAwesome name="heart" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  red: {
    color: "red",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  product: {
    flex: 1,
    flexDirection: "row",
    margin: 1,
    padding: 5,
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
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
    width: "50%",
    height: "100%",
    padding: 5,
    // backgroundColor: 'gold',
    margin: 1,
  },
});
