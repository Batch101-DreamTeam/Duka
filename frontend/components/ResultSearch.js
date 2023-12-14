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
                    {/* <View style={styles.product}>
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
                    </View> */}


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
        backgroundColor: 'red',
        padding: 3,
        // marginHorizontal: 2,
        // marginVertical: 2,
        // minHeight: '40%',
        maxHeight: '100%',
    },
    productList: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '100%',
        // minHeight: '45%',
        padding: 0,
        paddingBottom: '1%',
        backgroundColor: 'black',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    product: {
        flex: 1,
        flexDirection: 'row',
        margin: 1,
        padding: 2,
        // width: '120',
        // height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    image: {
        margin: 1,
        padding: 1,
        width: 160,
        height: 165,
    },
    descProd: {
        width: 190,
        padding: 5,
        backgroundColor: 'gold',
    },


});