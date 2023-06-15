import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
//import Chats from "./MainScreen";
import Welcome from "./Welcome";
import { useLayoutEffect } from "react";

export default function Home({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  function Loader() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PropagateLoader loading={isLoading} size={70} />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {isLoading ? <Loader /> : <Welcome />}
    </View>
  );
}
