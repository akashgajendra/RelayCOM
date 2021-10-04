import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button, Input} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../firebase';

//https://icons.expo.fyi/ - ICON LIST

const LoginScreen = ({navigation})  => {
    {/* Setting the email and password state*/}
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");


    //Shift to the home screen if user authenticated
    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser){
                navigation.replace("Home");
            }
        });

        // Every useEffect has a cleanup function
        return unsubscribe;

        {/* return() => {
            unsubscribe()
        }*/}

    }, []);


    const signIn = () => {
        //console.log("LOGIN")
        auth.signInWithEmailAndPassword(email,password)
        .catch(error => alert(error));
    }

    return (
        //<View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            {/* To make upper ribbon text 
            white - Time, Battery, WiFi icon */}
            <StatusBar style='light'/> 
            <Image
                source={require('./icon.png')}
                    //uri: "https://icons-for-free.com/iconfiles/png/512/chat+online+chatting+conversation+talk+whats+app+icon-1320166529743825540.png",
                    //uri: "https://logowik.com/content/uploads/images/signal-messenger-icon9117.jpg" ,
                //}}
                style={{ width: 190, height: 190}}
            ></Image>
            {/*<Text> SIGN UP </Text>*/}
            
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="Email" value={email} onChangeText={(text) => setEmail(text)}/>
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn}/>
            </View>

            <Button buttonStyle={styles.buttonColor} containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button onPress={() => navigation.navigate("Register")} type='outline' titleStyle={styles.reg_title} buttonStyle={styles.reg_button} containerStyle={styles.button} title="Register" />
            
            <View style={{height:70}} />
        </KeyboardAvoidingView>
        //</View>
    );
}

export default LoginScreen

const styles = StyleSheet.create({

    //Explore KeyBoardAvoid Functions
    //Flex automatic along column
    container:{
        flex:1,
        alignItems:"center",
        justifyContent: "center",
        padding: 85,
        backgroundColor: "white",
        //marginTop: 100,
        //paddingTop: 80,
    },

    //For the text boxes
    inputContainer: {
        paddingTop: 10,
        width: 300,
        //height: 50,
    },

    //Login Button
    buttonColor: {
        backgroundColor:"#000000",
        borderRadius: 10,
        //borderColor: "#000000",
    },

    //Related to registration button
    reg_button: {
        backgroundColor:"#FFFFFF",
        borderColor: "#000000",
        borderRadius: 10,
    },
    reg_title:{
        color: "#000000",
    },
    
    button:{
        width:200,
        marginTop: 10,
    },
});