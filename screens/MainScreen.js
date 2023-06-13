import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
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
import { signOut } from "firebase/auth";

export default function Chats() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  const HandlePress = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  //useLayoutEffect(() => {
  //  navigation.setOptions({
  //    headerRight: () => (
  //      <TouchableOpacity
  //        onPress={HandlePress}
  //        //style={{
  //        //  backgroundColor: "#fafafa",
  //        //  // width: width,
  //        //}}
  //      >
  //        <MaterialCommunityIcons
  //          name="location-exit"
  //          size={24}
  //          color="black"
  //          style={{
  //            marginHorizontal: 10,
  //            fontWeight: "bold",
  //          }}
  //        />
  //      </TouchableOpacity>
  //    ),

  //    headerLeft: () => (
  //      <View style={{}}>
  //        <Text
  //          style={{
  //            fontSize: 21,
  //            marginHorizontal: 10,
  //            fontWeight: "bold",
  //          }}
  //        >
  //          Chats
  //        </Text>
  //      </View>
  //    ),
  //    headerTitle: "",
  //    headerShadowVisible: false,
  //    headerStyle: { backgroundColor: "#fafafa" },
  //  });
  //}, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc", "user"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot");
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt,
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
        <TouchableOpacity onPress={HandlePress}>
          <MaterialCommunityIcons
            name="location-exit"
            size={24}
            color="black"
            style={{
              marginHorizontal: 10,
              fontWeight: "bold",
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          avatar: "https://i.pravatar.cc/300",
        }}
        messagesContainerStyle={{
          backgroundColor: "#fafafa",
        }}
      />
    </>
  );
}
