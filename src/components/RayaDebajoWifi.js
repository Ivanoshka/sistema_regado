
/* este componente solo es una raya
 */import React from "react";
 import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import SemiFooter from "./SemiFooter";

function RayaDebajoWifi(props){
    return(
    <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
    <View style={styles.line}></View>
 

    </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center',
    },
    title:{
        fontWeight: 'bold',
        color: 'gray'
    },
    line:{
        borderBottomWidth:1,
        marginLeft: 5,
        flex:1,
        marginTop:"1%",
        borderColor: '#eceff1'

    }
 
})

export default RayaDebajoWifi;