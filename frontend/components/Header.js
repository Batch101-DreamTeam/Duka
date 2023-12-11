import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Header({ navigation }) {
    return (
        <>

            {/* <SafeAreaView style={styles.safeTop}> */}
            <View style={styles.header}>
                <Text ></Text>
                <Text style={styles.duka} >dUka</Text>
                <View style={styles.topRightHeader} >
                    <TouchableOpacity style={styles.iconRightHeader}>
                        <FontAwesome name="bell" size={30} />
                    </TouchableOpacity>

                </View>

            </View>
            {/* </SafeAreaView > */}





        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    safeTop: {
        // marginTop: 10,

    },
    header: {
        height: '100%',
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        marginBottom: 10,
        backgroundColor: '#10A840',
        marginTop: 30,
    },
    duka: {
        marginTop: 10,

    },
    topRightHeader: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10
    },
    iconRightHeader: {
        marginLeft: 10,
    },

});