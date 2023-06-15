import React, { useState, useContext, createContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Home from "../screens/Home";
import Contacts from "../screens/Contact";
//import Chats from "../screens/MainScreen";
import Welcome from "../screens/Welcome";

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});
export default function AuthNavigation({ navigation }) {
  function AuthenticatedUserProvider({ children }) {
    const [user, setUser] = useState("");
    console.log(user);
    return (
      <AuthenticatedUserContext.Provider value={{ user, setUser }}>
        {children}
      </AuthenticatedUserContext.Provider>
    );
  }

  //Bobmanuel00000 password
  //ibinabobliss@gmail.com

  function ChatStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="chats"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="User"
          component={Contacts}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);

    useEffect(() => {
      const Unsubscribe = onAuthStateChanged(
        auth,
        async (AuthenticatedUser) => {
          AuthenticatedUser ? setUser(AuthenticatedUser) : setUser(null);
        }
      );
      return () => Unsubscribe;
    }, [user]);

    return (
      <NavigationContainer>
        {user ? <ChatStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
