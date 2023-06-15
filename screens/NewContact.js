import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NewContact() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 30,
        backgroundColor: "#212121",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("User")}>
        <MaterialCommunityIcons
          name="message-minus"
          size={40}
          color="#fafafa"
          style={{
            marginHorizontal: 10,
            fontWeight: "bold",
            marginTop: 5,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
