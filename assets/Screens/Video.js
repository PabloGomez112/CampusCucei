import { ActivityIndicator, StyleSheet, Text, View, Butto, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Navbar from '../Components/Navbar'
import { globalColor } from '../GlobalStyles'
import WebView from 'react-native-webview'
import { supabase } from '../API/SupabaseClient'
import YoutubePlayer from 'react-native-youtube-iframe'

export default function Video() {
  const [videoUri, setVideoUri] = useState('');

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);



  useEffect(() => {
    const fetchVideo = async () =>{
    try {
      const {data: source, error} = await supabase.from('sources').select('*').eq('name', 'video_institucional').single();

      if (error) {
        throw error;
      }
      
      setVideoUri(source.videoUri);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  fetchVideo();
  }, [])

    return (
      <View style={styles.MainContainer}>
        <View style={styles.body}>
          <View style={{height: 300}}>
          <View>
              <YoutubePlayer
              height={300}
              width={450}
              play={playing}
              videoId={videoUri}
              onChangeState={onStateChange}
            />
      </View>
          <View style={{height: 400}}>
          <Text style={{fontSize: 32, color: "black", fontWeight: 'bold', padding: 10, marginLeft: 20}}>Transcripción</Text>
          <ScrollView style={{flex: 1}}>
            <Text style={{fontSize: 22, fontWeight: 'condensed', margin: 10, padding: 15}}>
              [Música] {'\n'}
              a la universidad de guadalajara es la segunda universidad más grande de méxico y por sus indicadores de calidad y excelencia una de las más importantes universidades estatales a partir de 1994 se conformó como red universitaria integrada actualmente por 16 centros universitarios el sistema de educación media superior y el sistema de universidad virtual el centro universitario de ciencias exactas e ingenierías es uno de los centros temáticos de la red universitaria de la universidad de guadalajara contamos con 18 programas educativos de licenciatura y 24 posgrados que atienden a más de 17.000 alumnos para el cumplimiento de sus fines el centro universitario cuenta con una estructura encabezada por el consejo del centro con la rectoría como autoridad ejecutiva para su oferta académica y organización cuenta con tres divisiones división de ciencias básicas división de ingenierías división de tecnologías para la integración ciber humana con base en un modelo departamental se atiende las necesidades de formación académica de los estudiantes y el desarrollo de actividades de investigación y extensión universitaria nuestros programas educativos de licenciatura son licenciatura en física licenciatura en matemáticas licenciatura en química licenciatura en químico farmacéutico biólogo licenciatura en ciencia de materiales ingeniería civil ingeniería en alimentos y biotecnología ingeniería en topografía geomática ingeniería industrial ingeniería mecánica eléctrica ingeniería química ingeniería en logística y transporte ingeniería informática e ingeniería biomédica e ingeniería en computación ingeniería en comunicaciones y electrónica ingeniería en fotónica e ingeniería robótica las cuales garantizan a nuestros estudiantes una formación de calidad pues están acreditadas por organismos acreditadores reconocidos por su parte en relación a los postgrados 21 de los 24 con que cuenta el centro universitario pertenecen al padrón nacional de posgrados de calidad lo que significa que forman parte de los mejores posgrados del país en las áreas de física química inocuidad alimentaria enseñanza de las matemáticas ciencias en matemáticas hidrometeorología materiales microbiología y biotecnología molecular ingeniería química procesos biotecnológicos proyectos tecnológicos ingeniería eléctrica productos forestales [Música] ingeniería electrónica y computación bioingeniería y cómputo inteligente cómputo aplicado ciencias de la electrónica y la computación de ellos 15 son maestrías y 9 doctorados cabe destacar que la maestría en ingeniería química y el doctorado en física están considerados como de competencia internacional una de nuestras principales fortalezas es la comunidad académica de la cual más de 500 profesores son de tiempo completo muchos de ellos con notable prestigio nacional e internacional casi el 43 por ciento de los profesores son miembros del sistema nacional de investigadores sni y más del 73% cuentan con el reconocimiento como perfil pro de ambas distinciones otorgadas por instituciones federales reconociéndoles su productividad en la investigación y calidad en la docencia respectivamente para el desarrollo de la investigación y la docencia se promueve el trabajo conjunto de académicos y estudiantes y se cuenta con laboratorios que poseen equipamiento científico de primer nivel su trabajo permite generar conocimientos y tecnología de punta por su productividad destacan áreas de materiales polímeros nanotecnología biotecnología robótica ingeniería alimentaria control aprovechamiento de la madera y celulosa tecnología del papel y meteorología ingeniería ambiental procesamientos de plásticos inocuidad de alimentos bioequivalencia de fármacos físico química y desarrollo de software relatividad óptica cuántica gravitación sísmica entre otras más esas fortalezas nos permiten establecer relaciones de colaboración con otras universidades empresas y proyectos del sector público y social en el tema de movilidad tenemos una actividad permanente con otras instituciones nacionales y extranjeras mediante la cual recibimos profesores visitantes y nuestros académicos participan con ellas recibimos y enviamos estudiantes que complementan sus estudios y hacen estancias de investigación así como investigadores que realizan estancias postdoctorales desarrollamos proyectos conjuntos tanto con otras instituciones educativas como con empresas para la investigación y la aplicación innovadora del conocimiento vinculación genera entre otras ventajas la posibilidad de que los estudiantes se enfrenten a situaciones reales en su proceso de formación los académicos colaboran en acciones de educación continua asesorías servicios y desarrollo de prototipos entre los programas de apoyo a las actividades académicas destaca el servicio que presta el centro integral de documentación con más de 34 mil títulos y 113 mil volúmenes a los cuales se suman más de 3.800.000 libros electrónicos disponibles en la biblioteca digital de la universidad y el servicio de bases de datos mediante el cual se accede a un sinnúmero de revistas y artículos científicos el cip es sin duda uno de los orgullos de este centro universitario gracias a la ubicación privilegiada de cruce y cumpliendo los requisitos correspondientes los estudiantes pueden tener acceso a las instalaciones deportivas que se encuentran junto al centro universitario además contamos con selecciones en diversos deportes individuales y de conjunto que participan en torneos locales las actividades deportivas culturales y recreativas son elementos importantes en la formación integral de los estudiantes por lo que se imparten talleres artísticos culturales y se llevan a cabo exposiciones de pintura artes visuales y esculturas en las cuales participan estudiantes egresados y académicos en el centro universitario de ciencias exactas e ingenierías nuestra principal razón de ser son nuestros estudiantes es por eso que trabajamos para brindarles un entorno de excelencia educativa {'\n'}[Música]
            </Text>

          </ScrollView>
          </View>
          </View>
        </View>
      <Navbar></Navbar>
      </View>)
  }

const styles = StyleSheet.create({
     MainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: globalColor.background,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: globalColor.text,
            justifyContent: 'flex-start',
        },
    
        body:{
          flex: 9,
          marginTop: 60,
          height: 200,
          width: '100%',
          backgroundColor: globalColor.background,
          alignItems: 'center',
        },
    
        listContainer: {
          marginTop: 20,  
        }
})