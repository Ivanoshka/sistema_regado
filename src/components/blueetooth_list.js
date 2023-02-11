/* Esta clase no la estoy utiilizando
 */




/* este componente crea la logica de la lista de los dispositivos blueetooth
 */
import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import color from "../utils/colors";
import BlueetoothListLayout from './bluetooth_list_layout';
import Empty from './Empty';
import Toggle from './Toogle';
import Subtitle from './Subtitle';
import WifiListLayout from "./WifiListLayout";
import ToggleWifi from "./ToggleWifi";
import RayaDebajoWifi from "./RayaDebajoWifi";
import SemiFooter from "./SemiFooter";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../utils/colors';


function BlueetoothList(props) {

  const lista = [
    {
      name: 'Laura',
      key: '1'
    },
    {
      name: 'Juan',
      key: '2'
    },
  ]


  return (
    /* UI */
  <>
    {/* <BlueetoothListLayout title='   Bluetooth' >
   
      <Toggle>
      </Toggle>
      </BlueetoothListLayout>
      <Subtitle ></Subtitle> */}
      {/*             aqui inicia lo de wifi
 */}

      <SemiFooter></SemiFooter>
      
    </>

  );

}

export default BlueetoothList;