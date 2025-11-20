import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { globalColor } from "../GlobalStyles";
import Navbar from "../Components/Navbar";
import SubjectContainer from "../Components/Subject/SubjectContainer";
import { useContext } from "react";
import { AuthContext } from "../Components/General/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Subject() {
  const {
    isSignedIn,
    setSignIn,
    personalData,
    setPersonalData,
    academicData,
    setAcademicData,
  } = useContext(AuthContext);

  const [subjectList, setSubjectList] = useState({});
  const navigator = useNavigation();


  if (!isSignedIn)
  {
    navigator.navigate('perfil');
  }
  else
  {

  return (
    <View style={styles.MainContainer}>
      <View style={styles.body}>
        <ScrollView>
          <View style={{ gap: 20, width: "100%", margin: 15}}>
            {academicData.materias.map((value, index) => (
              <SubjectContainer
                key={index + value.descripcion}
                descripcion={value.descripcion}
                calificacion={value.calificacion}
                tipo={value.tipo}
                clave={value.clave}
                nrc={value.nrc}
                fecha={value.fecha}
                creditos={value.creditos}
                ciclo={value.ciclo}
              ></SubjectContainer>
            ))}
          </View>
        </ScrollView>
      </View>
      <Navbar />
    </View>
  );
}
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 9,
    marginTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: globalColor.text,
    justifyContent: "flex-start",
  },

  textInput: {
    width: 300,
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: globalColor.text,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalColor.background,
  },

  backgroundImage: {
    flex: 9,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  informationContainer: {
    fontSize: 25,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "rgba(126, 142, 246, 0.3)",
  },
});
