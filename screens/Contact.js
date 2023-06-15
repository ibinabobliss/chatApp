import { View, Text, TouchableOpacity } from "react-native";
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  query,
  addDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, database } from "../firebase";
import { GiftedChat } from "react-native-gifted-chat";

export default function Contact() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc", "user"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot", snapshot);
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: new Date(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return () => unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((prevousMessages) =>
      GiftedChat.append(prevousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];

    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <>
      <View
        style={{
          backgroundColor: "#fafafa",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 30,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            marginHorizontal: 10,
            fontWeight: "bold",
          }}
        >
          Chats
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <MaterialCommunityIcons
            name="location-exit"
            size={24}
            color="#212121"
            style={{
              marginHorizontal: 10,
              fontWeight: "bold",
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      <GiftedChat
        //dateFormat="month / day / year"
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          avatar: auth?.currentUser?.photoURL || "https://i.pravatar.cc/300",
          name: auth?.currentUser?.displayName,
        }}
        // renderAvatar={renderAvatar}
        messagesContainerStyle={{
          backgroundColor: "#fafafa",
        }}
      />
    </>
  );
}
