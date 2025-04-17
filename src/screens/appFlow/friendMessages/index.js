// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, LogBox } from "react-native";
// import { GlobalScroll, MyInput } from "../../../components";
// import { appIcons, colors, heightPixel, routes, widthPixel } from "../../../services";
// import { io } from 'socket.io-client';
// import { timeAgo } from "../../../services/helpingMethods";
// import styles from "./style";
// import { useSelector } from "react-redux";

// const FriendMessagesListing = ({ navigation }) => {
//     const userData = useSelector((state) => state.user.userData);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const [inboxes, setInboxes] = useState([]);

//     const [search, setSearch] = useState('');
//     // const frequentUsers = [
//     //     { id: '1', icon: appIcons.profile, active: true },
//     //     { id: '2', icon: appIcons.profile, active: true },
//     //     { id: '3', icon: appIcons.profile, active: false },
//     //     { id: '4', icon: appIcons.profile, active: true },
//     //     { id: '5', icon: appIcons.profile, active: false },
//     //     { id: '6', icon: appIcons.profile, active: false },
//     //     { id: '7', icon: appIcons.profile, active: true },
//     // ]
//     // const chatLists = [
//     //     { id: '1', icon: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Ahmed Sarfaraz", lastMessage: "sd fbsdsbdnf sbdfh", time: '3 min ago', active: false },
//     //     { id: '2', icon: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Muaz Sarfaraz", lastMessage: "sd fbsdsbdnf sbdfh", time: '10 min ago', active: true },
//     //     { id: '3', icon: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Hamza", lastMessage: "sd fbsdsbdnf sbdfh", time: '12 min ago', active: false },
//     //     { id: '4', icon: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Ameer", lastMessage: "sd fbsdsbdnf sbdfh", time: '30 min ago', active: false },
//     //     { id: '5', icon: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Owais Mohsin", lastMessage: "sd fbsdsbdnf sbdfh", time: '1 day ago', active: true },
//     //     { id: '6', icon: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Umair Mehmood", lastMessage: "sd fbsdsbdnf sbdfh", time: '2 day ago', active: true },
//     //     { id: '7', icon: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Huzaida Irshad", lastMessage: "sd fbsdsbdnf sbdfh", time: '3 day ago', active: false },
//     //     { id: '7', icon: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Huzaida Irshad", lastMessage: "sd fbsdsbdnf sbdfh", time: '3 day ago', active: false },
//     // ]

//     useEffect(() => {
//         const url = 'http://ec2-16-171-52-243.eu-north-1.compute.amazonaws.com/';
//         // const url = 'http://192.168.18.38:8000/';

//         const socket = io.connect(url);

//         // Listen for connection event
//         socket.on('connect', () => {
//             console.log("User connected to socket: " + socket.id);
//         });

//         socket.emit('user-enter', { userId: userData._id });
//         socket.emit('get-online-users', { userId: userData._id }, (data) => {
//             const filteredUsers = data.data.users.filter((user) => user._id !== userData._id);
//             setOnlineUsers(filteredUsers);
//         })
//         socket.on('online-users', (data) => {
//             const filteredUsers = data.data.users.filter((user) => user._id !== userData._id);

//             setOnlineUsers(filteredUsers);
//         });
//         socket.emit('get-inboxes', { userId: userData._id })
//         socket.on('inboxes', (data) => {
//             console.log("Inboxes are ", data.data.inboxes);
//             setInboxes(data.data.inboxes);
//         })

//         // Cleanup on unmount
//         return () => {
//             socket.emit('user-leave', { userId: userData._id });
//             socket.disconnect();




//         };

//     }, []);




//     return (

//         <View style={styles.mainDiv}>
//             <Text style={styles.headigText}>
//                 Direct Messages
//             </Text>
//             <View style={styles.searchDiv}>

//                 <View style={styles.inputDiv}>
//                     <MyInput placeHolder="Search direct message..." value={search} setValue={setSearch} border={true} borderRadius={50} icon={appIcons.searchIcon} />
//                 </View>
//             </View>
//             <View style={styles.frequentDiv}>
//                 <Text style={styles.frequentlyStyle}>
//                     Online Users
//                 </Text>
//                 <FlatList
//                     showsHorizontalScrollIndicator={false}
//                     scrollEnabled={true}
//                     horizontal
//                     data={onlineUsers}
//                     renderItem={({ item, index }) => (
//                         <TouchableOpacity style={styles.frequentUsersList}>
//                             <Image source={{ uri: item.profileImage }} style={styles.profilePicStyle} />
//                             {<Image source={appIcons.greendot} style={styles.greendotStyle} />}
//                         </TouchableOpacity>
//                     )}
//                 />
//             </View>
//             <View style={styles.firendListDiv}>
//                 <View style={styles.flatListView}>
//                     <FlatList
//                         showsVerticalScrollIndicator={false}
//                         scrollEnabled={true}
//                         data={inboxes}
//                         renderItem={({ item, index }) => (
//                             <TouchableOpacity style={styles.messageTile} onPress={() => navigation.navigate(routes.individualMessages, { profileImage: item.profileImage, userName: item.userName, inbox: item._id })}>
//                                 <View style={styles.friendUsersList}>
//                                     <Image source={{ uri: item.profileImage }} style={styles.profilePicStyleList} />
//                                     {item.active && <Image source={appIcons.greendot} style={styles.greendotStyle} />}
//                                 </View>
//                                 <View style={styles.namesDivStyles}>
//                                     <Text style={styles.nameText}>
//                                         {item.userName}
//                                     </Text>
//                                     <Text style={styles.messageText}>
//                                         {item.lastMessage}
//                                     </Text>
//                                 </View>
//                                 <View style={styles.timeDiv}>
//                                     <Text style={styles.timeText}>
//                                         {timeAgo(item.lastMessageTime)}
//                                     </Text>
//                                 </View>
//                             </TouchableOpacity>
//                         )}
//                     />
//                 </View>
//             </View>

//         </View>


//     );
// }


// export default FriendMessagesListing;


import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { GlobalScroll, MyInput } from "../../../components";
import { appIcons, colors, heightPixel, routes, widthPixel } from "../../../services";
import { io } from 'socket.io-client';
import { timeAgo } from "../../../services/helpingMethods";
import styles from "./style";
import { useSelector } from "react-redux";

const FriendMessagesListing = ({ navigation }) => {
    const userData = useSelector((state) => state.user.userData);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [inboxes, setInboxes] = useState([]);
    const [filteredInboxes, setFilteredInboxes] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const url = 'http://ec2-16-171-52-243.eu-north-1.compute.amazonaws.com/'; // Socket URL
        const socket = io.connect(url);

        // Listen for connection event
        socket.on('connect', () => {
            console.log("User connected to socket: " + socket.id);
        });

        socket.emit('user-enter', { userId: userData._id });
        socket.emit('get-online-users', { userId: userData._id }, (data) => {
            const filteredUsers = data.data.users.filter((user) => user._id !== userData._id);
            setOnlineUsers(filteredUsers);
        });

        socket.on('online-users', (data) => {
            const filteredUsers = data.data.users.filter((user) => user._id !== userData._id);
            setOnlineUsers(filteredUsers);
        });

        socket.emit('get-inboxes', { userId: userData._id });
        socket.on('inboxes', (data) => {
            setInboxes(data.data.inboxes);
            setFilteredInboxes(data.data.inboxes);
        });



        // Cleanup on unmount
        return () => {
            socket.emit('user-leave', { userId: userData._id });
            socket.disconnect();
        };

    }, []);

    useEffect(() => {

        if (search.trim() === '') {
            setFilteredInboxes(inboxes);
        } else {
            const filtered = inboxes.filter((inbox) =>
                inbox.lastMessage.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredInboxes(filtered);
        }
    }, [search, inboxes]);

    return (
        <View style={styles.mainDiv}>
            <Text style={styles.headigText}>
                Direct Messages
            </Text>
            <View style={styles.searchDiv}>
                <View style={styles.inputDiv}>
                    <MyInput
                        placeHolder="Search direct message..."
                        value={search}
                        setValue={setSearch}
                        border={true}
                        borderRadius={50}
                        icon={appIcons.searchIcon}
                    />
                </View>
            </View>
            <View style={styles.frequentDiv}>
                <Text style={styles.frequentlyStyle}>
                    Online Users
                </Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    horizontal
                    data={onlineUsers}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.frequentUsersList}>
                            <Image source={{ uri: item.profileImage }} style={styles.profilePicStyle} />
                            <Image source={appIcons.greendot} style={styles.greendotStyle} />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.firendListDiv}>
                <View style={styles.flatListView}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        data={filteredInboxes} // Use filtered inboxes here
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={styles.messageTile}
                                onPress={() => navigation.navigate(routes.individualMessages, { profileImage: item.profileImage, userName: item.userName, inbox: item._id })}
                            >
                                <View style={styles.friendUsersList}>
                                    <Image source={{ uri: item.profileImage }} style={styles.profilePicStyleList} />
                                    {item.active && <Image source={appIcons.greendot} style={styles.greendotStyle} />}
                                </View>
                                <View style={styles.namesDivStyles}>
                                    <Text style={styles.nameText}>
                                        {item.userName}
                                    </Text>
                                    <Text style={styles.messageText}>
                                        {item.lastMessage}
                                    </Text>
                                </View>
                                <View style={styles.timeDiv}>
                                    <Text style={styles.timeText}>
                                        {timeAgo(item.lastMessageTime)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    );
};

export default FriendMessagesListing;
