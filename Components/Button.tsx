import React from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";


export function Button({buttonText, onPress}){
    return(
        <>
         <View style={styles.Buttoncontainer}>
              <TouchableOpacity onPress={onPress}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
        </View>
        </>
    )  
}
const styles= StyleSheet.create({
    Buttoncontainer: {
        width: '100%',
        paddingVertical: 16,
        backgroundColor: '#3e3e3e',
        borderRadius: 50,
      },
      buttonText:{
        fontSize: 19,
        fontWeight: 500,
        color: '#fff',
        textAlign: 'center',
      },
})