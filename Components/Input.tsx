import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, TextInput, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export function Input({ placeHolder, value, type, labelText, OnChangeText }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(type === 'password');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <Text style={styles.Label}>{labelText}</Text>
      <View style={{ flexDirection: 'row', position: 'relative' }}>
        <TextInput
          style={styles.input}
          placeholder={placeHolder}
          keyboardType={type === 'password' ? 'default' : type} // Ensure valid keyboard type
          secureTextEntry={isPasswordVisible} // Toggle secure text entry based on state
          value={value}
          onChangeText={OnChangeText}
        />

        {type === 'password' && (
          <View
            style={{
              position: 'absolute',
              right: 10,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={isPasswordVisible ? "eye" : "eye-off"}
                color="black"
                size={20}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Label: {
    fontSize: 15,
    color: '#ffff',
    fontFamily: 'Serif',
    paddingVertical: 4,
    paddingHorizontal: 5,
    marginTop: 7,
  },
  input: {
    marginTop: 3,
    width: '100%',
    paddingVertical: 7,
    paddingLeft: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    color: '#727272',
    fontSize: 15,
    fontFamily: 'MontserratAlternates-Medium',
    backgroundColor: '#ffff',
  },
});
