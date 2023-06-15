import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity } from "react-native";
import NewContact from "./NewContact";
import TopNotch from "./TopNotch";
export default function WelcomeScreen({ navigation }) {
  // const signout = () => {
  //   signOut(auth).catch((error) => console.log(error));
  // };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#212121",
      }}
    >
      <TopNotch />
      <NewContact />
    </SafeAreaView>
  );
}
