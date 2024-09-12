import { Colors } from "../constants/Colors";
import { Text, View } from "react-native";
import { ComandaBox } from "@/components/ComandaBox";
import { Header } from "@/components/Header";

export default function Index() {


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
      }}
    >
      <Header />
      <ComandaBox />
    </View>
  );
}
