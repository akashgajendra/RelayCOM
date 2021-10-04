import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, ScrollView, TextInput, Keyboard} from "react-native";
import { auth, db } from "../firebase";
import * as firebase from "firebase";
import 'firebase/app';
import 'firebase/firestore';

const ChatScreen=({navigation, route}) => {
    
    const [input,setInput]=useState("");
    const [messages, setMessages] = useState([]);
    useLayoutEffect(()  => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={styles.chat_title_box}>
                    <Avatar rounded source={{
                        uri: messages[messages.length-1]?.data.photoURL || "https://p.kindpng.com/picc/s/21-211210_free-for-commercial-use-high-resolution-personal-icon.png", 
                    }}/>

                <Text style={styles.chat_title}> 
                    {route.params.chatName} 
                </Text>
                </View>
            ),
            headerLeft:() => (
                <TouchableOpacity onPress={navigation.goBack} style={styles.back_button}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight:() => (
                <View style={styles.call_icon_wrapper}>
                    <TouchableOpacity onPress={navigation.goBack} style={styles.back_button}>
                        <FontAwesome name="video-camera" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigation.goBack} style={styles.back_button}>
                        <Ionicons name="call" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation,messages]);
    
    const sendMessage=() => {
        const firebase1=firebase.firestore()
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            display: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput("");
    };

    //Messages array
    useLayoutEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
          )
        );
        return unsubscribe;
    },[route]);

    return (
        <SafeAreaView style={styles.safe_header}>
            <StatusBar style='light' />
            <KeyboardAvoidingView
            behavior={Platform.OS==='ios'?'padding':'height'}
            style={styles.container}
            keyboardVerticalOffset={90}>
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* Need scroll view to get message bar down with flex:1*/}
                <>
                
                <ScrollView contentContainerStyle={{paddingTop: 15}}>
                    {messages.map(({id,data}) =>(
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.reciever}>
                                <Avatar
                                position="absolute"
                                rounded
                                //Web Position
                                containerStyle={{
                                    position: "absolute",
                                    bottom: -15,
                                    right:-5,
                                }}
                                bottom={-15}
                                right={-5}
                                size={30}
                                source={{uri: data.photoURL}}
                                />
                                <Text style={styles.recieverText}> {data.message} </Text>
                            </View>
                        ): (
                            <View key={id} style={styles.sender}>
                                <Avatar
                                position="absolute"
                                rounded
                                //Web Position
                                containerStyle={{
                                    position: "absolute",
                                    bottom: -15,
                                    right:-5,
                                }}
                                bottom={-15}
                                right={-5}
                                size={30}
                                source={{uri: data.photoURL}}
                                />
                                <Text style={styles.senderText}> {data.message} </Text>
                                {/* <Text style={styles.senderName}> {data.displayName} </Text> */}
                            </View>
                        )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={sendMessage} placeholder="Enter message" style={styles.textInput} />
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Feather name='send' size={24} color="black"/>
                    </TouchableOpacity>
                </View>
                </>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    reciever:{
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    recieverText:{
        color:"black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderText:{
        color:"black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    senderName:{
        color:"black",
        fontWeight: "100",
        marginLeft: 10,
    },
    footer:{
        flexDirection:'row',
        alignItems: 'center',
        width: '100%',
        padding: 5,
    },
    sender:{
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    textInput:{
        bottom:0,
        height: 40,
        flex: 1,
        paddingLeft: 10,
        marginRight:15,
        backgroundColor: "#ECECEC",
        //padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    safe_header:{
        flex:1,
        backgroundColor: "white",
    },
    call_icon_wrapper:{
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 80,
        paddingLeft: 15,
        marginRight: 0,
    },
    back_button:{
        marginLeft: 0,
    },
    chat_title_box:{
        flexDirection: "row", 
        alignItems: "center"
    },
    chat_title:{
        color: "white", 
        marginLeft: 10, 
        fontWeight: "700"}
});