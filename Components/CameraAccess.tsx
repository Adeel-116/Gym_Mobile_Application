import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Dimensions, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icons from "react-native-vector-icons/FontAwesome";

const widthCalculate = Dimensions.get('window').width;

export function CameraAccess() {
    const [picture, setPicture] = useState(null);

    async function PermissionCamera() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs access to your camera to take photos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async function PermissionGallery() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'This app needs access to your gallery to select images.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async function getAccessCamera() {
        const hasPermission = await PermissionCamera();
        if (hasPermission) {
            launchCamera({}, (response) => {
                if (response.assets) {
                    setPicture(response.assets[0].uri);
                } else {
                    Alert.alert('Error', 'Failed to open camera');
                }
            });
        } else {
            Alert.alert('Permission Denied', 'Camera permission is required to use this feature.');
        }
    }

    async function getAccessGallery() {
        const hasPermission = await PermissionGallery()
        if (hasPermission) {
            launchImageLibrary({}, (response) => {
                if (response.assets) {
                    setPicture(response.assets[0].uri);
                } else {
                    Alert.alert('Error', 'Failed to open gallery');
                }
            });
        } else {
            Alert.alert('Permission Denied', 'Gallery permission is required to use this feature.');
        }
    }

    function Options() {
        Alert.alert(
            'Select Options',
            'Choose an Action',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Camera', onPress: getAccessCamera },
                { text: 'Open Gallery', onPress: getAccessGallery },
            ]
        );
    }

    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={[
                    styles.circle,
                    {
                        paddingVertical: picture === null
                            ? (widthCalculate <= 360 ? 30 : 37)
                            : 0,
                    },
                ]}
            >
                <View style={styles.Icon}>
                    {picture === null ? (
                        <TouchableOpacity onPress={Options}>
                            <Icons
                                name="camera"
                                color="black"
                                size={30}
                            />
                        </TouchableOpacity>
                    ) : (
                        <Image
                            source={{ uri: picture }}
                            style={{
                                width: '100%',
                                aspectRatio: 1,
                                borderRadius: 50,
                                borderWidth: 2,
                                borderColor: 'green',
                                resizeMode: 'cover',
                            }}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: '30%',
        backgroundColor: '#ffff',
        borderRadius: 50,
        overflow: 'hidden', 
    },
});
