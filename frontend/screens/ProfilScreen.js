
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, TextInput, Dimensions } from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

// Import des fichiers de police
import MontserratRegular from '../res/fonts/Montserrat-Regular.ttf';
import MontserratMedium from '../res/fonts/Montserrat-Medium.ttf';
import MontserratBold from '../res/fonts/Montserrat-Bold.ttf'
import MontserratBlack from '../res/fonts/Montserrat-Black.ttf'

export default function ProfilScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        MontserratRegular: MontserratRegular,
        MontserratMedium: MontserratMedium,
      });

    return (
        <View style={styles.container}>

            <Header />

            <View style={styles.containerContent}>
            <SafeAreaView style={styles.container}>


            <Text style={styles.h1}>Mon profil</Text>

            <View style={styles.userBlock}>
                {/* <View style={styles.blockNamePpContact}> */}
                        <Text style={styles.name}>Thomas Labassa</Text>
                        <Text style={styles.tel}>06 07 08 09 10</Text>
                    <Image source={require('../assets/idiot.webp')} style={styles.pictureProfile} />
                    <View style={styles.nameContact}>
                    </View>
                {/* </View> */}
                <TouchableOpacity>
                    <FontAwesome style={styles.modifyPen} name="pencil" size={20} color={'white'} />
                </TouchableOpacity>
            </View>


            <Text style={styles.h2}>Description</Text>

            
            <View style={styles.descriptionBloc}>
                <Text style={styles.whiteText}>"Bonjour, je vis à Moroni sud. Spécialiste des produits de salle de bain et WC, pensez à me joindre avant de vous déplacer afin de vérifier la disponibilité. A bientôt. Thomas. "</Text>
                <TouchableOpacity>
                    <FontAwesome style={styles.modifyPenDescription} name="pencil" size={20} color={'white'} />
                </TouchableOpacity>
            </View>
            


            <Text style={styles.h2}>Lieux favoris</Text>

      <View style={styles.localisationContainer}>

<TouchableOpacity style={styles.altBtn}>
<Text style={styles.whiteText}>Moroni-Sud</Text>
</TouchableOpacity >

<TouchableOpacity style={styles.altBtn}>
<Text style={styles.whiteText}>Malé-Est</Text>
</TouchableOpacity >

<TouchableOpacity style={styles.altBtn}>
<Text style={styles.whiteText}>Sima</Text>
</TouchableOpacity >
</View>

<Text style={styles.h2}>Offres en cours</Text>

<View style={styles.localisationContainer}>

<TouchableOpacity style={styles.altBtn}>
<Text style={styles.whiteText}>Fait-tout</Text>
</TouchableOpacity >

<TouchableOpacity style={styles.altBtn}>
<Text style={styles.whiteText}>Vélo adulte</Text>
</TouchableOpacity >

<TouchableOpacity style={styles.altBtn}>
<Text style={styles.whiteText}>Filet depêche</Text>
</TouchableOpacity >
</View>

        </SafeAreaView >


            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
        
    },

    containerContent: {
        flex: 1,
        backgroundColor: '',
    },
    
    locationRow:{
        backgroundColor: 'orange',
        width: '70%',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    localisationContainer: {
        flexDirection:'row',
        backgroundColor: '#60935D',
        width: '98%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    header: {
        height: '100%',
        width: '100%',
        // height: '7%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        marginBottom: 10,
        backgroundColor: '#60935D'
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
    
    bars: {
        marginLeft: 10,
        marginTop: 10
    },

    userBlock: {
        backgroundColor: '#60935D',
        width: '98%',
        height: 140,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    
    pictureProfile: {
        // backgroundColor: 'black',
        width: 100,
        height: 100,
        borderRadius: 80,
        marginTop: -90,
        marginRight: 220,
    },

    name: {
        height: 35,
        marginTop: 40,
        borderRadius: 5,
        justifyContent: 'center',
        fontSize: 18,
        color: 'white',
        borderBottomWidth: 1,
        fontFamily: 'MontserratMedium',
        marginLeft: 100
    },

    tel: {
        width: 200,
        height: 35,
        marginTop: 0,
        borderRadius: 5,
        fontSize: 18,
        color: 'white',
        borderBottomWidth: 5,
        fontFamily: 'MontserratMedium',
        marginLeft: 165
    },

    blockNamePpContact: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'yellow',
       
    },
    descriptionBloc: {
        backgroundColor: '#60935D',
        width: '98%',
        height: 110,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,

    },
    descriptionRow: {
        // height: 40,
        marginTop: 0,
        // backgroundColor: 'red',
        borderRadius:0,

        width: '100%',
        height: 130,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    modifyPen: {
        marginLeft: 250,
        marginBottom: 120

    },
    modifyPenDescription: {
        marginTop: 55,
        marginLeft: 87
    },


    h1: {
        fontFamily: 'MontserratMedium', 
        fontSize: 28,
        color: '#14342B', 
      },
      h2: {
        marginTop: 25,
        fontFamily: 'MontserratRegular', 
        fontSize: 24,
        color: '#60935D',
      },
      h3: {
        fontFamily: 'MontserratMedium', 
        fontSize: 20,
        color: '#14342B',
      },
      text: {
        fontFamily: 'MontserratRegular', 
        fontSize: 16,
        color: 'black',
      },

      whiteText: {
        fontFamily: 'MontserratRegular', 
        fontSize: 16,
        color: 'white',
        margin : 15,
      },

      topBar: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 210,
        backgroundColor: '#60935D',
        width: 400,
        height: 50,
        borderRadius: 10,
    },

    icon: {
        width:35,
        height: 35,
        color:'white', 
        margin: 8,
    },

    returnToHome: {
        marginLeft:110,
    },

    green: {
        color: "#BAB700",
        fontFamily: 'MontserratMedium', 
        fontSize: 20,
      },

});