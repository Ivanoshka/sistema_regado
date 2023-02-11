import React from "react";
import { View,  Image, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react'
import colors from '../utils/colors';


export default function FooterActionBar({navigation}){
    return(
      <>
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
        </>
    );
}

const styles = StyleSheet.create({
    footerAñadirBlueAndMiCuenta:{
      height: '100%',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignContent: 'center',
      backgroundColor: colors.BLUE_COLOR,
      paddingHorizontal: 30,
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
    },
    iconConexion:{
      marginTop: 19,
      marginBottom: 22,
      marginLeft: 75,
      color: colors.PRIMARY_COLOR,
      fontSize: 20
    },
    iconUser:{
      marginTop: 19,
      marginBottom: 22,
      marginRight: 75,
      color: colors.PRIMARY_COLOR,
      fontSize: 20

    }
})


