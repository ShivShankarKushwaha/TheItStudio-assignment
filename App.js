import { View, Text, TextInput, TouchableOpacity, Image, Alert ,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import axios from './axios';

const App = () =>
{
    const [userdata,setuserdata]=useState({name:'',mobile:'',email:'',message:''});
    const [sent,setsent]=useState(false);
    // Validation functions
    const validateName = () =>
    {
        if (userdata.name.trim() === '') {
            Alert.alert('Validation Error', 'Please enter a valid name.');
            return false;
        }
        return true;
    };

    const validateMobile = () =>
    {
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(userdata.mobile)) {
            Alert.alert('Validation Error', 'Please enter a valid mobile number.');
            return false;
        }
        return true;
    };

    const validateEmail = () =>
    {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(userdata.email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return false;
        }
        return true;
    };
    const ValidateMessage =()=>
    {
        if(!userdata.message)
        {
            Alert.alert('Please Enter some message');
            return false;
        }
        return true;
    }

    function sendMail()
    {
        if(!userdata.name || !userdata.email || !userdata.mobile || !userdata.message)
        {
            Alert.alert('Required','All fields are required');
            return;
        }
        if (validateName() && validateMobile() && validateEmail() && ValidateMessage()) {
            setsent(true);
            axios.post("/sendMail",{...userdata})
            .then(result=>{
                if(result.status===200)
                {
                    Alert.alert('Thank You ','We will contact you soon');
                    setuserdata({});
                }
                console.log(result);
                setsent(false);
            })
            .catch(err=>
                {
                    Alert.alert('Unsuccessful ❌','Could not save contact details');
                    setsent(false);
                })
        }
    }
    return (
        <View>
            <View className="absolute w-full h-[100vw] -top-[50vw] bg-violet-800 rounded-full"></View>
            <View className="w-full h-full flex flex-col justify-around items-center px-5">
                <Text className="text-3xl font-bold font-serif text-white">Contact Us</Text>
                <View className="w-full flex flex-col justify-center items-center gap-5">
                    <View className="w-full rounded-xl flex flex-row justify-center items-center border-2 border-gray-400">
                        <Image className="w-8 h-8" tintColor={'blue'} source={require('./public/user-line.png')}></Image>
                        <TextInput className="w-[80vw]  text-xl text-blue-500" value={userdata.name} onChangeText={(text)=>{setuserdata({...userdata,name:text})}} placeholder='Name'></TextInput>
                    </View>
                    <View className="w-full rounded-xl flex flex-row justify-center items-center border-2 border-gray-400">
                        <Image className="w-8 h-8" tintColor={'blue'} source={require('./public/phone-line.png')}></Image>
                        <TextInput keyboardType='decimal-pad' className="w-[80vw]  text-xl text-blue-500" value={userdata.mobile} onChangeText={(text) => { setuserdata({ ...userdata, mobile: text }) }} placeholder='Mobile Number'></TextInput>
                    </View>
                    <View className="w-full rounded-xl flex flex-row justify-center items-center border-2 border-gray-400">
                        <Image className="w-8 h-8" tintColor={'blue'} source={require('./public/mail-unread-line.png')}></Image>
                        <TextInput keyboardType='email-address' className="w-[80vw]  text-xl text-blue-500" value={userdata.email} onChangeText={(text) => { setuserdata({ ...userdata, email: text }) }} placeholder='Email'></TextInput>
                    </View>
                    <View className="w-full rounded-xl flex flex-row justify-center items-center border-2 border-gray-400">
                        <Image className="w-8 h-8" tintColor={'blue'} source={require('./public/message-2-line.png')}></Image>
                        <TextInput multiline numberOfLines={4} className="w-[80vw] text-xl text-blue-500" value={userdata.message} onChangeText={(text) => { setuserdata({ ...userdata, message: text }) }} placeholder='Message'></TextInput>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{sendMail()}}>
                    <Text className="bg-violet-800 text-white text-xl p-3 px-10 rounded ">{sent?<ActivityIndicator size={'small'} color={'yellow'}></ActivityIndicator>:"Send it" }</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default App;