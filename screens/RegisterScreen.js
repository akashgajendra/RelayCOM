import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { Button, Input} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { Image, Text } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';

//https://icons.expo.fyi/ - ICON LIST

const RegisterScreen = ({navigation})  => {
    {/* Setting the email and password state
        <View>
        <Text>I AM THE REGISTER SCREEN</Text>
        </View>*/}
    
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [imageUrl, setUrl]=useState("");


    {/* The BACK button - USE Layour Effect*/}
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        });
    }, [navigation]);

    const register=() => {
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName:name,
                photoURL: imageUrl || "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            })
        }) //Authenticated User Object
        .catch((error) => alert(error.message)); //Exception Handling

    }

    return (
        //<View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'></StatusBar>
            <Text h4 style={{marginBottom: 50}}>
                Create RelayCOM account
            </Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" 
                autoFocus type='text' 
                value={name} 
                onChangeText={(text) => setName(text)} />

            <Input placeholder="Email" 
                type='email' 
                value={email} 
                onChangeText={(text) => setEmail(text)} />

            <Input placeholder="Password" 
                type='password'
                secureTextEntry 
                value={password} 
                onChangeText={(text) => setPassword(text)} />

            <Input placeholder="Profile Picture URL (Optional)" 
                type='text' 
                value={imageUrl} 
                onChangeText={(text) => setUrl(text)} 
                onSubmitEditing={register}

            />

            </View>

        <Button buttonStyle={styles.reg_button_color}
        containerStyle={styles.reg_button} 
        raised onPress={register} title='Sign Up'/>
        <View style={{height:100}} />

        </KeyboardAvoidingView>
        //</View>
    );
    }

export default RegisterScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center', //Horizontal
        justifyContent: 'center', //Vertical
        padding:10,
        backgroundColor: "white"
    },
    reg_button:{
        width: 200,
        marginTop:10,
    },
    reg_button_color:{
        backgroundColor:"purple"
    },
    inputContainer: {
        width: 300
    }

});
