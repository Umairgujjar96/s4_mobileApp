import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from "react-native";
import styles from "./style";
import { colors } from "../../../services";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { timeAgo } from "../../../services/helpingMethods";


const Messages = ({ navigation, route }) => {
    const { profileImage, userName, inbox } = route.params;
    // const [messages, setMessages] = useState([
    //     { message: "hello how are tou", me: true },
    //     { message: "I am fine what about you", me: false },
    //     { message: "I am also fine what is going on", me: true },
    //     { message: "nothing just study.", me: false },
    //     { message: "ahhh in which grade and which university", me: true },
    //     { message: "Comsats university lahore final semester", me: false },
    //     { message: "oohh nice that is good to hear", me: true },
    //     { message: "nothing just study.", me: false },
    //     { message: "ahhh in which grade and which university", me: true },
    //     { message: "Comsats university lahore final semester", me: false },
    //     { message: "oohh nice that is good to hear", me: true },
    //     { message: "nothing just study.", me: false },
    //     { message: "ahhh in which grade and which university", me: true },
    //     { message: "Comsats university lahore final semester", me: false },
    //     { message: "oohh nice that is good to hear", me: true },
    // ]);

    // const url = 'http://192.168.18.38:8000/';
    const url = 'http://ec2-16-171-52-243.eu-north-1.compute.amazonaws.com/';


    const socket = io.connect(url);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((state) => state.user.userData);
    const [messages, setMessages] = useState([]);



    useEffect(() => {
        fetchMessages();
    }, [])


    const fetchMessages = async () => {
        socket.emit('get-messages', { userId: user._id, inbox });

        socket.on('messages', (data) => {

            setMessages(data.data.messages);
        });
    };


    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Add the new message to the list, making it from "me"
            // setMessages([...messages, { message: newMessage }]);
            setNewMessage(""); // Clear the input field after sending

            socket.emit('send-message', { userId: user._id, to: inbox, message: newMessage, messageType: "text", messageTime: new Date() });
            socket.emit('get-messages', { userId: user._id, inbox });
            socket.on('messages', (data) => {
                setMessages(data.data.messages);
            })
        }
    };

    return (
        <View style={styles.mainDiv}>
            <View style={styles.topMain}>
                <View style={styles.topBarDiv}>
                    <View style={styles.profileBorder}>
                        <Image source={{ uri: profileImage }} style={styles.imageStyle} />
                    </View>
                    <View style={styles.userTextDiv}>
                        <Text style={[styles.mediumText, styles.blackColor, styles.bold]}>
                            {userName}
                        </Text>
                        <Text style={styles.greyColor}>{userName}</Text>
                    </View>
                </View>
            </View>

            <FlatList
                inverted
                // style={{ paddingVertical: 16 }}
                data={messages}
                renderItem={({ item }) => (
                    <View style={[item.sender === user._id ? styles.rightText : styles.leftText]}>
                        <View style={[item.sender === user._id ? styles.messagesTextRight : styles.messagesTextLeft]}>
                            <Text style={styles.messageTextStyle}>{item.message}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* Text Input for typing messages */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholderTextColor={colors.grey}
                    placeholder="Type a message"
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Messages;
