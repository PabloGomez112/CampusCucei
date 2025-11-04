import "react-native-gesture-handler";
import React, { Component, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "./assets/Navigation/Menu";
import { AuthContext } from "./assets/Components/General/AuthContext";
import { PERSONAL_DATA_FILENAME } from "./assets/Components/General/Configuration";
import { ACADEMIC_DATA_FILENAME } from "./assets/Components/General/Configuration";

export default function App() {
  const [isSignedIn, setSignIn] = useState(false);
  const [personalData, setPersonalData] = useState({});
  const [academicData, setAcademicData] = useState({});


  useEffect(() => {
    async function checkSession()
    {
    let success = false;

    try {
      const personalData = await AsyncStorage.getItem(PERSONAL_DATA_FILENAME);
      const academicData = await AsyncStorage.getItem(ACADEMIC_DATA_FILENAME);

      if (personalData !== null && academicData !== null) {
        success = true;
      }
      else
      {
        success = false;
      }
    } catch (e) {
      console.error("App.js/useEffect() -> ", e);
      success = false;
    }

      setSignIn(success);
    }

    checkSession();
  }, []);

  return (
    <AuthContext
      value={{
        isSignedIn,
        setSignIn,
        personalData,
        setPersonalData,
        academicData,
        setAcademicData,
      }}
    >
      <Menu></Menu>
    </AuthContext>
  );
}
