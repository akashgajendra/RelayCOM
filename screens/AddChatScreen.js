import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet,Text, View} from 'react-native';
import { Icon } from 'react-native-vector-icons';
import { Input, Button } from 'react-native-elements';
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import {auth, db} from '../firebase';
import { StatusBar } from 'expo-status-bar';

//https://icons.expo.fyi/ - ICON LIST

const AddChatScreen = ({navigation})  => {

    const [input,setInput]=useState("");

      {/* The BACK button - USE Layour Effect*/}
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "New chat",
            headerBackTitle: "Chats",
        });
    }, [navigation]);

    const createChat = async() => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch(error => alert(error));
    }
    return (    
            //<View style={styles.inputContainer}>
            <View style={styles.container}>
                <StatusBar style='light' />
                <Input placeholder="Enter a chat name" 
                    value={input} 
                    onChangeText={(text) => setInput(text)}
                    // Improvised solution as Icon module was not working
                    //leftIcon={<Icon type="Antdesign" name="wechat" size={24} color="black"/>} 
                    leftIcon={<AntDesign name="wechat" size={24} color='black' />}
                    onSubmitEditing={createChat}
                />

                <Button disable={!input} buttonStyle={styles.chat_button} onPress={createChat} titleStyle={styles.chat_title} title='Create new chat' />

            </View>
            //</View>
            //<Text> Add Chat Screen </Text>
    );
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
    chat_button:{
        backgroundColor: "black",
        //borderColor: "purple",
        borderRadius: 10,
    },
    chat_title:{
        color: "white",
    }

})