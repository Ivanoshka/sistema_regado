/* Está es la pagina de la pantalla del acceso rapido* */

import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Auth from './Auth';
import firebase from '../utils/firebase';
import { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import BleManager, { Device, isAdapterEnabled } from 'react-native-ble-plx';
import BluetoothSerial, { getServices } from 'react-native-bluetooth-serial-next';
import { async } from '@firebase/util';
import Empty from './Empty';
import Toast from 'react-native-toast-message';

function AccesoRapidoLayout({ navigation, props }) {

  const [lista, setLista] = useState([]);
  const [bolEnable, setBolEnable] = useState(false);



  useEffect(() => {

    async function init() {
      const enable = await BluetoothSerial.requestEnable(); /* pide permiso de encender bluetooth */
      const lista = await BluetoothSerial.list(); /* muestra la lista de los dispositivos */

      setLista(lista)
      console.log(lista)
    }

    init();

    return () => {
      async function remove() {
        await BluetoothSerial.cancelDiscovery();
        await BluetoothSerial.stopScanning();
        console.log('Termino scanner');
      }

      remove();
    }
  }, []);





  //Para acceder al nombre del dispositivo bluetooth
  const dispositivoActivo = BluetoothSerial.isEnabled()
    .then((enabled) => {
      if (enabled) {

        BluetoothSerial.list()
          .then((devices) => {
            devices.forEach((device) => {
              if (devices) {
                console.log(device.name); // mostrará el nombre del dispositivo en la consola
              }

            });
          })
          .catch((err) => console.error(err.message));
      }
    })
    .catch((err) => console.error(err.message));

  console.log('Ya pase la funcion');



  //ESTÁ FUNCION YA MANDA LOS PARAMETROS A ESP32
  const BtnOn = async () => {
    try {
      const devices = await BluetoothSerial.list();
      const device = devices.find(device => device.name === "SuperHombre");

      // Conectar al dispositivo Bluetooth
      await BluetoothSerial.connect(device.address);

      // Enviar datos a través de la conexión Bluetooth
      await BluetoothSerial.write("A");
      await BluetoothSerial.write("E");
      await BluetoothSerial.device(device.id).disconnect();

    } catch (error) {
      console.log(error);
    }
  }







//ESTA FUNCION APAGA EL SISTEMA DE RIEGO

  const btnOFF = async () => {

    try {
      const devices = await BluetoothSerial.list();
      const device = devices.find(device => device.name === "SuperHombre");

      // Conectar al dispositivo Bluetooth
      await BluetoothSerial.connect(device.address);

      // Enviar datos a través de la conexión Bluetooth
      await BluetoothSerial.write("A");
      await BluetoothSerial.write("O");
      await BluetoothSerial.device(device.id).disconnect();
      console.log('Apagado')

    } catch (error) {
      console.log(error);
    }

  }

  //esto es para el modal
  const [modalVisible, setModalVisible] = useState(false);



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
            por favor conecte su dispositivo <FontAwesome5 style={styles.iconBluetooth} name={'bluetooth'}></FontAwesome5>

          </Text>


        </View>


        {/* AQUI INICIAR LO DEL BLUEETOOTH
 */}

        <View style={styles.viewSemiFooter}>

          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
          >
            {/* este modal solo se  muestra para decir el proceso de bt */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '800',
                    color: colors.PRIMARY_COLOR_DARK,
                    textAlign: "center",
                    paddingTop: '1%'
                  }}>¿Como Uso El Sistema De Riego?<FontAwesome5 style={{color: colors.BLUE_COLOR,
                    fontSize: 20}} name={'bluetooth'}></FontAwesome5></Text>

                  <Text style={{ marginTop: '5%' }}></Text>

                  <Text style={{ marginTop: '5%', textAlign: 'justify' }}>1. Comprueba que tu Bluetooth esté Encendido</Text>


                  <Text style={{ marginTop: '5%', textAlign: 'justify' }}>2. Conecta el bluetooth a 'SuperHombre.</Text>

                  {/*                   2. Una vez prendido el Bluetooth, conectate a 'SuperHombre'
 */}
                  <Text style={{ marginTop: '5%', textAlign: 'justify' }}>3. Listo, para usar tu sistema de riego, El boton 'ON' prendera tu sistema de riego, por otra parte 'OFF' lo apagará.</Text>
                  {/* 
                  3. Estas listo para usar tu sistema de riego, El boton 'ON' prendera tu sistema de riego, por otra parte 'OFF' lo apagará. */}

                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text style={styles.textStyle}
              onPress={() => setModalVisible(true)}
            >¿Necesitas Ayuda?</Text>
          </TouchableOpacity>

          {/* estos son los botones de Encender/Apagar */}

          <TouchableOpacity style={styles.botonEncender} onPress={BtnOn}>
            <FontAwesome5 style={{ color: colors.BLUE_COLOR, fontSize: 30, padding: 4, paddingLeft: 7 }} name={'power-off'}></FontAwesome5>
            <Text style={styles.textEncender}>ON</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.botonApagar} onPress={btnOFF}>
            <Text style={styles.textApagar}>OFF</Text>
          </TouchableOpacity>
        </View>





        <View style={styles.footerAñadirBlueAndMiCuenta}>
          <View >
            <TouchableOpacity onPress={() => navigation.navigate('AccesoRapido')}>
              <FontAwesome5 style={styles.iconConexion} name={'wifi'}></FontAwesome5>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
    height: '100%'
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
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: "8%",
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: colors.BLUE_COLOR,
    paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20


  },
  iconConexion: {
    marginTop: "8%",
    marginBottom: "0%",
    marginLeft: "46%",
    color: colors.GREEN_COLOR,
    fontSize: 20
  },

  iconBluetooth: {
    marginTop: "8%",
    marginBottom: "0%",
    marginLeft: "46%",
    color: colors.BLUE_COLOR,
    fontSize: 20
  },
  iconUser: {
    marginTop: "14%",
    marginBottom: "0%",
    marginRight: "25%",
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
    paddingTop: "0%",
    paddingBottom: 38,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30


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

  botonEncender: {

    backgroundColor: colors.GREEN_COLOR,
    width: "16%",
    padding: 10,
    borderRadius: 30,
    alignContent: 'center'

  },
  botonApagar: {
    backgroundColor: colors.RED_COLOR,
    padding: 10,
    width: "50%",
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: '1%',
    marginTop: "8%"
  },
  buttonOpen: {
    backgroundColor: colors.BLUE_COLOR,
    width: '40%',
    marginLeft: '30%',
    marginRight: '30%',
    marginBottom: '10%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: '8%'
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  }

});


export default AccesoRapidoLayout;