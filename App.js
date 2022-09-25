import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Image, Pressable, Button, Switch, ActivityIndicator,ImageBackground,  Text, View, StyleSheet, TextInput } from 'react-native';
import Navigation from './src/navigation';

export default function App() {
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18
  },
  textInput: {
    borderWidth: 1,
    width: '90%', 
    height: 40
  }
});
