import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import PropagateLoader from "react-spinners/PropagateLoader";
import Chats from "./MainScreen";

export default function Home() {
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
      {isLoading ? <Loader /> : <Chats />}
    </View>
  );
}
