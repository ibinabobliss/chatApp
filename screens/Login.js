/////////////////////////
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSignUp = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert(err.message));
    }
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#ff3d00",
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
          backgroundColor: "#212121",
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
            Login to weChat
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
            keyboardType="email-address"
            textContentType="emailAddress"
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
            onSubmitEditing={HandleSignUp}
            autoCorrect={false}
            textContentType="password"
            secureTextEntry
            style={{
              backgroundColor: "#fafafa",
              width: 170,
              padding: 13,
              borderRadius: 25,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#ff3d00",
            padding: 10,
            paddingHorizontal: 25,
          }}
          onPress={HandleSignUp}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            Login
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
              Don't have an account ?
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                color: "#fafafa",
                marginHorizontal: 10,
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
