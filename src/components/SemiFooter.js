/* Aqui se escribio lo de los botones encender/apagar */

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function SemiFooter() {
  return (
    <View style={styles.viewSemiFooter}>
      {/* estos son los botones de Encender/Apagar */}
      <TouchableOpacity style={styles.botonEncender}>
        <Text style={styles.textEncender}>ON <FontAwesome5 style={{ color: colors.BLUE_COLOR, fontSize: 30 }} name={'power-off'}></FontAwesome5></Text>
      </TouchableOpacity>

    <TouchableOpacity style={styles.botonApagar}>
    <Text style={styles.textApagar}>OFF</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  viewSemiFooter: {
    marginTop: "0%",
    width: "100%",
    backgroundColor: colors.PRIMARY_COLOR,
    height: "30%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
    paddingBottom: 38
    
  },

  //estos son los estilos para los botones

  textEncender: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.GREEN_COLOR,
    
  },

  textApagar: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.RED_COLOR,
    
    
  },

  botonEncender:{
    
    backgroundColor: colors.PRIMARY_COLOR,
    padding: 10,
    borderRadius: 20,
    borderWidth:2,
    
  },
  botonApagar:{
    backgroundColor: colors.PRIMARY_COLOR,
    padding: 10,
    borderRadius: 20,
    alignItems: 'flex-end',
    marginBottom:'1%',
    borderWidth:2,
    marginTop: "2%"
  }

})