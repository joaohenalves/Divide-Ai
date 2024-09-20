import { Colors } from "../../constants/Colors";
import * as config from "@/config";
import { ComandaBox } from "@/components/ComandaBox";
import React from "react";
import { View} from "react-native";

export default function Index() {

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
        flexDirection: "column"
      }}
    >

      <ComandaBox />
    </View>
  );
}
