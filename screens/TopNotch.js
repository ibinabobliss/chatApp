import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";

export default function TopNotch() {
  const signout = () => {
    signOut(auth).catch((err) => alert(err));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#212121",
        padding: 30,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      //style={{
      //}}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View>
          <Image
            source={{
              uri: auth.currentUser?.photoURL || "https://i.pravatar.cc/300",
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginTop: 5,
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 21,
              color: "gray",
            }}
          >
            {auth?.currentUser?.displayName || "Hello "}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#fafafa",
            }}
          >
            this is a subtitle !
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 8,
        }}
      >
        <TouchableOpacity onPress={signout}>
          <MaterialCommunityIcons
            name="location-exit"
            size={24}
            color="#fafafa"
            style={{
              marginHorizontal: 10,
              fontWeight: "bold",
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
