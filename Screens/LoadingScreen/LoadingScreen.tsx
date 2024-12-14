import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View, Animated, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoadingScreen = () => {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.timing(rotation, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                })
            ).start()
        };
        startAnimation();

    }, [rotation])


    const interPolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        
        <View style={styles.container}>
          
          <StatusBar 
                hidden={false}       
                translucent={true}   
                backgroundColor="transparent" 
            />
            <LinearGradient
                colors={['#3c3c3c', '#000000']}
                start={{ x: 1, y: 0}}
                end={{ x: 0, y: 0 }}
                style={styles.gradient}>

                <View>
                <Text style={styles.headingText}>Fitness Hub</Text>

                <View style={styles.circleDiv}>
                    <Animated.View

                        style={[
                            styles.circleContainer,
                            { transform: [{ rotate: interPolate }] },
                        ]}
                    >

                        {[...Array(8)].map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.circle,
                                    {
                                        transform: [
                                            {
                                                rotate: `${index * 45}deg`, 
                                            },
                                            { translateY: -30 }, 
                                        ],
                                    },
                                ]}
                            />
                        ))}


                    </Animated.View>

                </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',

    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        fontStyle: 'italic',
        fontWeight: '800',
        fontSize: 45,
        color: '#ffffff',        
    },
    circleDiv: {
        justifyContent: 'center',
        alignItems: 'center',
        
      },
    circleContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
      },
    circle: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
      },


});

export default LoadingScreen;
