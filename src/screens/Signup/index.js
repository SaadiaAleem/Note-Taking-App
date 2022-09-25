import React, { useEffect, useState } from "react";
import { TextInput, View, Button, StyleSheet, AsyncStorage, Image } from "react-native";
import {BACKGROUND_COLOR, COLOR_BLACK, COLOR_WHITE} from "../../../res/drawables"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, collection } from "firebase/firestore";
import App from "../../../api/Firebase"
import { COLLECTION_NOTES, COLLECTION_USER } from "../../../res/string";

const Signup = (props)=> {

    // console.log(props)
    // let { noteTitle } = props.route.params

    const db = getFirestore(App);

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
    
    }, [])

    const onSignupPressed = async () => {
        const auth = getAuth();
        if(email.includes("@") && password) {
        try {
            await addDoc(collection(db, email),{
                
            })

            let res = await createUserWithEmailAndPassword(auth, email, password)
            alert('User created Successfully')
            props.navigation.goBack()
        } catch(e) {
            alert(e.message)
        }
    } else {
        alert('Kindly enter email and password')
    }
    }

    const onAlreadyAccountPressed = () => {
        props.navigation.goBack()
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
            title = { 'Signup'}
            onPress={ () => onSignupPressed()}
            />

            <Button 
            title = { 'Already have an account?'}
            onPress={ () => onAlreadyAccountPressed()}
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
export default Signup