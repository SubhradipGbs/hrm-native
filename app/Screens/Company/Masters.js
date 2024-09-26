import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Departments from "./fields/Departments";
import Skills from "./fields/Skills";
import Educations from "./fields/Educations";
import Certifications from "./fields/Certifications";
import Language from "./fields/Language";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

const Masters = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "departments", icon: "building" },
    { key: "skills", icon: "briefcase" },
    { key: "education", icon: "graduation-cap" },
    { key: "certifications", icon: "certificate" },
    { key: "languages", icon: "language" },
  ]);

  const renderScene = SceneMap({
    departments: () => (
      <View>
        <Departments />
      </View>
    ),
    skills: () => (
      <View>
        <Skills />
      </View>
    ),
    education: () => (
      <View>
        <Educations />
      </View>
    ),
    certifications: () => (
      <View>
        <Certifications />
      </View>
    ),
    languages: () => (
      <View>
        <Language />
      </View>
    ),
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      renderIcon={({ route, focused }) => (
        <FontAwesome
          name={route.icon}
          size={18}
          color={focused ? theme.colors.white : theme.colors.nutral}
        />
      )}
      indicatorStyle={{ backgroundColor: "white" }}
    />
  );

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      renderLazyPlaceholder={()=>(
        <ActivityIndicator/>
      )}
      initialLayout={{height:0,width:Dimensions.get('window').width}}
    />
  );
};

export default Masters;

const styles = StyleSheet.create({
  tabBar:{
    backgroundColor:theme.colors.black,
  }
});
