import React, { useState } from "react";
import { View,Text,FlatList ,Image, TouchableOpacity} from "react-native";
import { GlobalScroll, MyInput } from "../../../components";
import { appIcons, colors, heightPixel,routes,widthPixel } from "../../../services";

import styles from "./style";

const FriendMessagesListing = ({navigation}) =>{
    const [search,setSearch] = useState('');
    const frequentUsers = [
        {id:'1',icon:appIcons.profile,active:true},
        {id:'2',icon:appIcons.profile,active:true},
        {id:'3',icon:appIcons.profile,active:false},
        {id:'4',icon:appIcons.profile,active:true},
        {id:'5',icon:appIcons.profile,active:false},
        {id:'6',icon:appIcons.profile,active:false},
        {id:'7',icon:appIcons.profile,active:true},
    ]
    const chatLists = [
        {id:'1',icon:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",name:"Ahmed Sarfaraz",lastMessage:"sd fbsdsbdnf sbdfh",time:'3 min ago',active:false},
        {id:'2',icon:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",name:"Muaz Sarfaraz",lastMessage:"sd fbsdsbdnf sbdfh",time:'10 min ago',active:true},
        {id:'3',icon:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",name:"Hamza",lastMessage:"sd fbsdsbdnf sbdfh",time:'12 min ago',active:false},
        {id:'4',icon:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",name:"Ameer",lastMessage:"sd fbsdsbdnf sbdfh",time:'30 min ago',active:false},
        {id:'5',icon:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",name:"Owais Mohsin",lastMessage:"sd fbsdsbdnf sbdfh",time:'1 day ago',active:true},
        {id:'6',icon:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",name:"Umair Mehmood",lastMessage:"sd fbsdsbdnf sbdfh",time:'2 day ago',active:true},
        {id:'7',icon:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",name:"Huzaida Irshad",lastMessage:"sd fbsdsbdnf sbdfh",time:'3 day ago',active:false},
        {id:'7',icon:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",name:"Huzaida Irshad",lastMessage:"sd fbsdsbdnf sbdfh",time:'3 day ago',active:false},
    ]
    return(

        <View style={styles.mainDiv}>
            <Text style={styles.headigText}>
                Direct Messages
            </Text>
            <View style={styles.searchDiv}>
              
           <View style={styles.inputDiv}>
           <MyInput placeHolder="Search direct message..."  value={search} setValue={setSearch} border={true} borderRadius={50} icon={appIcons.searchIcon}/>
            </View> 
            </View>
            <View style={styles.frequentDiv}>
                <Text style={styles.frequentlyStyle}>
                    Frequently Connected
                </Text>
                <FlatList
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                horizontal
                data={frequentUsers}
                renderItem={({item,index})=>(
                    <TouchableOpacity style={styles.frequentUsersList}>
                        <Image source={item.icon} style={styles.profilePicStyle}/>
                        {item.active && <Image source={appIcons.greendot} style={styles.greendotStyle}/>}
                    </TouchableOpacity>
                )} 
                />
            </View>
            <View style={styles.firendListDiv}>
            <View style={styles.flatListView}>
            <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                data={chatLists}
                renderItem={({item,index})=>(
                    <TouchableOpacity style={styles.messageTile} onPress={()=>navigation.navigate(routes.individualMessages,{profileImage:item.icon,userName:item.name})}>
                        <View style={styles.friendUsersList}>
                        <Image source={{uri:item.icon}} style={styles.profilePicStyleList}/>
                        {item.active && <Image source={appIcons.greendot} style={styles.greendotStyle}/>}
                    </View>
                    <View style={styles.namesDivStyles}>
                        <Text style={styles.nameText}>
                            {item.name}
                        </Text>
                        <Text style={styles.messageText}>
                            {item.lastMessage}
                        </Text>
                    </View>
                    <View style={styles.timeDiv}>
                        <Text style={styles.timeText}>
                        {item.time}
                        </Text>
                    </View>
                    </TouchableOpacity>
                )} 
                />
            </View>
            </View>
            
        </View>

        
    );
}


export default FriendMessagesListing;