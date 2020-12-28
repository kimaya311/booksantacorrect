import * as React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {Card} from 'react-native-elements';
export default class ReceiverDetails extends React.Component{
constructor(props){
 super(props);
 this.state={
     userID:firebase.auth.currentUser.email(),
     receiverID:this.props.navigation.getParam('details')["user_id"],
     requestID:this.props.navigation.getParam('details')["request_id"],
     bookName:this.props.navigation.getParam('details')["book_name"],
     reasonforrequest:this.props.navigation.getParam('details')["reason_to_request"],
     receiverName:'',
     receiverContact:'',
     receiverAddress:'',
     receiverRequestDocID:''
 }
}

 getReceiverDetails(){
    db.collection('Users').where('email_id','==',this.state.receiverID).get()
    .then((snapShot)=>{
        snapShot.forEach(element => {
            this.setState({
                receiverName:element.data().firstName,
                receiverContact:element.data().contact,
                receiverAddress:element.data().address

            }) 
        });
    })
    db.collection('BookRequests').where('request_id','==',this.state.requestID).get()
    .then((snapShot)=>{
        snapShot.forEach(element => {
            this.setState({
                receiverRequestDocID:element.id
            })
        })
    })
}
updateBookStatus=()=>{
db.collection('all_donations').add({
 book_name:this.state.bookName,
 request_id:this.state.receiverID,
 requestedBy:this.state.receiverName,
 donorId:this.state.userID,
 requestStatus:'donor interested'
})
}
render(){
    return(
    <View>
        <View>
            <Card>
                <Text style={{fontWeight:'bold'}}> 
                Name:{this.state.receiverName} 
               </Text>
            </Card>
            <Card>
                <Text style={{fontWeight:'bold'}}>
                Contact:{this.state.receiverContact}
               </Text>
            </Card>
            <Card>
                <Text style={{fontWeight:'bold'}}>
                Address:{this.state.receiverAddress}
               </Text>
            </Card>
        </View>
        <View style={styles.buttonContainer}>
            {
                this.state.receiverID!==this.state.userID?
                (<TouchableOpacity style={styles.button}
                onPress={()=>{
                    this.updateBookStatus();
                    this.props.naviagtion.navigate('MyDonations')
                }}>
                 <Text>
                     I want to donate
                </Text>   
                </TouchableOpacity>):null
            }
        </View>
    </View>
    )
    }
}
const styles = StyleSheet.create({
 container: { 
     flex:1, 
    },
 buttonContainer : { 
     flex:0.3, 
     justifyContent:'center',
      alignItems:'center' },
 button:{ 
     width:200,
     height:50,
     justifyContent:'center', 
     alignItems : 'center',
     borderRadius: 10,
     backgroundColor: 'orange',
     shadowColor: "#000",
     shadowOffset: { width: 0, height: 8 },
     elevation : 16 } })