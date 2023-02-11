import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import RayaDebajoWifi from './RayaDebajoWifi';
import colors from '../utils/colors';

import MyTextInput from './MyTextInput';

import { loginStyles } from '../utils/styles';





export default function RecuperarPasswordScreen() {

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

                    <Text style={styles.TextIniciarSesion}>¿Olvidaste tu Contraseña?</Text>
                    <RayaDebajoWifi></RayaDebajoWifi>


                    <View style={styles.viewIniciarSesion}>

                        <MyTextInput keyboardType='email-address' placeholder='E-mail' image='user'></MyTextInput>


                        <View style={loginStyles.btnMain }>
                            <TouchableOpacity >
                                <Text style={loginStyles.btntxt}>Recuperar</Text>
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
        paddingTop:10,
        paddingBottom:10,
        fontWeight: "bold",
        fontSize: 18,
        color: colors.PRIMARY_COLOR_DARK,
        marginTop:80,
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