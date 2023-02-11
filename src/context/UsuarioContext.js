import React, { createContext, useReducer, useEffect } from "react";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

//AQUI INICIA LA VALACION DEL STORAGE DE GOOGLE
export const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [me, setMe] = useState(undefined);


    useEffect(() => {
        const validStorage = async () => {
            try {
                const miSesion = await AsyncStorage.getItem('sesion');
                setMe(JSON.parse(miSesion));
            } catch (error) {
                console.log(`ERROR ${error.message}`);
            }

        }
        validStorage();


    }, []);
    return (
        <UserContext.Provider value={{ me, setMe }}>
            {children}
        </UserContext.Provider>
    );
};
//AQUI TERMINA LA VALIDACION DEL STORAGE DE GOOGLE


const initialState = {
    usuario: {
        nombre: '',
        apellido: '',
        email: '',
        password: ''
    },
    activo: false
}

//payload recoge toda la informacion
const usuarioReducer = (state = initialState, payload) => {

    switch (payload.type) {

        case 'sing-in':
            console.log('Bienvenidos al sistema')
            return { ...state, usuario: payload.data, activo: true }
        case 'sign':
            saveUsuario(payload.data).then((msg) => {
                console.log('usuario guardado')
            })
            Snackbar.show({
                title: 'Inicio de sesión exitoso',
                duration: Snackbar.LENGTH_LONG,
            })

            return { ...state, usuario: payload.data, activo: true }
        case 'sign-out':
            deleteUsuario().then((msg) => {
                console.log(msg)
            })
            Snackbar.show({
                title: 'Sesión expirada',
                duration: Snackbar.LENGTH_LONG,
            })

            return { ...state, usuario: payload.data, activo: false }
        default:
            return state
    }
}

const UsuarioContext = createContext(initialState)
//usuario Provedor
function UsuarioProvider(props) {

    const [login, loginAction] = useReducer(usuarioReducer, initialState)

    return (
        <UsuarioContext.Provider value={[login, loginAction]}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export { UsuarioContext, UsuarioProvider };
/* export {UserProvider}; */