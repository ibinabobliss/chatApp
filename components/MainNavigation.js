import { View, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Home from "../screens/Home";

export default function MainNavigation() {
  const [isLoading, setLoading] = useState(false);
  //const override = css`
  //display:block
  //margin-top:20%`;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <View>
      {isLoading ? (
        <PropagateLoader
          size={40}
          css={override}
          loading={loading}
          color="tomato"
        />
      ) : (
        <Home />
      )}
    </View>
  );
}
