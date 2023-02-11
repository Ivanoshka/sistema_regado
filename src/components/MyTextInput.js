import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Icon, Input, TextInput } from 'react-native-elements'
import colors2 from '../utils/colors2';

export default function MyTextInput(props) {

  return (
    <Input
      style={{ alignItems: 'center' }}
      containerStyle={{ marginBottom: 20, borderBottomColor: colors2.LIGHTPRIMARYCOLOR, borderBottomWidth: 1 }}
      inputStyle={{
        fontSize: 18, paddingVertical: 10,
        paddingHorizontal: 8, marginTop: 12,
        color: colors2.PRIMARYCOLOR,
        fontFamily: "Poppins-Light",
      }}
      placeholderTextColor={colors2.LIGHTPRIMARYCOLOR}
      placeholder={props.placeholder}
      leftIconContainerStyle={{ marginLeft: 0 }}
      leftIcon={<Icon size={24} color={colors2.PRIMARYCOLOR}
        type={'font-awesome'} name={props.image} />}
      rightIcon={props.bolGone ?
        <TouchableOpacity activeOpacity={0.8} style={styles.btnVisibility} onPress={props.onPress}>
          <Image style={styles.btnImage} tintColor={colors2.PRIMARYCOLOR}
            source={(props.secureTextEntry) ? require("../assets/ic_show_password.png") : require('../assets/ic_hide_password.png')} />
        </TouchableOpacity> :
        <Icon size={24} color={colors2.PRIMARYCOLOR}
          type={'font-awesome'} name={props.imageRight} />}
      errorStyle={{ color: colors2.RED }}
      errorMessage={(props.bolError) ? props.strError : ''}
      editable={props.editable}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      value={props.value} />
  )
}

const styles = StyleSheet.create({

  btnVisibility:
  {
    height: 40,
    width: 35,
    paddingTop: 8,
    paddingLeft: 5,
    paddingRight: 5
  },

  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
})

