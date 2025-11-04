import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Image,
  Button,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { globalColor } from "../GlobalStyles";
import Navbar from "../Components/Navbar";
import ModalPopUp from "../Components/General/ModalPopUp";
import ProfileAttribute from "../Components/Login/ProfileAttribute";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Components/General/AuthContext";
import { PieChart } from "react-native-gifted-charts";

import { ACADEMIC_DATA_FILENAME } from "../Components/General/Configuration";
import { PERSONAL_DATA_FILENAME } from "../Components/General/Configuration";

export default function Profile() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [loading, setLoading] = useState();

  const pieData = useRef([{}]);
  const basicoComunData = useRef([{}]);
  const basicaParticularObligatorio = useRef([{}]);
  const especializanteObligatoria = useRef([{}]);
  const especializanteSelectiva = useRef([{}]);
  const especializanteOptativaAbierto = useRef([{}]);
  const [loadedData, setLoadData] = useState(false);

  const [chartsInfo, setChartsInfo] = useState([]);

  const {
    isSignedIn,
    setSignIn,
    personalData,
    setPersonalData,
    academicData,
    setAcademicData,
  } = useContext(AuthContext);

  const creditChartColors = {
    remaining: "#EC1325",
    current: "#25DA3A",
  };

  function setDataToStates() {
    if (Object.keys(academicData).length === 0) return;

    let basicoComunJson = academicData.creditosAreas[0];
    let basicoParticularObligatoriaJson = academicData.creditosAreas[1];
    let especializanteObligatoriaJson = academicData.creditosAreas[2];
    let especializanteSelectivaJson = academicData.creditosAreas[3];
    let optativaAbiertaJson = academicData.creditosAreas[4];

    pieData.current = [
      {
        value: academicData.creditos,
        color: creditChartColors.current,
        text: academicData.creditos,
      },
      {
        value: academicData.creditosRequeridos - academicData.creditos,
        color: creditChartColors.remaining,
        text: academicData.creditosRequeridos - academicData.creditos,
      },
    ];

    basicoComunData.current = [
      {
        value: basicoComunJson.creditos,
        color: creditChartColors.current,
        text: basicoComunJson.creditos,
      },
      {
        value: basicoComunJson.faltantes,
        color: creditChartColors.remaining,
        text: basicoComunJson.faltantes,
      },
    ];

    basicaParticularObligatorio.current = [
      {
        value: basicoParticularObligatoriaJson.creditos,
        color: creditChartColors.current,
        text: basicoParticularObligatoriaJson.creditos,
      },
      {
        value: basicoParticularObligatoriaJson.faltantes,
        color: creditChartColors.remaining,
        text: basicoParticularObligatoriaJson.faltantes,
      },
    ];

    especializanteObligatoria.current = [
      {
        value: especializanteObligatoriaJson.creditos,
        color: creditChartColors.current,
        text: especializanteObligatoriaJson.creditos,
      },
      {
        value: especializanteObligatoriaJson.faltantes,
        color: creditChartColors.remaining,
        text: especializanteObligatoriaJson.faltantes,
      },
    ];

    especializanteSelectiva.current = [
      {
        value: especializanteSelectivaJson.creditos,
        color: creditChartColors.current,
        text: especializanteSelectivaJson.creditos,
      },
      {
        value: especializanteSelectivaJson.faltantes,
        color: creditChartColors.remaining,
        text: especializanteSelectivaJson.faltantes,
      },
    ];

    especializanteOptativaAbierto.current = [
      {
        value: optativaAbiertaJson.creditos,
        color: creditChartColors.current,
        text: optativaAbiertaJson.creditos,
      },
      {
        value: optativaAbiertaJson.faltantes,
        color: creditChartColors.remaining,
        text: optativaAbiertaJson.faltantes,
      },
    ];

    setLoadData(true);
  }

  useEffect(setDataToStates, [academicData]);

  useEffect(() => {
    if (
      isSignedIn &&
      Object.keys(personalData).length === 0 &&
      Object.keys(academicData).length === 0
    ) {
      if (!getUserData()) {
        setSignIn(false);
      } else {
        setDataToStates();
      }
    }
  }, []);

  async function saveData(personalData, academicData) {
    let success;

    try {
      await AsyncStorage.setItem(PERSONAL_DATA_FILENAME, personalData);
      await AsyncStorage.setItem(ACADEMIC_DATA_FILENAME, academicData);
      success = true;
    } catch (e) {
      console.error("Profile.js/saveData() -> ", e);
      success = false;
    }

    return success;
  }

  async function removeData() {
    let success;

    try {
      await AsyncStorage.removeItem(PERSONAL_DATA_FILENAME);
      await AsyncStorage.removeItem(ACADEMIC_DATA_FILENAME);
      success = true;
    } catch (e) {
      console.error("Profile.js/removeData() -> ", e);
      success = false;
    }

    return success;
  }

  async function getUserData() {
    let success;

    try {
      const personalData = await AsyncStorage.getItem(PERSONAL_DATA_FILENAME);
      const academicData = await AsyncStorage.getItem(ACADEMIC_DATA_FILENAME);

      setPersonalData(JSON.parse(personalData));
      setAcademicData(JSON.parse(academicData));

      if (personalData === null || academicData === null) {
        setSignIn(false);
        removeData();
      }

      if (personalData !== null || academicData !== null) {
        success = true;
      }
    } catch (e) {
      console.error("Profile.js/getUserData() -> ", e);
      success = false;
    }

    return success;
  }

  function signIn(campus, name, cycle, code, status, degree) {
    try {
      setSignIn(true);
      setPersonalData({
        campus: campus,
        nombre: name,
        ciclo: cycle,
        codigo: code,
        situacion: status,
        carrera: degree,
      });
      setLoading(false);
    } catch (e) {
      console.log("No se pudo usar el contexto -> ", e);
    }
  }

  function signOut() {
    removeData();
    setSignIn(false);
    setPersonalData({});
    setAcademicData({});
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
    try {
      return (
        <View style={styles.MainContainer}>
          <View style={[styles.body]}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.title}>Perfil</Text>
              <TouchableOpacity onPress={signOut}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "thin",
                    color: "#BF1F02",
                    marginLeft: 90,
                  }}
                >
                  Cerrar sesion
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={{ marginTop: 45, gap: 5 }}>
                <Image
                  style={{ alignSelf: "center", width: 150, height: 150 }}
                  source={require("../Icons/login/user.png")}
                ></Image>
                <ProfileAttribute
                  attributeName={"Nombre"}
                  data={personalData.nombre}
                />
                <ProfileAttribute
                  attributeName={"Código"}
                  data={personalData.codigo}
                />
                <ProfileAttribute
                  attributeName={"Situación"}
                  data={personalData.situacion}
                />
                <ProfileAttribute
                  attributeName={"Carrera"}
                  data={personalData.carrera}
                />
                <ProfileAttribute
                  attributeName={"Último ciclo"}
                  data={personalData.ciclo}
                />
                <ProfileAttribute
                  attributeName={"Promedio"}
                  data={academicData.promedio}
                ></ProfileAttribute>
                <ProfileAttribute
                  attributeName={"Creditos"}
                  data={academicData.creditos}
                ></ProfileAttribute>
                <ProfileAttribute
                  attributeName={"Creditos Requeridos"}
                  data={academicData.creditosRequeridos}
                ></ProfileAttribute>

                <ScrollView horizontal={true}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      margin: 50,
                      gap: 50,
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        backgroundColor: globalColor.background,
                        padding: 10,
                        borderRadius: 30,
                        marginTop: 15,
                        marginBottom: 15,
                      }}
                    >
                      {/* Inicia Creditos generales */}

                      <Text style={{ fontSize: 20 }}>Creditos generales</Text>
                      <PieChart
                        donut
                        textColor="white"
                        showText
                        radius={128}
                        textSize={20}
                        data={pieData.current}
                        showValuesAsLabels
                        focusOnPress
                      />

                      <View style={{ marginTop: 20 }}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {renderDot(creditChartColors.current)}
                          <Text>
                            Creditos actuales: {academicData.creditos}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {renderDot(creditChartColors.remaining)}
                          <Text>
                            Creditos faltantes:{" "}
                            {academicData.creditosRequeridos -
                              academicData.creditos}
                          </Text>
                        </View>

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={styles.legendImportant}>
                            Creditos totales:{" "}
                            {" " + academicData.creditosRequeridos}
                          </Text>
                        </View>
                      </View>

                      {/* Termina creditos generales */}
                    </View>

                    <View
                      style={{
                        alignSelf: "center",
                        backgroundColor: globalColor.background,
                        padding: 10,
                        borderRadius: 30,
                        marginTop: 15,
                        marginBottom: 15,
                      }}
                    >
                      {/* Inicia Creditos Formacion basica */}

                      <Text style={{ fontSize: 20 }}>
                        Creditos Basico comun
                      </Text>
                      <PieChart
                        donut
                        textColor="white"
                        showText
                        radius={128}
                        textSize={20}
                        data={basicoComunData.current}
                        showValuesAsLabels
                        focusOnPress
                      />

                      <View style={{ marginTop: 20 }}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {renderDot(creditChartColors.current)}
                          <Text>
                            Creditos actuales:{" "}
                            {academicData.creditosAreas[0].creditos}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {renderDot(creditChartColors.remaining)}
                          <Text>
                            Creditos faltantes:{" "}
                            {academicData.creditosAreas[0].faltantes}
                          </Text>
                        </View>

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={styles.legendImportant}>
                            Creditos totales:{" "}
                            {" " + academicData.creditosAreas[0].requeridos}
                          </Text>
                        </View>
                      </View>

                      {/* Termina creditos generales */}
                    </View>

                    <View
                      style={{
                        alignSelf: "center",
                        backgroundColor: globalColor.background,
                        padding: 10,
                        borderRadius: 30,
                        marginTop: 15,
                        marginBottom: 15,
                      }}
                    >
                      {/* Inicia Creditos Basico obligatoria */}

                      <Text style={{ fontSize: 20 }}>
                        Basico Particular Obligatorio
                      </Text>
                      <PieChart
                        donut
                        textColor="white"
                        showText
                        radius={128}
                        textSize={20}
                        data={basicaParticularObligatorio.current}
                        showValuesAsLabels
                        focusOnPress
                      />

                      <View style={{ marginTop: 20 }}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {renderDot(creditChartColors.current)}
                          <Text>
                            Creditos actuales:{" "}
                            {academicData.creditosAreas[1].creditos}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {renderDot(creditChartColors.remaining)}
                          <Text>
                            Creditos faltantes:{" "}
                            {academicData.creditosAreas[1].faltantes}
                          </Text>
                        </View>

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={styles.legendImportant}>
                            Creditos totales:{" "}
                            {" " + academicData.creditosAreas[0].requeridos}
                          </Text>
                        </View>
                      </View>
                      {/* Termina creditos basico particular obligatorio */}
                    </View>


                      



                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
          <Navbar />
        </View>
      );
    } catch (e) {
      console.error("ERROR profile() -> ", e);
      return <View></View>;
    }
  }

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,

          width: 10,

          borderRadius: 5,

          backgroundColor: color,

          marginRight: 10,
        }}
      />
    );
  };

  function formatData(data) {
    const dataString = data.toString();

    const firstKeyIndex = dataString.indexOf("}") + 1;

    const studentPersonalData = dataString.slice(0, firstKeyIndex);
    const studentAcademicData = dataString.slice(firstKeyIndex);

    return {
      personalData: studentPersonalData,
      academicData: studentAcademicData,
    };
  }

  function fetchApi(code, password) {
    // https://cuceimobile.space/campusCucei/auth.php?codigo=22&nip=33

    setLoading(true);
    fetch(
      `https://cuceimobile.space/campusCucei/auth.php?codigo=${code}&nip=${password}`
    )
      .then((response) => response.text()) // Parse the response as JSON
      .then((data) => {
        try {
          let dataJson = JSON.parse(data);

          if (dataJson.message || dataJson.error) {
            let my_message =
              dataJson.error !== undefined ? dataJson.error : dataJson.message;
            console.log("MENSAJE -> ", my_message);
            openModal("Ha ocurrido un problema", my_message);
            setLoading(false);
          }
          return;
        } catch (e) {
          try {
            const { personalData, academicData } = formatData(data);
            const personalJson = JSON.parse(personalData);
            const academicJson = JSON.parse(academicData);

            saveData(personalData, academicData);

            signIn(
              personalJson.campus,
              personalJson.nombre,
              personalJson.ciclo,
              personalJson.codigo,
              personalJson.situacion,
              personalJson.carrera
            );

            setAcademicData(academicJson);
          } catch {
            openModal(
              "Ha ocurrido un problema",
              "Vuelve a intentar el inicio de sesion en unos minutos."
            );
            setLoading(false);
            console.log("Profile.js/fetchApi() -> ", e);
          }
        }
      })
      .catch((error) => {
        openModal(
          "Ha ocurrido un problema",
          "Vuelve a intentar el inicio de sesion en unos minutos."
        );
        setLoading(false);
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
              <View style={{ marginTop: 60 }}>
                {loading ? (
                  <ActivityIndicator size={"large"} />
                ) : (
                  <Button
                    onPress={() => {
                      fetchApi(code, password);
                    }}
                    title="Iniciar Sesión"
                  ></Button>
                )}
              </View>
            </View>
          </View>

          <Navbar />
        </ImageBackground>
      </View>
    );
  }
  let callback;

  if (isSignedIn) {
    if (loadedData) {
      callback = profileScreen;
    } else {
      callback = () => (
        <View>
          <Text>Loading . . .</Text>
        </View>
      );
    }
  } else {
    callback = loginScreen;
  }

  return callback();
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

  legendImportant: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
