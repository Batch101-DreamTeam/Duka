import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SingleMessage = (props) => {
  // console.log(props.userId);
  return (
    <View style={styles.cont}>

      {props.userId == 1 ? (
        <TouchableOpacity style={styles.me}>
          <Text
            style={styles.myText}
          >{props.messageContent}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.else}>
          <Text
            style={styles.otherText}
          >{props.messageContent}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default SingleMessage;

const styles = StyleSheet.create({
  lo: {
    padding: 20,
    borderWidth: 2,
    flexDirection: "row",
    width: '100%'
  },
  myText: {
    padding: 20,
    borderWidth: 2,
    flexDirection: "row",
    width: '50%',
    color: 'white',
    borderRadius: 20,
    backgroundColor: "red",

  },
  otherText: {
    padding: 20,
    borderWidth: 2,
    flexDirection: "row",
    width: '50%',
    color: 'white',
    borderRadius: 20,
    width: '100%',
    backgroundColor: "blue",
  },
  me: {
    marginTop: 10,
    left: '50%'
  },
  else: {
    left: 0,
    width: "50%",
    marginTop: 10,
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
