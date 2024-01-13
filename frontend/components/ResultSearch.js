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
  const Favorites = user.favorites;

  //console.log('id ', props.id, 'like ', props.isLiked)

  let heart;
  const target = Favorites?.find(el => el.id == props.id)
  
  if (target) {
    heart = (
      <TouchableOpacity
        onPress={() => {
          suppLike();
        }}
      >
        <FontAwesome style={styles.red} name="heart" size={20} />
      </TouchableOpacity>
    );

  } else {
    heart = (
      <TouchableOpacity
        onPress={() => {
          addLike();
        }}
      >
        <FontAwesome name="heart" size={30} />
      </TouchableOpacity>
    );
  }

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

  useEffect(() => { });

  if (Favorites.includes(props.id)) {
    setIsliked(true);
  }
  //console.log(props.id);
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
          <Text style={styles.descTitle}>{props.offerTitle}</Text>
          <Text style={styles.descDesc}>{props.description}</Text>
          <Text style={styles.descPrice}>Prix : {props.price}  CFA</Text>
          <Text style={styles.descHeart}>Ajouter aux favoris {heart}</Text>
          {/* {isLiked ? (
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
          )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  red: {
    color: "red",
    textAlign: "right",

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
    fontSize: 55,
  },
  descTitle: {
    backgroundColor: '#60935D',
    fontSize: 16,
    padding: 2,
  },
  descDesc: {
    // backgroundColor: '#BBDFC5',
    fontSize: 14,
    padding: 2,
  },
  descPrice: {
    // justifyContent: 'space-around',
    // backgroundColor: '#BAB700',
    fontSize: 16,
    marginBottom: 10,
  },
  descHeart: {
    // justifyContent: 'space-between',
    // backgroundColor: '#BAB700',
    padding: 5,
  },

});
