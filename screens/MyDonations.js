import * as React from 'react';
import {Text,View,StyleSheet,TouchableOpactiy,FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase'; 
import {ListItem,Icon} from 'react-native-elements'
export default class MyDonations extends React.Component{
constructor(){
    super();
      this.state={
        userID:firebase.auth.currentUser.email(),
        allDonations:[]
      }
      this.requestRef=null
} 
getAllDonations=()=>{
    this.requestRef=db.collection('all_donations').where('donor_id','==',this.state.userID).
onSnapshot((snapShot)=>{
    var alldonations=snapShot.doc.map(document=>{document.data()})
        this.setState({
        allDonations:alldonations    
    })
    })
}

keyExtractor = (item,index)=>
    index.toString();
    renderItem=({item,i})=>(
        <ListItem 
        key={i}
        type={item.book_name}
        subtitle={'Requested By:'+ item.requestedBy+'\nStatus :'+item.requestStatus}
        leftElement={
        <Icon 
        name= "book"
        type= "font-Awesome"
        color="#696969"
        />}
        titleStyle = {{color :'black',fontWeight:'bold'}}
        rightElement = {
            <TouchableOpacity style = {styles.button }>
                <Text style = {{color: "white"}}>Send Book</Text>
                </TouchableOpacity>
        }
        bottomDivider
        />
    )
    componentDidMount(){
        this.getAllDonations();
    }
render(){
    return(
        <View> 
            <MyHeader navigation={this.props.navigation} title="MyDonations"/>
                <View style={{flex:1}}>
                    {
                        this.state.allDonations.length===0
                        ?(
                        <View style={styles.subtitle}>
                            <Text style={{fontSize:20}}> List of all BookDonations </Text>
                        </View>
                        )
                        :(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allDonations}
                            renderItem={this.renderItem}
                            />
                        )
                    }
                </View>
        </View>
    )
} 
};
const styles = StyleSheet.create({
    button:{
     width:100,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ff5722",
     shadowColor: "#000",
     shadowOffset: { 
     width: 0,
     height: 8 },
     elevation : 16 },

    subtitle :{ 
     flex:1,
     fontSize: 20,
     justifyContent:'center',
     alignItems:'center' }
     })