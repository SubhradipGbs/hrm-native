import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { AntDesign } from "@expo/vector-icons";

const NewLayout = ({ navigation, route }) => {
  const { item } = route.params;
  function getRandomPastelColor() {
    const r = Math.floor((Math.random() * 100) + 80);
    const g = Math.floor((Math.random() * 100) + 50);
    const b = Math.floor((Math.random() * 100) + 100);

    const toHex = (value) => value.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  return (
    <View style={styles.container}>
      {item.child.map((subItem) => (
        <Pressable
          key={subItem._id}
          style={[styles.item, { backgroundColor: getRandomPastelColor() }]}
          onPress={() => navigation.navigate(subItem.path)}
        >
          <Text style={styles.title}>{subItem.name}</Text>
          <AntDesign name="caretright" size={24} color={theme.colors.white} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 80,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: "600",
  },
});

export default NewLayout;
