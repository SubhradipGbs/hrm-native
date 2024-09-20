import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { theme } from "../../constants/theme";

const Home = ({ route, navigation }) => {
  const { item } = route.params;
  function getRandomPastelColor() {
    const r = Math.floor((Math.random() * 100)+ 50);
    const g = Math.floor((Math.random() * 100) + 50);
    const b = Math.floor((Math.random() * 100) + 50);

    const toHex = (value) => value.toString(16).padStart(2, "0");

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return (
    <View style={styles.container}>
      {item?.child.map((subItem) => (
        <Pressable
          key={subItem._id}
          style={[
            styles.stackButton,
            { backgroundColor: getRandomPastelColor() },
          ]}
          onPress={() => navigation.navigate(subItem.path)}
        >
          <View>
            <Text style={styles.buttonText}>{subItem.name}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // marginHorizontal: 15,
    // marginVertical: 15,
    justifyContent: "space-between",
    padding: 10,
    gap: 10,
  },
  stackButton: {
    flex: 1,
    minWidth: "40%",
    maxWidth: "50%",
    height: 200,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: "600",
    fontSize: 20,
  },
});

export default Home;
