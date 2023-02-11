import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RayaDebajoWifi from './RayaDebajoWifi';
import colors from '../utils/colors';
import FooterActionBar from './FooterActionBar';
import MyTextInput from './MyTextInput';

import { loginStyles } from '../utils/styles';
import colors2 from '../utils/colors2';
import RecuperarPasswordScreen from './RecuperarPasswordScreen';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth({ navigation }) {

  //confoguracion del cliente google para acceder mediante Login de google
  useEffect(() => {
    GoogleSignin.configure({
      androidClientId: 'http://1072392991079-u414jm940l1k3mrsq78kai24c3ujgosk.apps.googleusercontent.com/'

    });
  }, [])

  //funcion para iniciar y mantener la sesion iniciado con google
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);

      navigation.navigate('Home');
      await AsyncStorage.setItem('sesion', JSON.stringify(userInfo.user));

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {

      }
    }
  };

  const [hidePassword, setHidePassword] = useState(false)

  return (
    <>
      <ScrollView>
        <View style={styles.view}>


          <Image style={{ height: 200 }} source={require("../assets/LogoVerde.png")} ></Image>



          <Text style={styles.TextIniciarSesion}>Iniciar Sesion</Text>
          <RayaDebajoWifi></RayaDebajoWifi>


          <View style={styles.viewIniciarSesion}>

            <MyTextInput keyboardType='email-address' placeholder='E-mail' image='user'></MyTextInput>
            <MyTextInput keyboardType={null} placeholder='Contraseña' image='lock' bolGone={true} secureTextEntry={hidePassword} onPress={() => setHidePassword(!hidePassword)} ></MyTextInput>

            <View style={loginStyles.btnMain}>
              <TouchableOpacity>
                <Text style={loginStyles.btntxt}>Iniciar Sesión</Text>
              </TouchableOpacity>

            </View>
            <View style={loginStyles.btnTransparent}>

              <TouchableOpacity onPress={() => navigation.navigate('RegistroScreen')}>
                <Text style={[loginStyles.btntxt, { color: colors2.BLUE }]}>Registrarse</Text>
              </TouchableOpacity>

            </View>
            <View style={[loginStyles.btnTransparent, { backgroundColor: '#4081EC' }, {marginBottom:"30%"}]}>

              <TouchableOpacity onPress={signIn}>
                <Text style={[loginStyles.btntxt, { color: colors.PRIMARY_COLOR_DARK, color: colors.PRIMARY_COLOR, fontWeight: "bold", fontSize: 18 }]}><FontAwesome5 style={{ color: colors.PRIMARY_COLOR, fontSize: 30, fontWeight: "bold", fontSize: 25 }} name={'google'}></FontAwesome5>   Iniciar con Google</Text>
              </TouchableOpacity>

            </View>
            {/*  <View>

            <TouchableOpacity onPress={() => navigation.navigate('RecuperarPassword')}>
              <Text style={[loginStyles.txtTransparent, { textDecorationLine: 'underline' }]}>Olvide mi Contraseña</Text>
            </TouchableOpacity>

          </View> */}

          </View>









        </View>

      </ScrollView>

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
    </>



  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.PRIMARY_COLOR
  },

  iconUser: {
    fontSize: 120,
    marginTop: 30,
    marginBottom: 8,
    color: colors.PRIMARY_COLOR_DARK
  },
  TextIniciarSesion: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.PRIMARY_COLOR_DARK
  },

  viewIniciarSesion: {
    height: '50%',
    width: '100%',
    backgroundColor: colors.PRIMARY_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 40,
    paddingRight: 40
  },

  viewParaSaber: {
    backgroundColor: colors.RED_COLOR
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
    marginBottom: 22,
    marginLeft: 75,
    color: colors.PRIMARY_COLOR,
    fontSize: 20
  },
  iconUser: {
    marginTop: 19,
    marginBottom: 22,
    marginRight: 75,
    color: colors.VERDE_SABROSO,
    fontSize: 20

  }

});