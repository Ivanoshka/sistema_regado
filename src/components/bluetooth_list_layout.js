/* este componente crea el layout del blueetooth */

//este es el causando de todas mis edsgracuuas
import React from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import colors from "../utils/colors";

function BlueetoothListLayout(props){
    return(
            <View style={styles.container}>
                <Text style={styles.title}>{props.title}</Text>
                {props.children}
            </View>
        );

}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        paddingVertical:25,
        backgroundColor: colors.PRIMARY_COLOR,
        borderBottomLeftRadius: 55,
        borderBottomRightRadius: 55,
        paddingBottom:"2%"
       
        

    },
    title:{
        fontSize:20,
        fontWeight:'bold',

    }

})

export default BlueetoothListLayout;