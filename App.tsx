//archivo principal
import React, { useState } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

import "firebase/auth";

import MainStack from './navigation/MainStack.js';
/* import useBLE from './useBLE'; */
import { Base64 } from 'react-native-ble-plx';
import {LogBox} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';
import { CheckBox } from 'react-native-elements';
import { PermissionsAndroid } from 'react-native/Libraries/PermissionsAndroid/PermissionsAndroid.js';





export default function App() {

/*   esto ya no lo estoy utilizando
 */  

/* 
const {requestPermissions} = useBLE();
 
  const openModal = async () => {
      requestPermissions((isGranted: boolean) => {
          alert("The Android Permission is Granted? ", isGranted);
      });
  } 


 */


  return (
    <>
    
    <MainStack></MainStack>
    </>
  );
}



