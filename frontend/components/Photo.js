import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";
import { addPhoto } from '../reducers/user';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



export default function Photo({ navigation }) {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);
    const [photoTake, setPhotoTake] = useState('')
    const formData = new FormData();

    let cameraRef = useRef(null);

    useEffect(() => {
        if (isFocused) {
            //Update the state you want to be updated
            setPhotoTake('')

        }

    }, [isFocused]);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const takePicture = async () => {
        const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
        //console.log(photo.uri)
        formData.append('photoFromFront', {
            uri: photo.uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });
        setPhotoTake(photo.uri)
    }
    const savePhoto = () => { // a deplacer dans VendreScreen (dans le fetchde la route backend: va permettre de sauvegarder également ls photos du repertoir dans cloudinary)
        fetch('http://172.16.0.153:3000/offers/upload', { //http://172.16.0.153:3000/offers/upload
            method: 'POST',
            body: formData,
        }).then((response) => response.json())
            .then((data) => {
            });
        console.log('oui')
        dispatch(addPhoto(photoTake)); // reste ici
        navigation.navigate('VendreScreen')// reste ici
    }

    if (!hasPermission || !isFocused) {
        return <View />;
    }

    return (
        <View flex={1}>
            {!photoTake ?
                <Camera type={type} flashMode={flashMode} ref={(ref) => cameraRef = ref} style={styles.camera}>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
                            style={styles.button}
                        >
                            <FontAwesome name='rotate-right' size={25} color='#ffffff' />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
                            style={styles.button}
                        >
                            <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.snapContainer}>
                        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
                            <FontAwesome name='circle-thin' size={95} color='#ffffff' />
                        </TouchableOpacity>
                    </View>
                </Camera>
                : <ImageBackground source={{ uri: photoTake }} style={{ width: '100%', height: '100%', flexDirection: 'column' }} >
                    <TouchableOpacity tyle={styles.button} onPress={() => setPhotoTake('')}>
                        <Ionicons name="arrow-back-outline" size={45} color="white" style={styles.arrowBack} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => savePhoto()}>
                        <AntDesign name="checkcircle" size={74} color="white" style={styles.check} />
                    </TouchableOpacity>
                </ImageBackground>}
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonsContainer: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 50,
    },
    snapContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 25,
    },
    arrowBack: {
        marginTop: 30,
        marginLeft: 20
    },
    check: {
        marginTop: '165%',
        marginLeft: '41%'
    }
});
