import { BackHandler, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import logo from "../assets/images/logo.png";
import {WebView} from "react-native-webview";

const CameraScreen = () => {
  
  const htmlInternal=`
    <html>
      <body style="margin:0; padding:0; background-color:black; display:flex; justify-content:center; align-items:center;">
        <img src="${process.env.EXPO_PUBLIC_CAM_URL}" style="width:100%; height:auto;"/>      
      </body>
    </html>
  `;

  return (
    <SafeAreaView className="flex-1 w-full bg-cyan-400">
      
      <View className="flex flex-row items-center gap-5 px-5 py-4 bg-slate-800 border-b border-gray-100 pt-10">
        <Image source={logo} style={{ width: 50, height: 50 }} />
        <Text className="text-3xl font-extrabold text-white">Camera Live Feed</Text>
      </View>

      <View className="flex-1 mx-5 my-10 px-3 py-10 overflow-hidden rounded-xl border border-gray-800">
        <WebView 
          source={{html: htmlInternal}}
          className="flex w-full h-fit my-10"
          scrollEnabled={false}
          scalesPageToFit={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;
