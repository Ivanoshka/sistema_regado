import React from "react";
import {
    View,
    TextComponent,
    StyleSheet,
    Text
} from 'react-native';

function Empty(props){
    return(
        <View>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    text:{
        fontSize:20,
        
    }
})

export default Empty;