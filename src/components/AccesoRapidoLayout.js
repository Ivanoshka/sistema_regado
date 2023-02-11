/* Está es la pagina de la pantalla del acceso rapido* */

import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  
  useColorScheme,

} from 'react-native';
import colors from '../utils/colors';
import BlueetoothList from './blueetooth_list';
import SemiFooter from './SemiFooter';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Auth from './Auth';
import firebase from '../utils/firebase';
import { useState,useEffect } from 'react';

import colors2 from '../utils/colors2';
export default function AccesoRapidoLayout({navigation}) {
  return (

/*     esta es la barra de arriba
 */    <>

  
      <View style={styles.viewPrincipal}>
        <StatusBar barStyle="light-content"></StatusBar>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.titleApp}>SISTEMA DE RIEGO</Text>
        </SafeAreaView>
      

        <View style={styles.viewAñadirBluetooth}>
          <Text style={styles.textBienvenida}>Bienvenido, para poder utilizar el sistema,
            por favor conecte su dispositivo</Text>
        </View>




        {/* AQUI INICIAR LO DEL BLUEETOOTH
 */}

<View style={styles.viewSemiFooter}>
      {/* estos son los botones de Encender/Apagar */}
      
      <TouchableOpacity style={styles.botonEncender} onPress={console.log("Prendido")}>
      <FontAwesome5 style={{ color: colors.BLUE_COLOR, fontSize: 30, padding: 4}} name={'power-off'}></FontAwesome5>
        <Text style={styles.textEncender}>ON</Text>
      </TouchableOpacity>
      

    <TouchableOpacity style={styles.botonApagar} onPress={console.log("Apagado")}>
    <Text style={styles.textApagar}>OFF</Text>
    </TouchableOpacity>
    </View>





       <View style={styles.footerAñadirBlueAndMiCuenta}>
          <View >
            <TouchableOpacity onPress={()=> navigation.navigate('AccesoRapido')}>
            <FontAwesome5 style={styles.iconConexion} name={'wifi'}></FontAwesome5>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <FontAwesome5 style={styles.iconUser} name={'user'}></FontAwesome5>
            </TouchableOpacity>
          </View>
        </View>
      
        </View>
     
    </>
  );

  
}

/* ESTILOS CSS de Pantalla Principal por default
 */
const styles = StyleSheet.create({
    viewPrincipal: {
      backgroundColor: colors.BLUE_COLOR,
      height:'100%'
    },
  
    safeArea: {
      backgroundColor: colors.VERDE_SABROSO,
      height: 80,
      borderBottomLeftRadius: 120,
      borderBottomRightRadius: 120,
      alignItems: 'center',
    },
  
    titleApp: {
      fontSize: 35,
      fontWeight: "bold",
      color: colors.PRIMARY_COLOR,
      marginTop: 15
    },
  
    viewAñadirBluetooth: {
      height: 90,
      paddingTop: 10,
      paddingLeft: 30,
      paddingRight: 30,
      backgroundColor: colors.PRIMARY_COLOR,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  
    textBienvenida: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.PRIMARY_COLOR_DARK,
      textAlign: "center",
      paddingTop: '1%'
  
  
  
    },
  
    footerAñadirBlueAndMiCuenta: {
      position: 'absolute',
      bottom:0,
      flexDirection: 'row',
      width: '100%',
      height:"11%",
      justifyContent: 'space-between',
      alignContent: 'center',
      backgroundColor: colors.BLUE_COLOR,
      paddingHorizontal: 30,
      borderTopLeftRadius:30,
      borderTopRightRadius:30

  
    },
    iconConexion: {
      marginTop: 19,
      marginBottom: 13,
      marginLeft: 75,
      color: colors.GREEN_COLOR,
      fontSize: 20
    },
    iconUser: {
      marginTop: 19,
      marginBottom: 13,
      marginRight: 75,
      color: colors.PRIMARY_COLOR,
      fontSize: 20
    },
    viewSemiFooter: {
      marginTop: "0%",
      width: "100%",
      backgroundColor: colors.PRIMARY_COLOR,
      height: "70%",
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:"0%",
      paddingBottom: 38,
      
      
    },
  
    //estos son los estilos para los botones
  
    textEncender: {
      fontWeight: "bold",
      fontSize: 30,
      color: colors.PRIMARY_COLOR,
        textAlign: 'center',
        paddingVertical: 15,
        fontFamily: 'Poppins-Bold',
    
      
    },
  
    textApagar: {
      fontWeight: "bold",
      fontSize: 20,
      color: colors.PRIMARY_COLOR,
      
      
    },
  
    botonEncender:{
      
      backgroundColor: colors.GREEN_COLOR,
      width: "16%",
      padding: 10,
      borderRadius: 30,
      alignContent: 'center'
  
      
    },
    botonApagar:{
      backgroundColor: colors.RED_COLOR,
      padding: 10,
      width:"50%",
      borderRadius: 30,
      alignItems: 'center',
      marginBottom:'1%',
      marginTop: "8%"
    }
  
  });


  