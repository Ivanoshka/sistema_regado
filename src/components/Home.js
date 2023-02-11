import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { Slider, Text, CheckBox } from "react-native-elements";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../utils/colors';
import RayaDebajoWifi from "./RayaDebajoWifi";
import { Picker } from '@react-native-picker/picker';
import colors2 from "../utils/colors2";
import Toast from 'react-native-toast-message';


const Home = ({ }) => {
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
    const [hora,setHora] = useState();



  const onSubmit = () => {
    if (hora != null) {
      showToast();
      console.log("Hora Seleccionada=", hora, "hrs");
      if (lunes) {
        console.log('Seleccionaste lunes', 1);
      } else {
        console.log('No seleccionaste lunes', 0);
      }
      if (martes) {
        console.log('Seleccionaste martes', 1);
      } else {
        console.log('No seleccionaste martes', 0);
      }
      if (miercoles) {
        console.log('Seleccionaste miercoles', 1);
      } else {
        console.log('No seleccionaste miercoles', 0);
      }
      if (jueves) {
        console.log('Seleccionaste jueves', 1);
      } else {
        console.log('No seleccionaste jueves', 0);
      }
      if (viernes) {
        console.log('Seleccionaste viernes', 1);
      } else {
        console.log('No seleccionaste viernes', 0);
      }
      if (sabado) {
        console.log('Seleccionaste sabado', 1);
      } else {
        console.log('No seleccionaste sabado', 0);
      }
      if (martes) {
        console.log('Seleccionaste domingo', 1);
      } else {
        console.log('No seleccionaste domingo', 0);
      }
    }


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

      <TouchableOpacity style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20 }} onPress={console.log("Encendido")}>
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




      <TouchableOpacity style={{ paddingLeft: 20 }} onPress={console.log("Encendido")}>
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
        <Text style={{ paddingLeft: 20, paddingTop: 10, fontWeight: 'bold' }}
        >Selecciona la hora</Text>
        <Picker style={{ fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderRadius: 4, color: "black", paddingRight: 30, backgroundColor: colors.PRIMARY_COLOR, }}

        selectedValue={hora}
        onValueChange={(value) => {setHora(value), console.log("seleccionaste la hora de: ", value)}} 
     
       >

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

      </View>

      <View style={{ paddingBottom: 25 }}>
        <Text style={{ paddingLeft: 20, paddingTop: 10, fontWeight: 'bold' }}
        >Selecciona los días</Text>
        <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 1, }}>
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

            checked={martes}
            onPress={() => setMartes(!martes)}

          >

          </CheckBox>

        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 1, }}>
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

            checked={miercoles}
            onPress={() => setMiercoles(!miercoles)}
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
            title='Jueves'
            checkedColor={colors2.BLUE}

            checked={jueves}
            onPress={() => setJueves(!jueves)}
          >

          </CheckBox>







        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 1, }}>
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
            title='Viernes'
            checkedColor={colors2.BLUE}

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

            checked={sabado}
            onPress={() => setSabado(!sabado)}

          >

          </CheckBox>


        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 1, }}>
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

            checked={domingo}
            onPress={() => setDomingo(!domingo)}


          >

          </CheckBox>
        </View>

      </View>
      <View>

        <TouchableOpacity onPress={(onSubmit)} style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20, }}>
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

      {/*  <View style={{ paddingTop: 1, padding: 20 }}>
        <Text style={{ fontSize: 10, textAlign: "center" }}>Al presionar el boton de Aceptar, se configura que el sistema de riego se preda automaticamente en la hora y los dias seleccionados</Text>


        
      </View> */}


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