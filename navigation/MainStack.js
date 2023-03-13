import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "../src/components/Auth";
import AccesoRapidoLayout from "../src/components/AccesoRapidoLayout";
import RecuperarPasswordScreen from "../src/components/RecuperarPasswordScreen";
import FooterActionBar from "../src/components/FooterActionBar";
import RegistroScreen from "../src/components/RegistroScreen";
import SplashScreen from "../src/components/SplashScreen";
import Home from "../src/components/Home";
import { useState } from "react";
import useBLE from "../useBLE";
const Stack = createNativeStackNavigator()

const MainStack = () => {

   

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name='Splash'
                    component={SplashScreen}
                    options={{ title: '', headerShown: false }}


                >

                </Stack.Screen>


                <Stack.Screen
                    name='Login'
                    component={Auth}
                    options={{ title: '', headerShown: false }}


                >

                </Stack.Screen>

                <Stack.Screen
                    name='AccesoRapido'
                    component={AccesoRapidoLayout}
                    options={{ title: '', headerShown: false }}
                >

                </Stack.Screen>

                <Stack.Screen
                    name='RecuperarPassword'
                    component={RecuperarPasswordScreen}
                    options={{ title: '' }}
                >

                </Stack.Screen>

                <Stack.Screen
                    name='FooterActionBar'
                    component={FooterActionBar}
                    options={{ title: '', headerShown: false }}


                ></Stack.Screen>

                <Stack.Screen
                    name='RegistroScreen'
                    component={RegistroScreen}
                    options={{ title: '', headerShown: false }}


                ></Stack.Screen>

                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{ title: '', headerShown: false ,
                    
                    
                }}


                ></Stack.Screen>





            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStack