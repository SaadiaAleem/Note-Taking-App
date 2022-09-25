import React, { useEffect, useState } from "react";
import {AsyncStorage, FlatList, View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { ADD_BUTTON_IMG, COLOR_WHITE, NOTE_IMG, DELETE_IMG } from "../../../res/drawables";
import ImageButton from "../../components/ImageButton";
import {
    AdMobBanner
  } from 'expo-ads-admob';
  import { async } from "@firebase/util";
import App from '../../../api/Firebase';
import { collection, getFirestore, getDocs, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import axios from "axios";

const Main = (props) => {
    
    const [data, setData] = useState([])
    // const [selectedNote, setSelectedNote] = useState([])
    const [loading, setLoading] = useState(false);

    const {email} = props.route.params;
    const db = getFirestore(App);

    const loadData = async() => {
        setLoading(true)
        
        let weather = await axios.get('')
        // const querySnapshot = await getDocs(collection(db, email));
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        //     keys.push(doc.data())
        //   });

        const q = query(collection(db, email));
        try{
            let keys = []
        onSnapshot(q, (querySnapshot) => {
            keys = []
            querySnapshot.forEach((doc) => {
               console.log(doc.data());
               keys.push(doc.data());
            });
            setData(keys);
          });
          console.log("keys are"+keys);
        } catch(e){

        }

          
          setLoading(false);
    }

    useEffect(() => {
        loadData();
        // console.log('here')
        //   loadAllKeyFromAsyncStorage() 
    }, [])

    // const loadAllKeyFromAsyncStorage = async () => {
    //     let keys = await AsyncStorage.getAllKeys()
    //    if(keys.length != data.length)
    //       setData(keys)        
    // }

    const onRemovedPressed = async(key) => {
        try{
            console.log('key data is ' + key);
            await deleteDoc(doc(db, email, key));
            props.navigation.navigate('Main');

        } catch(exception){

            alert(key + ' is not removed');
            console.log(exception);
            
        }
    }


    return(
        <View style={ styles.container }>
            {loading ? <ActivityIndicator /> : null}
            <FlatList
            data = {data}
            numColoumns={3}
            renderItem = {({item}) => {
                return(
                    <TouchableOpacity onPress={
                        () => {
                            props.navigation.navigate('Create', {title: item.title, description: item.description, email})
                        }
                    }>
                        <View style={{margin:5}}>
                        <Image
                        style = {styles.noteIcon}
                        source={NOTE_IMG}
                        />
                        
                        <TouchableOpacity>
                            <ImageButton
                            style = {styles.deleteButton}
                            source = {DELETE_IMG}
                            onPress = { () => onRemovedPressed(item)}
                            />
                        </TouchableOpacity>

                        <Text style={styles.text}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        }
        keyExtractor={(item) => item}  
            />

            <ImageButton
                style = { { 
                    position: 'absolute',
                    bottom:0,
                    right:0
                    // alignSelf: 'flex-end',
                 }}
                source={ADD_BUTTON_IMG}
                 onPress={()=> props.navigation.navigate('Create', { title: null, description: null, email })}
                 />

            {/* <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds // true or false
            // onDidFailToReceiveAdWithError={this.bannerError} 
            /> */}

        </View>
    )
}

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    noteIcon: {
        height: 100,
        width: 100
    },
    deleteButton: {
        height: 50,
        width: 50
    },
    text: {
        alignSelf: 'center', 
        fontWeight: 'bold',
        width: 80,
        textAlign:'center'
    }
})
export default Main