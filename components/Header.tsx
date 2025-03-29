import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ToggleButton from "./ToggleButton";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.headerContainer}>
      {/* HVO CONNECT */}
      <Text style={styles.title}>
        HVO <Text style={styles.subtitle}>Connect</Text>
      </Text>

      {/* Toggle Button */}
      <ToggleButton activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginTop: 200, // Adjusted for consistent position across screens
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: "300",
    color: "#888",
  },
});

export default Header;
