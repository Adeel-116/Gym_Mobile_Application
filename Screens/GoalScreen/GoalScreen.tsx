import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, StatusBar} from "react-native"

function GoalScreen(){
    return(  
        <View style={styles.mainContainer}>
            <StatusBar
                translucent={true}
                backgroundColor="#0000"
                barStyle='dark-content'
            />


            <View style={styles.headerContainer}>

                <View style={{ flex: 1, flexDirection: 'row', gap: 13 }}>
                    <View style={{}}>
                        <TouchableOpacity
                            style={styles.headerLine}
                        />
                    </View>
                    <View style={{}}>
                        <TouchableOpacity
                            style={[styles.headerLine, styles.activeLine]}
                        />
                    </View>
                    <View style={{}}>
                        <TouchableOpacity
                            style={styles.headerLine}
                        />
                    </View>
                    <View style={{}}>
                        <TouchableOpacity
                            style={styles.headerLine}
                        />
                    </View>
                    <View style={{}}>
                        <TouchableOpacity
                            style={styles.headerLine}
                        />
                    </View>
                </View>
            </View>



            <View style={styles.textContainer}>
                <View style={{
                    flex: 1, flexDirection: 'column', gap: 13, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={styles.textHeading}>What’s your goal?</Text>
                    <Text style={styles.textParagraph}>For the better experience and personalised plans for you select your goal to become.</Text>
                </View>
            </View>



           <View style={styles.cardContainer}>
                <View style={styles.cardInner}>

                </View>
                
           </View>




        

        </View>
    )
}


const styles = StyleSheet.create({
    cardInner:{
        width: '80%',
        flex: 1,
        backgroundColor: 'lightblue',
        
    },
    cardContainer: {
        width: '100%',
        height: '30%',
        backgroundColor: 'lightgreen',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: '100%',
        marginTop: 80,
        height: 100,
        backgroundColor: 'pink'
    },
    textHeading: {
        flex: 1,
        fontSize: 35,
        color: '#000',
        fontWeight: 600,
        fontFamily: 'MontserratAlternates-Medium',
    },
    textParagraph: {
        width: '92%',
        fontSize: 14,
        color: '#717171',
        textAlign: 'center',
        fontFamily: 'MontserratAlternates-Medium',
    },
    activeLine: {
        backgroundColor: '#000000',
    },
    headerLine: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 56,
        height: 5,
        borderRadius: 4,
        backgroundColor: '#eaeaea',
    },
    headerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
        marginTop: StatusBar ? StatusBar.currentHeight : 0,
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffff',
    },
});

export default GoalScreen;