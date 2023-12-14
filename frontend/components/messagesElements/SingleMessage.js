import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SingleMessage = (props) => {
  console.log(props.userId);
  return (
      <View style={styles.cont}>
        
        { props.userId == 1 ? ( 
        <TouchableOpacity  style={styles.me}>
            <Text
             style={styles.lo}
             >{props.messageContent}</Text>
         </TouchableOpacity> 
         ) : (
           <TouchableOpacity style={styles.else}> 
            <Text
             style={styles.lo}
             >{props.messageContent}</Text>
           </TouchableOpacity> 
        )}
      </View>
  );
};
export default SingleMessage;

const styles = StyleSheet.create({
 lo:{
      padding: 20,
      borderWidth: 2,
      flexDirection: "row",
      width: '50%'
  },
  cont: {
    backgroundColor: "red",
  },
  MessageRange: {
    // width: "100%",
    backgroundColor: "blue",
    // display: "flex",
    // flexDirection: "row",
    // position: "relative",
  },
  me: {
    backgroundColor: "red",
    left: '50%'
  },
  else: {
    left: 0,
    backgroundColor: "blue",
    width: "auto"
  },
  MessageAppearence: {
    backgroundColor: "black",
    paddingLeft: 5,
    paddingRight: 5,
    width: 70,
  },
  shape: {
    fontSize: 20,
    color: "white",
  },
});
