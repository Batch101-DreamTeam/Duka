
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


export default function AlternHome() {

    return (

        <View style={styles.alternative}>
            <View style={styles.alternativeTwo}>
                <Text> No Alternative 1 </Text>
            </View>
            <View style={styles.alternativeTwo}>
                <Text> No Alternative 2</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    alternative: {
        height: 480,
        flexDirection: 'column',
        backgroundColor: '#BBDFC5',

    },
    // alternativeOne: {
    //     height: '45%',
    //     margin: 5,
    //     flexDirection: 'column',
    //     backgroundColor: 'white',
    // },
    alternativeTwo: {
        flex: 1,
        flexDirection: 'column',
        // flexWrap: 'wrap',
        width: '98%',
        height: '98%',
        padding: '1%',
        backgroundColor: '#BAB700',
        margin: '1%',
        justifyContent: 'center',
        alignItems: 'center',

    },


});