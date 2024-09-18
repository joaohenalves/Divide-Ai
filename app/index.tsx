import React from "react";
import Login from "@/app/login";
import { NativeBaseProvider, useTheme } from "native-base";

export default function Index() {


  return (
    <NativeBaseProvider>
        <Login />
    </NativeBaseProvider>
  );
}
