import React, { useState } from "react";
import { View, StatusBar, Text, Pressable, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { useNavigation } from "@react-navigation/native";



function SignIn(): JSX.Element {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
            setPasswordError("Password must include a letter, number, special character, and be 8–16 chars.");
        } else {
            setPasswordError('');
        }
    };

    const handleSignIn = () => {
        console.log("Sign In button pressed");
        console.log("Email:", email);
        console.log("Password:", password);
    };


    return (
        <>
          
          <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20} 
    >
                <StatusBar
                    backgroundColor="black"
                    barStyle="light-content"
                />

                <ImageBackground
                    source={require('../../assets/Images/gym.jpg')}
                    style={styles.bgImage}
                >
                    <View style={styles.bgContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textHeading}>Sign In</Text>
                            <Text style={styles.textParagraph}>Hi Welcome back, you’ve been missed</Text>
                        </View>
                    </View>

                    <View style={styles.form}>

                        <View style={{ flexDirection: 'column', gap: 10, }}>

                            <View>
                                <Input placeHolder="example@gmail.com" value={email} labelText="Email" type="email" OnChangeText={emailRegexValidation}/>
                                {emailError? <Text style={{color: 'red', paddingLeft: 15}}>{emailError}</Text>: ''}
                                <Input placeHolder="*************" value={password} labelText="Password" type="password" OnChangeText={passwordRegexValidation} />
                                {passwordError? <Text style={{color: 'red', paddingLeft: 15}}>{passwordError}</Text>: ''}
                            </View>

                            <Pressable onPress={() => console.log("Forgot Password pressed")}>
                                <Text style={[styles.Label, { fontSize: 16, textDecorationLine: 'underline', width: '100%', textAlign: 'right', marginTop: 5, marginBottom: 5 }]}>Forget your Password ?</Text>
                            </Pressable>

                         
                                <Button buttonText="Sign In" onPress={handleSignIn} />
                          

                            <View style={styles.footerContainer}>
                                <View style={styles.line}></View>
                                <Text style={{ paddingHorizontal: 10, color: '#727272' }}>Or Sign In With</Text>
                                <View style={styles.line}></View>
                            </View>

                            <View style={styles.linkButtonContainer}>
                                <View style={{ flexDirection: 'row', gap: 15 }}>
                                    <Pressable style={styles.linkButton} onPress={() => console.log("Iphone")}>
                                        <Image
                                            source={require('../../assets/Images/iphone.png')}
                                            style={{}}
                                        />
                                    </Pressable>
                                    <Pressable style={styles.linkButton} onPress={() => console.log("Google")}>
                                        <Image
                                            source={require('../../assets/Images/Google.png')}
                                            style={{}}
                                        />
                                    </Pressable>
                                    <Pressable style={styles.linkButton} onPress={() => console.log("facebookIcon")}>
                                        <Image
                                            source={require('../../assets/Images/facebookIcon.png')}
                                            style={{}}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{ marginTop: 15, alignItems: 'center', flexDirection: 'row', gap:4, justifyContent: 'center' }}>
                                <Text style={{ color: '#fafafa' }}>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                                    <Text style={{ textDecorationLine: 'underline', color: '#fafafa' }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>


                        </View>

                    </View>

                    <View style={styles.overlay}></View>
                </ImageBackground>
            </KeyboardAvoidingView>
           
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1,
      },
    linkButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: '#b2b2b2',
    },
    linkButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
    },
    line: {
        width: '30%',
        height: 2,
        backgroundColor: '#fafafa'
    },

    footerContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    Label: {
        fontSize: 15,
        color: '#ffff',
        fontFamily: 'Serif',
        paddingVertical: 4,
        paddingLeft: 3,
    },
    form: {
        width: '95%',
        paddingVertical: 10,
        justifyContent: 'center',
        zIndex: 3,
    },
    bgContainer: {
        width: '94%',
        alignItems: 'center',
        zIndex: 3,
        justifyContent: 'center',
        marginBottom: 13
    },
    textContainer: {
        width: '80%',
        marginTop: 10,
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

    bgImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    container: {
        width: '100%',
        height: '100%',
    },
});

export default SignIn;