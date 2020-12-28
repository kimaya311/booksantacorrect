import * as React from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native'
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'
export default class SettingScreen extends React.Component {
 constructor(){
     super();
     this.state={
         firstName:'',
         lastName:'',
         Contact:'',
         Address:'',
         emailId:'',
         docId:''
     }
 };
 getUserDetails =()=>{
var user = firebase.auth().currentUser;
var email = user.email ;
db.collection('Users').where('emailId','==',email).get()
.then (snapshot=>{
    snapshot.forEach(element => {
       var data = element.data();
       this.setState({
           emailId:data.emailId ,
           firstName:data.firstName,
           lastNmae:data.lastName,
           Contact:data.Contact,
           Address:data.Address,
           docId:element.id
        }) 
    });
})
 }
 updateUserDetails =()=>{
    db.collection("Users").doc(this.state.docId).update({
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        Contact:this.state.Contact,
        Address:this.state.Address
    })
 }
 componentDidMount (){
     this.getUserDetails();
 }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <View style={styles.formContainer}>
                    <TextInput style={styles.formTextInput} 
                               placeholder={"First Name"}
                               maxlength={8}
                               onChangeText={(text)=>{
                                this.setState({
                                 firstName:text   
                                })
                               }}
                               value={this.state.firstName}
                    />
                    <TextInput style={styles.formTextInput} 
                               placeHolder={"Last Name"}
                               maxlength={8}
                               onChangeText={(text)=>{
                                this.setState({
                                 lastName:text   
                                })
                               }}
                               value={this.state.lastName}
                    />
                    <TextInput style={styles.formTextInput} 
                               placeHolder={"Contact"}
                               maxlength={10}
                               keyboardType={'numeric'}
                               onChangeText={(text)=>{
                                this.setState({
                                 Contact:text   
                                })
                               }}
                               value={this.state.Contact}
                    />
                    <TextInput style={styles.formTextInput} 
                               placeHolder={"Address"}
                               multiline={true}
                               onChangeText={(text)=>{
                                this.setState({
                                 Address:text   
                                })
                               }}
                               value={this.state.Address}
                    />
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.updateUserDetails();
                    }}>
                        <Text style={styles.buttonText}> Save </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })