import { View, StyleSheet, Text } from 'react-native'

const InfoContainer = ()=>{
  return (
    <View style={styles.infos}>
        <Text style={styles.white}> truc </Text>
    </View>
  )
}
export default InfoContainer;

const styles = StyleSheet.create({
      infos:{
        width: '100%',
        height: 70,
        backgroundColor: 'black',
        // backdropFilter: 'opacity(50%)',
      },
      white:{
        color: 'white',
        // filter: 'brightness(1.75)
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // zIndex: 100,
      }
})
