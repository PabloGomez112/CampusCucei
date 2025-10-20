import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Image,
  Button,
  ActivityIndicator
} from "react-native";
import React, { useRef, useState } from "react";
import { globalColor } from "../GlobalStyles";
import Navbar from "../Components/Navbar";
import ModalPopUp from "../Components/General/ModalPopUp";

export default function Profile() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [isLogged, setLogged] = useState(false);
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState();

  function logon(campus, name, cycle, code, status, degree) {
    setStudentInfo({
      campus: campus,
      name: name,
      cycle: cycle,
      code: code,
      status: status,
      degree: degree,
    });
    setLogged(true);
  }

  function closeModal() {
    setNotificationVisible(false);
  }

  function openModal(title, body) {
    setNotificationVisible(true);
    setModalTitle(title);
    setModalBody(body);
  }

  function profileScreen() {
    return (
      <View style={styles.MainContainer}>
        <View style={[styles.body]}>
          <Text style={styles.title}>Perfil</Text>
          <View style={{marginTop: 45, gap: 15}}>

            <Image style={{alignSelf: 'center', width: 150, height: 150}} source={require("../Icons/login/user.png")}></Image>

          <Text style={[styles.title, styles.informationContainer, {fontSize: 24}]}>
              {studentInfo.name}
            </Text>


            <Text style={[styles.title, styles.informationContainer]}>
              {studentInfo.code}
            </Text>

          <Text style={[styles.title, styles.informationContainer]}>
              {studentInfo.status}
            </Text>

            <Text style={[styles.title, styles.informationContainer]}>
              {studentInfo.degree}
            </Text>
            
            <Text style={[styles.title, styles.informationContainer]}>
              {studentInfo.cycle}
            </Text>
          </View>
        </View>

        <Navbar />
      </View>
    );
  }

  function fetchApi(code, password) {
    // https://cuceimobile.space/campusCucei/auth.php?codigo=22&nip=33

    setLoading(true);
    fetch(
      `https://cuceimobile.space/campusCucei/auth.php?codigo=${code}&nip=${password}`
    )
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        if (data.campus !== undefined) {
          console.log(data);
          logon(
            data.campus,
            data.nombre,
            data.ciclo,
            data.codigo,
            data.situacion,
            data.carrera
          );
        } else {
          console.log(data);
          let my_message = data.error !== undefined ? data.error : data.message;

          openModal("Ha ocurrido un problema", my_message);

          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle errors
        setLoading(false);
      });
  }

  function loginScreen() {
    return (
      <View style={styles.MainContainer}>
        <ImageBackground
          style={[styles.backgroundImage]}
          source={require("../../assets/Images/Login/login_background.jpg")}
          resizeMode="cover"
        >
          <ModalPopUp
            notificationVisible={notificationVisible}
            title={modalTitle}
            body={modalBody}
            closeCallback={closeModal}
          ></ModalPopUp>

          <View style={styles.body}>
            <Text style={styles.title}>Perfil</Text>
            <View
              style={{ flex: 1, justifyContent: "center", marginBottom: 120 }}
            >
              <Image
                style={{ alignSelf: "center", width: 200, height: 200 }}
                width={200}
                height={200}
                source={require("../Icons/login/loginIcon.png")}
              ></Image>
              <Text style={[styles.title, { marginBottom: 20 }]}>
                Iniciar sesión
              </Text>
              <View style={{ gap: 20 }}>
                <TextInput
                  onChangeText={(text) => {
                    setCode(text);
                  }}
                  value={code}
                  placeholder="Codigo"
                  style={[styles.textInput, { paddingLeft: 15 }]}
                />
                <TextInput
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Nip"
                  style={[styles.textInput, { paddingLeft: 15 }]}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                {loading ? ( <ActivityIndicator size={"large"}/> ) : (<Button
                  onPress={() => {
                    fetchApi(code, password);
                  }}
                  title="Iniciar Sesión"
                ></Button>)
                }
              </View>
            </View>
          </View>

          <Navbar />
        </ImageBackground>
      </View>
    );
  }

  return isLogged ? profileScreen() : loginScreen();
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
