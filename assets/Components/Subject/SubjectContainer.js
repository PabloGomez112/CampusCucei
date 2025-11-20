import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { globalColor } from '../../GlobalStyles';

export default function SubjectContainer({nrc, 
    fecha, 
    calificacion, 
    tipo, 
    descripcion, 
    ciclo, 
    clave, 
    creditos}) {

        const {height, width} = useWindowDimensions();

  return (
    <View>
        <View style={{width: width*0.90, backgroundColor: globalColor.background, elevation: 10, borderRadius: 25, padding: 10}}>
            <View style={{margin: 3,flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Text style={{backgroundColor: globalColor.secondary, borderRadius: 20, padding: 5, fontWeight: 'bold'}}>{ciclo}</Text>
            </View>
            <View style={{margin: 15}}>
                <Text style={{fontSize: 20, fontWeight: '900'}}>{descripcion}</Text>
            </View>
            <View style={{backgroundColor: globalColor.backgroundSecondary, padding: 20, borderRadius: 10, gap: 5,}}>
                <Text style={{fontSize: 20}}>NRC: <Text style={{fontWeight: 'bold'}}>{nrc}</Text></Text>
                <Text style={{fontSize: 20}}>Calificacion: <Text style={{fontWeight: 'bold'}}>{calificacion}</Text></Text>
                <Text style={{fontSize: 20}}>Fecha de captura: <Text style={{fontWeight: 'bold'}}>{fecha}</Text></Text>
                <Text style={{fontSize: 20}}>Tipo: <Text style={{fontWeight: 'bold'}}>{tipo}</Text></Text>
                <Text style={{fontSize: 20}}>Clave: <Text style={{fontWeight: 'bold'}}>{clave}</Text></Text>
                <Text style={{fontSize: 20}}>Creditos: <Text style={{fontWeight: 'bold'}}>{creditos}</Text></Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})