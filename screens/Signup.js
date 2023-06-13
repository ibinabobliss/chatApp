import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSignUp = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert(err.message));
    }
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#212121",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: 30,
        }}
      />
      <View
        style={{
          backgroundColor: "#ff3d00",
          alignItems: "center",
          borderRadius: 20,
          padding: 20,
        }}
      >
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              color: "#fafafa",
              fontWeight: "bold",
            }}
          >
            Welcome to weChat
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <TextInput
            value={email}
            autoFocus={true}
            onChangeText={(text) => setEmail(text)}
            placeholder="me@gmail.com"
            style={{
              backgroundColor: "#fafafa",
              width: 170,
              padding: 13,
              borderRadius: 25,
            }}
          />
        </View>

        <View
          style={{
            margin: 15,
          }}
        >
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="password"
            secureTextEntry
            style={{
              backgroundColor: "#fafafa",
              width: 170,
              padding: 13,
              borderRadius: 25,
            }}
            onSubmitEditing={HandleSignUp}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#212121",
            padding: 10,
            paddingHorizontal: 25,
          }}
          onPress={HandleSignUp}
        >
          <Text
            style={{
              color: "#ff3d00",
              fontWeight: "bold",
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 30,
            marginTop: 17,
          }}
        >
          <View>
            <Text
              style={{
                color: "lightgreen",
              }}
            >
              Already have an account ?
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                color: "#fafafa",
                marginHorizontal: 10,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
