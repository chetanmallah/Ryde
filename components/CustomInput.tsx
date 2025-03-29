import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

interface InputProps {
  placeholder: string;
  iconName: string;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<InputProps> = ({ placeholder, iconName, secureTextEntry = false }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);
  return (
    <View style={styles.inputContainer}>
      {/* Icon */}
      <FontAwesome name={iconName} size={24} color="#888" style={styles.icon} />
      
      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
      />
      
      {/* Eye Icon for Password */}
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
          <MaterialIcons
            name={isPasswordVisible ? "visibility" : "visibility-off"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});

export default CustomInput;
