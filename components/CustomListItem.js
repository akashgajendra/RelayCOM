import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, ScrollView ,Text, View,} from 'react-native';
import {  Avatar, ListItem } from 'react-native-elements';
import { db } from '../firebase';

//https://icons.expo.fyi/ - ICON LIST

const CustomListItem = ({id, chatName, enterChat})  => {
  // URI: Uniform Resource Identifier
  //Need to set up a scrollable View
  // MY PIC: https://media-exp1.licdn.com/dms/image/C4E03AQF4mm7K7c0WxQ/profile-displayphoto-shrink_200_200/0/1568691825593?e=1632960000&v=beta&t=9cuHWc2KdqS4yQbNJrnDjsQD1Ee9sEI4xHk5OlDfkJc"
  
  const [chatMessages, setChatMessages]=useState([]);

  useEffect(() => {
      const unsubscribe = db
      .collection('chats')
      .doc(id)
      .collection("messages")
      .orderBy("timestamp","asc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

      return unsubscribe;
  });

  return (    
        <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar rounded source={{uri: chatMessages?.[chatMessages.length-1]?.photoURL || "https://p.kindpng.com/picc/s/21-211210_free-for-commercial-use-high-resolution-personal-icon.png"}} />
            
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "800"}}>
                    {chatName}
                </ListItem.Title>

                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {/* //SOLVE: Display Name Issue */}
                    {/* {chatMessages?.[chatMessages.length-1]?.displayName}: {chatMessages?.[chatMessages.length-1]?.message} */}
                    {chatMessages?.[chatMessages.length-1]?.message} 
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});













// const CustomListItem = ({id, chatName, enterChat})  => {
//     // URI: Uniform Resource Identifier
//     //Need to set up a scrollable View
//     // MY PIC: https://media-exp1.licdn.com/dms/image/C4E03AQF4mm7K7c0WxQ/profile-displayphoto-shrink_200_200/0/1568691825593?e=1632960000&v=beta&t=9cuHWc2KdqS4yQbNJrnDjsQD1Ee9sEI4xHk5OlDfkJc"
//     return (    
//           <ListItem>
//               <Avatar rounded source={{uri: "https://p.kindpng.com/picc/s/21-211210_free-for-commercial-use-high-resolution-personal-icon.png"}} />
              
//               <ListItem.Content>
//                   <ListItem.Title style={{fontWeight: "800"}}>
//                       Youtube Chat
//                   </ListItem.Title>
  
//                   <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
//                       Got a couple of seats for Hamilton, wanna go?
//                   </ListItem.Subtitle>
//               </ListItem.Content>
//           </ListItem>
//     );
//   }