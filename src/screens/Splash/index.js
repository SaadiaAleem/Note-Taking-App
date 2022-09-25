import react from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import { BACKGROUND_COLOR } from '../../../res/drawables'

const Splash = (props) => {

    setTimeout(() => {
        // alert('kaam chor class')
        props.navigation.replace('Main')
    }, 3000)

    return(
        <View style={styles.container}>
            <Image style={styles.logo}
                source={require('../../../assets/logo.png')}
                />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR
    },
    logo: {
        height: 150,
        width: 200
    
    }
})
export default Splash