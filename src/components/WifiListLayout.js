import React from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import colors from "../utils/colors";
import SemiFooter from "./SemiFooter";

function WifiListLayout(props){
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
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
 
    },
    title:{
        fontSize:20,
        fontWeight:'bold',

    }

})

export default WifiListLayout;