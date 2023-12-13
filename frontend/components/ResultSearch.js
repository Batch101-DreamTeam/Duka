import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

export default function ResultSearch({ navigation }) {
    return (

        <>
            <ScrollView style={styles.scrollView}>
                <View style={styles.productList}>
                    <View style={styles.product}>
                        <Image style={styles.image} source={require('../assets/toilet.jpg')} />
                        <View style={styles.descProd}>
                            <Text >Nom produit</Text>
                            <Text >brève description du produit</Text>
                            <Text >500 CFA</Text>
                            <FontAwesome name='heart' size={20} />
                        </View>
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.image} source={require('../assets/toilet.jpg')} />
                        <View style={styles.descProd}>
                            <Text >Nom produit</Text>
                            <Text >brève description du produit</Text>
                            <Text >500 CFA</Text>
                            <FontAwesome name='heart' size={20} />
                        </View>
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.image} source={require('../assets/toilet.jpg')} />
                        <View style={styles.descProd}>
                            <Text >Nom produit</Text>
                            <Text >brève description du produit</Text>
                            <Text >500 CFA</Text>
                            <FontAwesome name='heart' size={20} />
                        </View>
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.image} source={require('../assets/toilet.jpg')} />
                        <View style={styles.descProd}>
                            <Text >Nom produit</Text>
                            <Text >brève description du produit</Text>
                            <Text >500 CFA</Text>
                            <FontAwesome name='heart' size={20} />
                        </View>
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.image} source={require('../assets/toilet.jpg')} />
                        <View style={styles.descProd}>
                            <Text >Nom produit</Text>
                            <Text >brève description du produit</Text>
                            <Text >500 CFA</Text>
                            <FontAwesome name='heart' size={20} />
                        </View>
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.image} source={require('../assets/toilet.jpg')} />
                        <View style={styles.descProd}>
                            <Text >Nom produit</Text>
                            <Text >brève description du produit</Text>
                            <Text >500 CFA</Text>
                            <FontAwesome name='heart' size={20} />
                        </View>
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.image} source={require('../assets/toilet.jpg')} />
                        <View style={styles.descProd}>
                            <Text >Nom produit</Text>
                            <Text >brève description du produit</Text>
                            <Text >500 CFA</Text>
                            <FontAwesome name='heart' size={20} />
                        </View>
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.image} source={require('../assets/toilet.jpg')} />
                        <View style={styles.descProd}>
                            <Text >Nom produit</Text>
                            <Text >brève description du produit</Text>
                            <Text >500 CFA</Text>
                            <FontAwesome name='heart' size={20} />
                        </View>
                    </View>


                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: 'white',
        padding: 5,
        // marginHorizontal: 2,
        // marginVertical: 2,
        // minHeight: '40%',
        maxHeight: '100%',
    },
    productList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        minHeight: '45%',
        padding: 3,
        paddingBottom: '1%',
        backgroundColor: 'white',
    },
    product: {
        margin: 1,
        padding: 5,
        width: '49%',
        backgroundColor: 'white',
    },
    image: {

        width: 190,
        height: 200,
    },
    descProd: {
        width: 190,
        padding: 5,
        backgroundColor: 'gold',
    },


});