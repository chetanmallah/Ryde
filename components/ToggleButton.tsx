import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";

interface ToggleButtonProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ activeTab, setActiveTab }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.5 * 0.5; // 50% of the screen width divided between two buttons

  useEffect(() => {
    // Animate slider to the appropriate position
    Animated.timing(animation, {
      toValue: activeTab === "Login" ? 0 : buttonWidth,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {/* Sliding Background */}
        <Animated.View
          style={[
            styles.slider,
            {
              width: buttonWidth,
              transform: [{ translateX: animation }],
            },
          ]}
        />

        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setActiveTab("Login")}
        >
          <Text style={[styles.text, activeTab === "Login" && styles.activeText]}>
            Login
          </Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setActiveTab("Register")}
        >
          <Text style={[styles.text, activeTab === "Register" && styles.activeText]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30, // You can change this value to adjust the gap
  },
  toggleContainer: {
    flexDirection: "row",
    width: "50%", // Toggle container is now 50% of the screen width
    height: 40, // Adjust the height for a more compact look
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    overflow: "hidden",
    position: "relative",
  },
  slider: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#000",
    borderRadius: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14, // Reduced font size for better alignment with smaller width
    color: "#000",
    fontWeight: "600",
  },
  activeText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ToggleButton;
