import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import RayaDebajoWifi from './RayaDebajoWifi';
import colors from '../utils/colors';

import MyTextInput from './MyTextInput';

import { loginStyles } from '../utils/styles';


import colors2 from '../utils/colors2';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



export default function RegistroScreen({  }) {
    //esto pasa los datos al localstorage

    const [nombre, setNombre] = useState('');

    const [apellido, setApellido] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const navigation = useNavigation()

    const GuardarInformacionEnStorage = async () => {

        try {
            await AsyncStorage.setItem('NOMBRE', nombre);
            await AsyncStorage.setItem('APELLIDO', apellido);
            await AsyncStorage.setItem('EMAIL', email);
            await AsyncStorage.setItem('contrasena', password);

            navigation.navigate('Home')

        } catch (error) {
            console.log(error);
        }


    }



    //esto es para la contraseña
    const [hidePassword, setHidePassword] = useState(false);

    return (
        <>

            {/*  scrollview sirve para hacer scroll en la pantalla */}
            <ScrollView
                keyboardDismissMode='on-drag'
                /*     esto hace que siempre se vea la barrita de scroll */
                keyboardShouldPersistTaps='always'
                style={{ backgroundColor: colors.PRIMARY_COLOR }}
            >


                <StatusBar backgroundColor={colors.BLUE_COLOR} translucent={true}></StatusBar>

                <View style={styles.view}>

                    <Text style={styles.TextIniciarSesion}>Crea tu Cuenta</Text>
                    <RayaDebajoWifi></RayaDebajoWifi>


                    <View style={styles.viewIniciarSesion}>

                        <MyTextInput
                            value={nombre}
                            onChangeText={txt => setNombre(txt)}
                            placeholder='Nombres' image='user'
                        ></MyTextInput>
                        <MyTextInput
                            value={apellido}
                            onChangeText={txt => setApellido(txt)}
                            placeholder='Apellidos' image='user'></MyTextInput>
                        <MyTextInput
                            value={email}
                            onChangeText={txt => setEmail(txt)}
                            keyboardType='email-address' placeholder='E-mail' image='envelope'></MyTextInput>
                        <MyTextInput
                            value={password}
                            onChangeText={txt => setPassword(txt)}
                            keyboardType={null} placeholder='Contraseña' image='lock' bolGone={true} secureTextEntry={hidePassword} onPress={() => setHidePassword(!hidePassword)} ></MyTextInput>

{/* esto es para aceptar los terminos y condiciones en caso de que haya terminos y condiciones */}
                       {/*  <CheckBox
                            containerStyle={
                                registroStyles.checkBox

                            }
                            textStyle={{
                                color: colors2.BLUE
                            }}
                            title='He leído y acepto los término y condiciones'
                            checked={false}
                            checkedColor={colors2.BLUE}

                        >

                        </CheckBox> */}


                        <View style={loginStyles.btnMain}>
                            <TouchableOpacity>
                                <Text style={loginStyles.btntxt}

                                    onPress={() => {
                                        GuardarInformacionEnStorage();
                                    }}

                                >Registrarse</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flex: 1, alignItems: 'center', marginBottom:20 }}>
                            <Text style={{ color: colors2.BLUE }}>¿Ya tienes una cuenta?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={[loginStyles.btntxt, { color: colors2.BLUE, textDecorationLine: 'underline' }]}>Inicia Sesión</Text>
                            </TouchableOpacity>

                        </View>



                    </View>







                </View>

            </ScrollView>
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
        marginTop: 42,
        marginBottom: 8,
        color: colors.PRIMARY_COLOR_DARK
    },
    TextIniciarSesion: {
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        fontSize: 18,
        color: colors.PRIMARY_COLOR_DARK,
        marginTop: 80,
    },

    viewIniciarSesion: {
        height: '50%',
        width: '100%',
        backgroundColor: colors.PRIMARY_COLOR,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingLeft: 40,
        paddingRight: 40,


    },

    viewParaSaber: {
        backgroundColor: colors.RED_COLOR
    }



});