//sirve para la animacion de 5 segundos

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React,{useEffect,} from 'react';
import { Text } from 'react-native-elements';
import {View} from 'react-native'
import colors from '../utils/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const SplashScreen  = () => {

   
    const navigation = useNavigation();
    useEffect(() => {
      setTimeout(()=> {
        checkLogin();
      },3000);
    }, []);

    const checkLogin = async()=>{
      const nombre = await AsyncStorage.getItem('NOMBRE');
    const apellido = await AsyncStorage.getItem('APELLIDO');
    const email = await AsyncStorage.getItem('EMAIL');
    const pass = await AsyncStorage.getItem('PASSWORD');
    if(email !== null || email !== undefined  || email !=='' || email!=='null' || nombre!==null){
      navigation.navigate('Login');
    }else{
      navigation.navigate('Home');
    }
    };
        return(
            <View style={{backgroundColor: colors.VERDE_SABROSO, width:'100%', height:'100%'}}>
                <Text style={{color: colors.PRIMARY_COLOR, fontSize:45, paddingTop:'47%', paddingLeft:50, paddingRight:50}}>Nada crece sin agua... </Text>
                <FontAwesome5 style={{paddingLeft:'42%', paddingRight:'42%' ,paddingTop:'10%', color:colors.PRIMARY_COLOR, fontSize:60}} name={'tint'}></FontAwesome5>
            </View>

        );
    };

export default SplashScreen;

