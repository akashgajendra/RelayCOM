import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, ScrollView ,Text, View} from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../firebase';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';

//https://icons.expo.fyi/ - ICON LIST

const HomeScreen = ({navigation})  => {
   // Customize headers in native

   const [chats,setChats]=useState([]);

   const signOutUser= () => {
       auth.signOut().then(() =>{ 
        navigation.replace("Welcome to RelayCOM!")
       })
   }

   useEffect(() => {
       const unsubscribe=db.collection('chats').onSnapshot(snapshot=> ( 
           setChats(snapshot.docs.map(doc => ({
               id: doc.id,
               data:doc.data()
           })))
       ))
        //console.log(unsubscribe.data);
       return unsubscribe;
   },[])

   useLayoutEffect(()  => {
       navigation.setOptions({
           title: "RelayCOM",
           //headerStyle:{backgroundColor: "#fff" },
           //headerTitleStyle: {color: "black"},
           headerTitleStyle:{fontweight: 'bold'},
           //headerTintColor: "black",
           headerLeft: () => (<View style={{marginLeft:0}}>
               <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
               <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}></Avatar>
                </TouchableOpacity>
           </View>),

           //Explore adding signout button to the right or below and a bio page
           headerRight: () => (<View style={{
               flexDirection:'row', 
               width: 80, 
               justifyContent:'space-between',
               //Shifts the text to the left - uncomment marginLeft
               marginLeft: 120,
               marginRight:5}}>
            
            <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                <AntDesign name="camerao" size={24} color='white' />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                <SimpleLineIcons name="pencil" size={24} color='white' />
            </TouchableOpacity>
            
            </View>),
       })
   }, []); //Adding the navigation did not make a difference


   const enterChat=(id,chatName) => {
       navigation.navigate("Chat", {
           id,
           chatName,
        });
    };


  //Need to set up a scrollable View
  return (    
        //<View style={styles.inputContainer}>
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <StatusBar style='light' />

                {chats.map(({id,data: {chatName}}) => {
                    //<CustomListItem key={id} id={id} chatName={chatName} />
                    return (<CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />)
                })}
            </ScrollView>
        </SafeAreaView>
        //</View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        height:"100%",
    }
})