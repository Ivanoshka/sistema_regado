import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Text, CheckBox } from "react-native-elements";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../utils/colors';
import RayaDebajoWifi from "./RayaDebajoWifi";
import { Picker } from '@react-native-picker/picker';
import colors2 from "../utils/colors2";
import Toast from 'react-native-toast-message';
import RNPermissions from 'react-native-permissions';
import { Platform, PermissionsAndroid } from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial-next';
import { async } from "@firebase/util";


const Home = ({ }) => {

  const [lista, setLista] = useState([]);
  const [bolEnable, setBolEnable] = useState(false);

  /*   const renderEmpty = () => <Empty text="No hay dispositivos"></Empty> 
    const renderItem = ({item}) => {
      return <Device {...item} ></Device>
    } */

  useEffect(() => {

    async function init() {
      const enable = await BluetoothSerial.requestEnable(); /* pide permiso de encender bluetooth */
      const lista = await BluetoothSerial.list(); /* muestra la lista de los dispositivos */

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

  useEffect(() => {
    getData();

  }, [])

  const getData = async () => {
    const nombre = await AsyncStorage.getItem('NOMBRE');
    const apellido = await AsyncStorage.getItem('APELLIDO');
    const email = await AsyncStorage.getItem('EMAIL');
    const pass = await AsyncStorage.getItem('PASSWORD');


    console.log(nombre);
    console.log(apellido);
    console.log(email);
    console.log(pass);

  }
  //funcion que manda parametro por bluetooth
  const btnOn = async () => {

    try {
      const devices = await BluetoothSerial.list();
      const device = devices.find(device => device.name === "SuperHombre");

      // Conectar al dispositivo Bluetooth
      await BluetoothSerial.connect(device.address);

      // Enviar datos a través de la conexión Bluetooth
      await BluetoothSerial.write("A");
      await BluetoothSerial.device(device.id).disconnect();
      console.log('Prendido')

    } catch (error) {
      console.log(error);
    }

  }

  const btnOFF = async () => {

    try {
      const devices = await BluetoothSerial.list();
      const device = devices.find(device => device.name === "SuperHombre");

      // Conectar al dispositivo Bluetooth
      await BluetoothSerial.connect(device.address);

      // Enviar datos a través de la conexión Bluetooth
      await BluetoothSerial.write("O");
      await BluetoothSerial.device(device.id).disconnect();
      console.log('Apagado')

    } catch (error) {
      console.log(error);
    }
  }


  //esto es para el Toast
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Configuración Exitosa",
      text2: "El sistema de riego se ha configurado de manera correcta.",
      autoHide: true,
      visibilityTime: 4000,
      position: "bottom",

    });
  }

  //esto es para el Toast
  const ToastErrorAgendar = (TipoDeError) => {
    Toast.show({
      type: "error",
      text1: "Configuración Fallida",
      text2: TipoDeError,
      autoHide: true,
      visibilityTime: 4000,
      position: "bottom",

    });


  }

  /* Esto es para la seleccion de dias con los checkbox
   */
  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  /*    let hora = '';  */
  const [hora, setHora] = useState();
  const [minuto, setMinuto] = useState();
  const [minutosDuracion, setMinutosDuracion] = useState();

  const EnviarSecuenciaConDia = async (dia) => {
    await EnvioDeParametrosParaAgendaBT('A', numeroHorario);
    await EnvioDeParametrosParaAgendaBT('D', dia);

    await EnvioDeParametrosParaAgendaBT('D');

    //ESTA FUNCION PROCESA LO DE HORAS QUESE ENVIA POR BLUETOOTH, NOS AHORRAMOS SWICHT
    await EnvioDeParametrosParaAgendaBT('H', hora)
    //ESTA FUNCION PROCESA LO DE MINUTOS QUESE ENVIA POR BLUETOOTH, NOS AHORRAMOS SWICHT
    await EnvioDeParametrosParaAgendaBT('M', minuto)

    await EnvioDeParametrosParaAgendaBT('D');

    await EnvioDeParametrosParaAgendaBT('D', minutosDuracion)
  }


  const EnvioDeParametrosParaAgendaBT = async (primerParametro, SegundoParametro = '') => {
    try {

      // Enviar datos a través de la conexión Bluetooth
      await BluetoothSerial.write(primerParametro);
      if (SegundoParametro.length == 2) {
        await BluetoothSerial.write(SegundoParametro.charAt(0));
        await BluetoothSerial.write(SegundoParametro.charAt(1));

      } else if (SegundoParametro.length == 1) {
        await BluetoothSerial.write(SegundoParametro)
      } else if (SegundoParametro.length == 3 && primerParametro == 'D') {
        await BluetoothSerial.write(SegundoParametro.charAt(0));
        await BluetoothSerial.write(SegundoParametro.charAt(1));
        await BluetoothSerial.write(SegundoParametro.charAt(2));
      }

    } catch (error) {
      console.log(error);
    }
  }

  const conectarBT = async () => {
    try {
      const devices = await BluetoothSerial.list();
      const device = devices.find(device => device.name === "SuperHombre");

      // Conectar al dispositivo Bluetooth
      await BluetoothSerial.connect(device.address);

    } catch (error) {
      console.log(error);
    }
  }

  const DesconectarBT = async () => {
    await BluetoothSerial.device(device.id).disconnect();
  }



  const onSubmit = async () => {
    console.log("EL SISTEMA SE PRENDERA DE LA SIGUIENTE MANERA:")
    if (numeroHorario < "1" || numeroHorario > "3") {
      //aqui va el toast de error
      ToastErrorAgendar("Error al configurar el numero de sesion de riego");
      //no tiene que hacer nada
      return;
    }
    if (hora < "0" || hora > "23" || hora == null) {
      //aqui va el toast de error
      ToastErrorAgendar("Error al configurar la hora");
      //no tiene que hacer nada
      return;
    }
    //evalua el value de minuto
    if (minuto < "0" || minuto > "11" || minuto == null) {
      //aqui va el toast de error
      ToastErrorAgendar("Error al configurar el minuto");
      //no tiene que hacer nada
      return;
    }
    //Toast de error en la duracion
    if (minutosDuracion < 5 || minutosDuracion > 120) {
      ToastErrorAgendar("El tiempo de duracion es incorrecto");
      return;
    }
    console.log("Hora Seleccionada=", hora, "hrs");

    conectarBT();

    if (lunes) {
      EnviarSecuenciaConDia('L');
    } else {

    }
    if (martes) {
      EnviarSecuenciaConDia('M');
    } else {

    }
    if (miercoles) {
      EnviarSecuenciaConDia('N');
    } else {

    }
    if (jueves) {
      EnviarSecuenciaConDia('J');
    } else {

    }
    if (viernes) {
      EnviarSecuenciaConDia('V');
    } else {

    }
    if (sabado) {
      EnviarSecuenciaConDia('S');
    } else {

    }
    if (domingo) {
      EnviarSecuenciaConDia('G');
    } else {

    }
    DesconectarBT();
    showToast();
  }




  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

      <View style={styles.viewPrincipal}>
        <StatusBar barStyle="light-content"></StatusBar>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.titleApp}>SISTEMA DE RIEGO</Text>
        </SafeAreaView>
      </View>

      <View style={styles.viewDeTextoBienvidoDeNuevo}>
        <Text style={{ textAlign: "center", fontWeight: "bold", paddingTop: 15, fontSize: 25 }}>Bievenido de nuevo</Text>
      </View>

      <Text style={{ paddingTop: 20, paddingLeft: 20, fontSize: 20, textAlign: "justify" }}>Bluetooth<FontAwesome5 style={styles.iconConexion} name={'bluetooth'}></FontAwesome5> </Text>

      <Text style={{ padding: 18, fontSize: 12, textAlign: "center" }}> Antes de encender, asegurese que el dispostivo está conectado al sistema de riego, mediante Bluetooth </Text>

      <TouchableOpacity style={{ paddingTop: "1%", paddingLeft: "12%", paddingRight: "12%" }} onPress={btnOn}>
        <Text style={{
          fontSize: 30, textAlign: "center", width: 250,
          marginTop: 0,
          backgroundColor: colors2.BLUE,
          borderRadius: 60,
          marginLeft: 35,
          marginRight: 35,
          marginBottom: 10,
          color: colors.PRIMARY_COLOR
        }}>ON <FontAwesome5 style={{ color: colors.VERDE_SABROSO, fontSize: 30 }} name={'power-off'}></FontAwesome5></Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ paddingLeft: "12%", paddingRight: "12%" }} onPress={btnOFF}>
        <Text style={{
          fontSize: 30, textAlign: "center", backgroundColor: 'rgba(52, 52, 52, 0)',
          borderColor: colors2.BLUE,
          width: 250,
          borderWidth: 2,
          borderRadius: 60,
          marginLeft: 35,
          marginRight: 35,
        }}
        >OFF <FontAwesome5 style={{ color: colors.RED_COLOR, fontSize: 30 }} name={'power-off'}></FontAwesome5></Text>
      </TouchableOpacity>

      <RayaDebajoWifi></RayaDebajoWifi>

      <View style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }}>
        <Text style={{ paddingLeft: 20, fontWeight: 'bold', fontSize: 15, textAlign: "center" }}> <FontAwesome5 style={{ color: '#EDE574', fontSize: 35 }} name={'bell'}></FontAwesome5>     Selecciona un horario de riego automatico </Text>
      </View>


      <View style={{}}>

        <Text style={{ paddingLeft: 20, paddingTop: 10, fontWeight: 'bold', textAlign: "center", fontStyle: "italic" }}
        >Selecciona el numero de sesión de riego</Text>
        <Text>Puedes fijar hasta 3 diferentes sesiones de riego durante 1 día.</Text>
        <Picker style={{ fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 4, color: "black", paddingRight: 30, backgroundColor: colors.PRIMARY_COLOR, width: "80%", marginLeft: "10%", marginLeft: "10%", marginTop: "4%", borderBottomLeftRadius: 20 }}

          selectedValue={numeroHorario}
          onValueChange={(value) => {
            setHora(value),
              console.log("seleccionaste el numero de riego: ", value)
          }}
        >
          <Picker.Item label="Seleccionar numero de horario" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />

        </Picker>

        <RayaDebajoWifi></RayaDebajoWifi>

        <Text style={{ paddingLeft: 20, paddingTop: 10, fontWeight: 'bold', textAlign: "center", fontStyle: "italic" }}
        >Selecciona la hora de Inicio</Text>
        <Picker style={{ fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 4, color: "black", paddingRight: 30, backgroundColor: colors.PRIMARY_COLOR, width: "80%", marginLeft: "10%", marginLeft: "10%", marginTop: "4%", borderBottomLeftRadius: 20 }}

          selectedValue={hora}
          onValueChange={(value) => {
            setHora(value),



              console.log("seleccionaste la hora de: ", value)



          }}

        >
          <Picker.Item label="Seleccionar hora" />
          <Picker.Item label="00:00" value="0" />
          <Picker.Item label="01:00" value="1" />
          <Picker.Item label="02:00" value="2" />
          <Picker.Item label="03:00" value="3" />
          <Picker.Item label="04:00" value="4" />
          <Picker.Item label="05:00" value="5" />
          <Picker.Item label="06:00" value="6" />
          <Picker.Item label="07:00" value="7" />
          <Picker.Item label="08:00" value="8" />
          <Picker.Item label="09:00" value="9" />
          <Picker.Item label="10:00" value="10" />
          <Picker.Item label="11:00" value="11" />
          <Picker.Item label="12:00" value="12" />
          <Picker.Item label="13:00" value="13" />
          <Picker.Item label="14:00" value="14" />
          <Picker.Item label="15:00" value="15" />
          <Picker.Item label="16:00" value="16" />
          <Picker.Item label="17:00" value="17" />
          <Picker.Item label="18:00" value="18" />
          <Picker.Item label="19:00" value="19" />
          <Picker.Item label="20:00" value="20" />
          <Picker.Item label="21:00" value="21" />
          <Picker.Item label="22:00" value="22" />
          <Picker.Item label="23:00" value="23" />
        </Picker>

        <RayaDebajoWifi></RayaDebajoWifi>

        <Text style={{ paddingLeft: 20, paddingTop: 10, fontWeight: 'bold', textAlign: "center", fontStyle: "italic" }}
        ><FontAwesome5 style={{ color: '#EDE574', fontSize: 35 }} name={'bell'}></FontAwesome5>  Selecciona el minuto de inicio </Text>

        <Text style={{ padding: 18, fontSize: 12, textAlign: "center" }}> El minuto que selecciones, será el minuto dentro de la hora que seleccionaste en el que se encenderá el sistema </Text>
        <Picker style={{ fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 4, color: "black", paddingRight: 30, backgroundColor: colors.PRIMARY_COLOR, width: "80%", marginLeft: "10%", marginLeft: "10%", marginTop: "4%", borderBottomLeftRadius: 20 }}

          selectedValue={minuto}
          onValueChange={(value) => { setMinuto(value), console.log("seleccionaste el minuto de: ", value) }}

        >
          <Picker.Item label="Seleccionar el minuto" />
          <Picker.Item label="00 min" value='0' />
          <Picker.Item label="05 min" value="1" />
          <Picker.Item label="10 min" value="2" />
          <Picker.Item label="15 min" value="3" />
          <Picker.Item label="20 min" value="4" />
          <Picker.Item label="25 min" value="5" />
          <Picker.Item label="30 min" value="6" />
          <Picker.Item label="35 min" value="7" />
          <Picker.Item label="40 min" value="8" />
          <Picker.Item label="45 min" value="9" />
          <Picker.Item label="50 min" value="10" />
          <Picker.Item label="55 min" value="11" />

        </Picker>

        <RayaDebajoWifi></RayaDebajoWifi>

        <Text style={{ paddingLeft: 20, paddingTop: 10, fontWeight: 'bold', textAlign: "center", fontStyle: "italic" }}
        ><FontAwesome5 style={{ color: colors.PRIMARY_COLOR_DARK, fontSize: 35 }} name={'clock'}></FontAwesome5> Selecciona el tiempo de duración</Text>
        <Picker style={{ fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 4, color: "black", paddingRight: 30, backgroundColor: colors.PRIMARY_COLOR, width: "80%", marginLeft: "10%", marginLeft: "10%", marginTop: "4%", borderBottomLeftRadius: 20 }}

          selectedValue={minutosDuracion}
          onValueChange={(value) => { setMinutosDuracion(value), console.log("seleccionaste los minutos de duracion: ", value) }}

        >
          <Picker.Item label="Seleccionar la duracion" />
          <Picker.Item label="5 min" value="5" />
          <Picker.Item label="10 min" value="10" />
          <Picker.Item label="15 min" value="15" />
          <Picker.Item label="20 min" value="20" />
          <Picker.Item label="25 min" value="25" />
          <Picker.Item label="30 min" value="30" />
          <Picker.Item label="35 min" value="35" />
          <Picker.Item label="40 min" value="40" />
          <Picker.Item label="45 min" value="45" />
          <Picker.Item label="50 min" value="50" />
          <Picker.Item label="55 min" value="55" />
          <Picker.Item label="1 hora" value="60" />
          <Picker.Item label="1:05 hrs" value="65" />
          <Picker.Item label="1:10 hrs" value="70" />
          <Picker.Item label="1:15 hrs" value="75" />
          <Picker.Item label="1:20 hrs" value="80" />
          <Picker.Item label="1:25 hrs" value="85" />
          <Picker.Item label="1:30 hrs" value="90" />
          <Picker.Item label="1:35 hrs" value="95" />
          <Picker.Item label="1:40 hrs" value="100" />
          <Picker.Item label="1:45 hrs" value="105" />
          <Picker.Item label="1:50 hrs" value="110" />
          <Picker.Item label="1:55 hrs" value="115" />
          <Picker.Item label="2 hrs" value="120" />
        </Picker>
      </View>

      <RayaDebajoWifi></RayaDebajoWifi>

      <View style={{ paddingBottom: "5%" }}>
        <Text style={{ paddingLeft: 20, paddingTop: 10, fontWeight: 'bold' }}
        >Selecciona los días</Text>
        <View>

          <View style={{ flexDirection: "row" }}>
            <CheckBox
              containerStyle={
                {
                  color: colors.PRIMARY_COLOR_DARK,
                  width: 100,
                  borderRadius: 60
                }

              }
              textStyle={{
                color: colors2.BLUE,
                fontSize: 13
              }}
              title='Lunes'
              checked={lunes}
              checkedColor={colors2.BLUE}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={() => setLunes(!lunes)}
            >

            </CheckBox>
            <CheckBox
              containerStyle={
                {
                  color: colors.PRIMARY_COLOR_DARK,
                  width: 100,
                  borderRadius: 60
                }

              }
              textStyle={{
                color: colors2.BLUE,
                fontSize: 13
              }}
              title='Martes'
              checkedColor={colors2.BLUE}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={martes}
              onPress={() => { setMartes(!martes) }}

            >

            </CheckBox>

            <CheckBox
              containerStyle={
                {
                  color: colors.PRIMARY_COLOR_DARK,
                  width: 115,
                  borderRadius: 60
                }

              }
              textStyle={{
                color: colors2.BLUE,
                fontSize: 13
              }}
              title='Miercoles'
              checkedColor={colors2.BLUE}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={miercoles}
              onPress={() => setMiercoles(!miercoles)}
            >

            </CheckBox>
          </View>
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              containerStyle={
                {
                  color: colors.PRIMARY_COLOR_DARK,
                  width: 100,
                  borderRadius: 60
                }

              }
              textStyle={{
                color: colors2.BLUE,
                fontSize: 13
              }}
              title='Jueves'
              checked={jueves}
              checkedColor={colors2.BLUE}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={() => setJueves(!jueves)}
            >

            </CheckBox>
            <CheckBox
              containerStyle={
                {
                  color: colors.PRIMARY_COLOR_DARK,
                  width: 100,
                  borderRadius: 60
                }

              }
              textStyle={{
                color: colors2.BLUE,
                fontSize: 13
              }}
              title='Viernes'
              checkedColor={colors2.BLUE}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={viernes}
              onPress={() => setViernes(!viernes)}

            >


            </CheckBox>

            <CheckBox
              containerStyle={
                {
                  color: colors.PRIMARY_COLOR_DARK,
                  width: 115,
                  borderRadius: 60
                }

              }
              textStyle={{
                color: colors2.BLUE,
                fontSize: 13
              }}
              title='Sabado'
              checkedColor={colors2.BLUE}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={sabado}
              onPress={() => setSabado(!sabado)}
            >

            </CheckBox>


          </View>






          <View style={{ flexDirection: "row", paddingBottom: 10 }}>



            <CheckBox
              containerStyle={
                {

                  color: colors.PRIMARY_COLOR_DARK,
                  width: 115,
                  borderRadius: 60,

                }

              }
              textStyle={{

                color: colors2.BLUE,
                fontSize: 13
              }}

              title='Domingo'
              checkedColor={colors2.BLUE}
              center
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={domingo}
              onPress={() => setDomingo(!domingo)}


            >

            </CheckBox>
          </View>

        </View>

        {/* 
      <Text>Dispositivos Bluetooth disponibles:</Text>
      {devices.map(device => (
        <Text key={device.id}>{device.name}</Text>
      ))}
 */}

        <TouchableOpacity onPress={(onSubmit)} style={{ paddingLeft: "12%", paddingRight: "12%" }}>
          <Text style={{
            fontSize: 30, textAlign: "center", width: 250,
            backgroundColor: colors2.BLUE,
            borderRadius: 60,
            marginLeft: 35,
            marginRight: 35,
            marginTop: 0,
            marginBottom: '20%',
            color: colors.PRIMARY_COLOR
          }}>Aceptar <FontAwesome5 style={{ color: colors.VERDE_SABROSO, fontSize: 30 }} name={'check'}></FontAwesome5></Text>
        </TouchableOpacity>

        <Toast></Toast>
      </View>




    </ScrollView >
  );

}

const styles = StyleSheet.create({
  viewPrincipal: {
    backgroundColor: colors.BLUE_COLOR,
    borderRadius: 12,
    marginTop: '0%'

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
    height: 80,
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
    paddingTop: 20



  },

  footerAñadirBlueAndMiCuenta: {

    height: '100%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: colors.BLUE_COLOR,
    paddingHorizontal: 30


  },
  iconConexion: {
    marginTop: 28,
    marginBottom: 22,
    marginLeft: 75,
    color: colors.BLUE_COLOR,
    fontSize: 20,
    paddingLeft: 10
  },
  iconUser: {
    marginTop: 28,
    marginBottom: 22,
    marginRight: 75,
    color: colors.PRIMARY_COLOR,
    fontSize: 20
  }

});

export default Home;