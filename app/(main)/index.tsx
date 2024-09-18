import { Colors } from "../../constants/Colors";
import * as config from "@/config";
import { ComandaBox } from "@/components/ComandaBox";
import { Header } from "@/components/Header";
import React from "react";
import { View} from "react-native";

export default function Index() {

  const user = config.currentUser.name;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
      }}
    >
      <Header user={user}/>
      <ComandaBox />
    </View>
  );
}
