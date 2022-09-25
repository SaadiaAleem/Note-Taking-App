import React, { useEffect, useState } from "react";
import { TextInput, View, Button, StyleSheet, AsyncStorage, Image } from "react-native";
import {BACKGROUND_COLOR, COLOR_BLACK, COLOR_WHITE} from "../../../res/drawables"
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {async} from "@firebase/util"
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const Login = (props)=> {

    // console.log(props)
    // let { noteTitle } = props.route.params

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
    
    }, [])

    const onLoginPressed = async() => {
        const auth = getAuth();
        // signInWithEmailAndPassword(auth, email, password)
        //    .then((user) => {
        //     alert('User Signed in ')
        // }).catch((e) => {
        //     alert(e.message)
        // })

        if(email.includes('@') && password) {
        try {
            let userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log(userCredential)
            alert('User Signed In')
            props.navigation.navigate('Main', {email: email})
        } catch (e) {
            alert(e.message)
        }
    } else {
        alert("kindly enter your email and password")
    }
}

const onForgetPasswordPressed = async() => {
    const auth = getAuth();
    if(email.includes("@")) { 
        try {
            await sendPasswordResetEmail(auth, email)
            alert('Check your email to restore your password!')

        } catch(e) {

        }
        
    } else {
        alert('Kindly enter email to recover your password')
    }
}

const onSignupPressed = () => {
    props.navigation.navigate('Signup')
}


    return(
        <View style = {styles.container}>

            <Image style={styles.logo}
                source={require('../../../assets/logo.png')}
                />

            <View style={{...styles.card, height: '8%'}}>
                <TextInput
                style={{margin: 10}}
                placeholder={'Enter Email Here'}
                multiline={true}
                value = {email}
                onChangeText={(t)=> setEmail(t)}
                />

            </View>

            <View style={{...styles.card, height: '8%'}}>
                <TextInput
                style={{margin: 10}}
                placeholder={'Enter Password Here'}
                // multiline={true}
                value = {password}
                secureTextEntry={true}
                onChangeText={(t)=> setPassword(t)}
                />

            </View>


            <Button 
            title = { 'Login'}
            onPress={ () => onLoginPressed()}
            />

            <Button 
            title = { 'Forget Password?'}
            onPress={ () => onForgetPasswordPressed()}
            />

            <Button 
            title = { 'Dont have an account?'}
            onPress={ () => onSignupPressed()}
            />
             
        </View>
    )
}
const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: "center"
    },
    card: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 20,
        margin: 10,
        shadowColor: COLOR_BLACK,
        borderColor: COLOR_BLACK,
        borderWidth: 0.5

    },
    logo: {
        height: 150,
        width: 200,
        alignSelf: "center"
    
    }
})
export default Login