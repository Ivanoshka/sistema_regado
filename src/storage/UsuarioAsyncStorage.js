import AsyncStorage from '@react-native-community/async-storage'

const USUARIO_KEY = '@usuario:key'

//recibimos un usuario en json
async function saveUsuario(usuario){
    try {
        await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(usuario))
        return JSON.stringify(usuario)
    } catch (error) {
        //Error
        console.log('error al guardar: ' +error.message)
        return 'Error de sintaxis'
    }
}

//obtener el usuario
async function getUsuario(){
    try {
        const item = await AsyncStorage.getItem(USUARIO_KEY)
        return JSON.parse(item)
    } catch (error) {
        // Error retrieving data
        console.log("Error al recuperar:" + error.message)
        return null
    }
}

//me va permitir que el usuario pueda eliminar su sesion que creo
async function deleteUsuario(){
    try {
        await AsyncStorage.removeItem(USUARIO_KEY)
        const item = await AsyncStorage.getItem(USUARIO_KEY)
        return (item == null?"usuario removido":"usuario no removido")
    } catch (error) {
        console.log("Error al eliminar" + error.message)
        return "Error de sintaxis"
    }
}

export {saveUsuario, getUsuario, deleteUsuario}