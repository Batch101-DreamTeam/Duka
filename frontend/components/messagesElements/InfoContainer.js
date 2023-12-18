import { View, StyleSheet, Image, Text } from 'react-native'

const InfoContainer = () => {
  return (
    <View style={styles.infos}>
      <View style={styles.infosArticle}>
        <Text style={styles.white}>Vendeur : Smith  </Text>
        <Text style={styles.white}> Produit: Chiotte </Text>
      </View>
      <View style={styles.photoArticle}>
        <Image style={styles.image} source={require('../../assets/toilet.jpg')} />
      </View>
      {/* <Text style={styles.white}> truc </Text> */}
    </View>
  )
}
export default InfoContainer;

const styles = StyleSheet.create({
  infos: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 70,
    // backgroundColor: 'rgba(52, 52, 52)',
    backgroundColor: 'grey',
    // opacity: 0.9,
    padding: '1%',
    marginTop: 1,
  },
  white: {
    color: 'white',
    // filter: 'brightness(1.75)
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // zIndex: 100,
  },
  image: {
    height: 60,
    width: 80,
  },
})
