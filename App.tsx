//archivo principal
import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { StyleSheet } from 'react-native';

import "firebase/auth";

import MainStack from './navigation/MainStack.js';



export default function App() {

  

  return (
    <>

    <MainStack></MainStack>
    
    </>
  );
}

const styles = StyleSheet.create({

  background: {
    
    height: '100%',
    

  },



});

