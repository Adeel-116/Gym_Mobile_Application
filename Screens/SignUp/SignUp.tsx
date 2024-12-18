import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, Alert, Image, Dimensions } from "react-native"
import { Input } from "../../Components/Input";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icons from "react-native-vector-icons/FontAwesome";
import { Button } from "../../Components/Button";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const widthCalculate = Dimensions.get('window').width;

function SignUp() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [picture, setPicture] = useState(null);
    

        console.log(picture)
    

    //#region Camera Access 
    async function getAccessCamera() {
        const hasPermission = true;
        if (hasPermission) {
            launchCamera({ base64: true }, (response) => {
                if (response.assets && response.assets[0].base64) {
                    const base64Image = response.assets[0].base64;
                    setPicture(base64Image);
                } else {
                    Alert.alert('Error', 'Failed to open camera');
                }
            });
        } else {
            Alert.alert('Permission Denied', 'Camera permission is required to use this feature.');
        }
    }

    async function getAccessGallery() {
        const hasPermission = true; // Add gallery permission check if needed
        if (hasPermission) {
            launchImageLibrary({includeBase64: true}, (response) => {
                if (response.assets && response.assets[0]?.base64) {
                    const base64Image = `data:image/jpeg;base64,${response.assets[0].base64}`;
                    setPicture(base64Image);
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
    //#endregion

    const emailRegexValidation = (value) => {
        setEmail(value);
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(value)) {
            setEmailError("Invalid email address.");
        } else {
            setEmailError('');
        }
    };

    const passwordRegexValidation = (value) => {
        setPassword(value);
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/;
        if (!passwordRegex.test(value)) {
            setPasswordError("Password include a letter, number, special character, and be 8–16 chars.");
        } else {
            setPasswordError('');
        }
    };

    const confirmPasswordValidation = (value) => {
        setConfirmPassword(value);
        if (value === password) {
            setConfirmPasswordError(false);
        } else {
            setConfirmPasswordError("Passwords do not match.");
        }
    };


    const handleSignIn = async () => {
        if (name && email && password && confirmPassword && picture) {
            const data = {
                username: name,
                email: email,
                password: password,
                profilePicture: picture,
            };
         
            console.log("Sending data:", data.profilePicture);
            console.log("Sending data:", data.username);
            console.log("Sending data:", data.email);
            try {
                console.log("try block")
                const response = await fetch("http://192.168.100.2:5000/Signup", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json()

                console.log(result.message)
            }
            catch (error) {
                console.log("Error in API")
            }
        }
    }

    return (
        <>

            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#1E1F23"
                    barStyle="light-content"
                />
                <ImageBackground
                    source={require('../../assets/Images/gym_signup.jpg')}
                    style={styles.bgImage}
                >
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon
                                name={'leftcircle'}
                                color="white"
                                size={33}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bgContainer}>

                        <View style={styles.textContainer}>
                            <Text style={styles.textHeading}>Sign Up</Text>
                            <Text style={styles.textParagraph}>Hi Welcome back, you’ve been miss your Chance, Get Register</Text>
                        </View>


                        <View style={styles.foam}>

                            <View style={styles.foamContainer}>

                                <View>
                                    <View style={{}}>
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
                                    </View>

                                    <Input placeHolder="Enter the name" value={name} labelText="Name" type="text" OnChangeText={setName} />
                                    <Input placeHolder="example@gmail.com" value={email} labelText="Email" type="email" OnChangeText={emailRegexValidation} />
                                    {emailError ? <Text style={{ color: 'red', paddingLeft: 15 }}>{emailError}</Text> : ''}
                                    <Input placeHolder="************" value={password} labelText="Password" type="password" OnChangeText={passwordRegexValidation} />
                                    {passwordError ? <Text style={{ color: 'red', paddingLeft: 15 }}>{passwordError}</Text> : ''}
                                    <Input placeHolder="************" value={confirmPassword} labelText="Confirm Password" type="password" OnChangeText={confirmPasswordValidation} />
                                    {confirmPasswordError ? <Text style={{ color: 'red', paddingLeft: 15 }}>{confirmPasswordError}</Text> : ''}
                                </View>

                                <View style={{}}>
                                    <Button buttonText="Sign Up" onPress={handleSignIn} />
                                </View>

                            </View>


                        </View>

                    </View>
                    <View style={styles.overlay}></View>
                </ImageBackground>




            </View>

        </>
    )
}

const styles = StyleSheet.create({

    // Camera Access 
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
    // End Cammera Access Property
    backIcon: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 10,
        zIndex: 3,
    },
    foamContainer: {
        width: '95%',
        paddingVertical: 20,
        gap: 17,
    },
    foam: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1,
    },

    textContainer: {
        width: '80%',
    },
    textHeading: {
        fontSize: 35,
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 600,
        fontFamily: 'MontserratAlternates-Medium',
    },
    textParagraph: {
        fontSize: 14,
        color: '#EDEDED',
        textAlign: 'center',
        fontFamily: 'MontserratAlternates-Medium',
    },
    bgContainer: {
        width: '94%',
        flex: 1,
        alignItems: 'center',
        zIndex: 3,
        marginBottom: 13,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        objectFit: 'contain',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red'
    }
})

export default SignUp