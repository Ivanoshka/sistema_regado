import { StyleSheet } from 'react-native'
import colors from './colors'
import color from './colors'
import colors2 from './colors2'

//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.WHITE,
    }
})

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
    },

    logo: {
        paddingTop: 50,
        alignItems: 'center',
    },

    btnMain: {
        width: 250,
        marginTop:0,
        marginBottom: 3,
        backgroundColor: colors2.BLUE,
        borderRadius: 60,
        marginLeft: 15,
        marginRight:15,
        marginBottom: 5
    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: colors2.BLUE,
        width: 250,
        borderWidth: 2,
        marginBottom: 10,
        borderRadius: 60,   marginLeft: 15,
        marginRight:15,
        
    },

    btntxt: {
        textAlign: 'center',
        fontSize: 17,
        color: colors.PRIMARY_COLOR,
        paddingVertical: 2,
        fontFamily: 'Poppins-Bold',
        
        
    },

    txtTransparent: {
        color: colors2.LIGHTPRIMARYCOLOR,
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        marginLeft: 70,marginRight: 70
    }
})

export { loginStyles, splashStyles }