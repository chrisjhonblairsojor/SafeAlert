import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axiosInstance from '../axiosConfig.js';

const screenWidth = Dimensions.get('window').width;

// Sidebar Menu Modal
function MenuModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const menuItems = [
    { icon: 'grid', label: 'Dashboard', active: true },
    { icon: 'phone-portrait', label: 'Devices', active: false },
    { icon: 'warning', label: 'Alerts', active: false },
    { icon: 'chatbubble', label: 'Responses', active: false },
    { icon: 'mail', label: 'Messages', active: false },
    { icon: 'document-text', label: 'Reports', active: false },
    { icon: 'people', label: 'Community Info', active: false },
    { icon: 'settings', label: 'Settings', active: false },
  ];
const [ data, setData] = useState();
  useEffect(()=>{
const func=async()=>{
  try{
    const response = await axiosInstance.get("/device/get");
    if(!response.data.success){
      console.log(JSON.stringify(response.data.message));
      setData([]);
    }else{
      setData(response.data.data);
      console.log(JSON.stringify(response.data));
    }
   } catch(error){
      console.error("Data.retrieval error:", error.message);
    
    }
  }

  func();
},[]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />
        <View className="bg-white rounded-t-3xl p-5">
          <View className="w-12 h-1 bg-neutral-300 rounded-full self-center mb-5" />
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-neutral-900">Menu</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close" size={24} color="#171717" />
            </TouchableOpacity>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false} className="max-h-96">
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.7}
                className={`flex-row items-center gap-3 px-3 py-3 rounded-lg mb-1 ${
                  item.active ? 'bg-red-50' : ''
                }`}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={20} 
                  color={item.active ? '#EF4444' : '#525252'} 
                />
                <Text className={item.active ? 'text-red-500 font-semibold' : 'text-neutral-600'}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
            <View className="h-px bg-neutral-200 my-2" />
            <TouchableOpacity className="flex-row items-center gap-3 px-3 py-3 rounded-lg" activeOpacity={0.7}>
              <Ionicons name="log-out" size={20} color="#525252" />
              <Text className="text-neutral-600">Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Main App Component
export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const chartData = {
    labels: ['12:00', '14:00', '17:00', '21:00'],
    datasets: [
      {
        data: [0.5, 0.5, 1.3, 1.9],
        color: (opacity = 1) => `rgba(220, 38, 38, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#EF4444" />
      
      <View className="flex-1">
        {/* Header with Alert */}
        <View className="bg-red-500">
          <View className="px-4 py-3 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setMenuVisible(true)} activeOpacity={0.7}>
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-2">
              <Ionicons name="warning" size={18} color="white" />
              <Text className="text-white font-bold">SafeAlert</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View className="px-4 pb-3">
            <Text className="text-white text-xs font-semibold">FLOOD ALERT</Text>
            <Text className="text-white text-xs">Water level rising in Barangay 3,Siaton  • 2 min ago</Text>
          </View>
        </View>

        <ScrollView className="flex-1 bg-neutral-50" showsVerticalScrollIndicator={false}>
          {/* Alert Summary Cards */}
          <View className="px-4 py-4">
            <View className="flex-row gap-3 mb-3">
              <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
                <View className="flex-row items-center gap-2 mb-2">
                  <View className="w-8 h-8 bg-red-500 rounded-lg items-center justify-center">
                    <Ionicons name="water" size={16} color="white" />
                  </View>
                  <Text className="text-xs text-neutral-500">Water Level</Text>
                </View>
                <Text className="text-2xl font-bold text-neutral-900">1.9m</Text>
                <Text className="text-xs text-red-500 font-semibold mt-1">Critical</Text>
              </View>

              <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
                <View className="flex-row items-center gap-2 mb-2">
                  <View className="w-8 h-8 bg-blue-500 rounded-lg items-center justify-center">
                    <Ionicons name="rainy" size={16} color="white" />
                  </View>
                  <Text className="text-xs text-neutral-500">Rainfall</Text>
                </View>
                <Text className="text-2xl font-bold text-neutral-900">35</Text>
                <Text className="text-xs text-neutral-500 mt-1">mm/hr</Text>
              </View>
            </View>

            {/* Quick Stats */}
            <View className="flex-row gap-3">
              <View className="flex-1 bg-white rounded-xl p-3 shadow-sm">
                <Text className="text-xs text-neutral-500 mb-1">Sensor</Text>
                <Text className="text-sm font-semibold text-neutral-900">F-1001</Text>
              </View>
              <View className="flex-1 bg-white rounded-xl p-3 shadow-sm">
                <Text className="text-xs text-neutral-500 mb-1">Location</Text>
                <Text className="text-sm font-semibold text-neutral-900">Barangay 3</Text>
              </View>
            </View>
          </View>

          {/* Evacuation Warning */}
          <View className="px-4 pb-4">
            <View className="bg-red-500 rounded-xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                  <Ionicons name="warning" size={24} color="white" />
                </View>
                <View>
                  <Text className="text-white font-bold text-base">EVACUATE NOW</Text>
                  <Text className="text-white/90 text-xs">Immediate action required</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </View>
          </View>

          {/* Map Section */}
          <View className="px-4 pb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-bold text-neutral-900">Affected Area</Text>
              <TouchableOpacity className="flex-row items-center gap-1" activeOpacity={0.7}>
                <Text className="text-xs text-red-500 font-semibold">View Full Map</Text>
                <Ionicons name="chevron-forward" size={14} color="#EF4444" />
              </TouchableOpacity>
            </View>
            
            <View className="bg-white rounded-xl overflow-hidden shadow-sm">
              <View className="bg-neutral-100 h-48 items-center justify-center relative overflow-hidden">
                <View className="absolute right-0 top-0 bottom-0 w-1/2 bg-blue-200" />
                <View className="absolute left-0 top-0 bottom-0 w-1/2 bg-orange-300 opacity-70" />
                
                <View className="absolute">
                  <View className="w-12 h-12 bg-red-500 rounded-full items-center justify-center shadow-lg">
                    <Ionicons name="warning" size={28} color="white" />
                  </View>
                </View>

                <View className="absolute top-2 left-2 gap-1">
                  <TouchableOpacity className="w-8 h-8 bg-white rounded-lg shadow items-center justify-center" activeOpacity={0.7}>
                    <Ionicons name="add" size={16} color="#171717" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-8 h-8 bg-white rounded-lg shadow items-center justify-center" activeOpacity={0.7}>
                    <Ionicons name="remove" size={16} color="#171717" />
                  </TouchableOpacity>
                </View>

                <View className="absolute bottom-2 right-2 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                  <Text className="text-xs font-semibold text-neutral-900">Barangay 3</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Water Level Trend */}
          <View className="px-4 pb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-bold text-neutral-900">Water Level Trend</Text>
              <Text className="text-xs text-neutral-500">Last 9 hours</Text>
            </View>
            
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <LineChart
                data={chartData}
                width={screenWidth - 64}
                height={180}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(220, 38, 38, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(115, 115, 115, ${opacity})`,
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#ffffff'
                  },
                }}
                bezier
                style={{
                  marginLeft: -8,
                }}
                withInnerLines={true}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={true}
                withDots={true}
                yAxisSuffix="m"
                fromZero={true}
              />
              <View className="flex-row items-center justify-center gap-4 mt-3">
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 bg-red-500 rounded-full" />
                  <Text className="text-xs text-neutral-600">Water Level</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Recent Alerts */}
          <View className="px-4 pb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-bold text-neutral-900">Recent Alerts</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-xs text-red-500 font-semibold">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-white rounded-xl shadow-sm overflow-hidden">
              <View className="px-4 py-3 flex-row items-center gap-3 border-b border-neutral-100">
                <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center">
                  <Ionicons name="notifications" size={20} color="#EF4444" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-neutral-900">Flood Warning</Text>
                  <Text className="text-xs text-neutral-500">4 minutes ago</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#D4D4D4" />
              </View>

              <View className="px-4 py-3 flex-row items-center gap-3 border-b border-neutral-100">
                <View className="w-10 h-10 bg-orange-100 rounded-lg items-center justify-center">
                  <Ionicons name="alert-circle" size={20} color="#F97316" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-neutral-900">Heavy Rainfall Detected</Text>
                  <Text className="text-xs text-neutral-500">15 minutes ago</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#D4D4D4" />
              </View>

              <View className="px-4 py-3 flex-row items-center gap-3">
                <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
                  <Ionicons name="information-circle" size={20} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-neutral-900">System Status Update</Text>
                  <Text className="text-xs text-neutral-500">1 hour ago</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#D4D4D4" />
              </View>
            </View>
          </View>

          {/* Active Sensors */}
          <View className="px-4 pb-6">
            <Text className="font-bold text-neutral-900 mb-2">Active Sensors</Text>
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-xs text-neutral-500">Total Sensors</Text>
                <Text className="text-sm font-bold text-neutral-900">12 Active</Text>
              </View>
              <View className="flex-row gap-2">
                <View className="flex-1 h-2 bg-green-500 rounded-full" />
                <View className="flex-1 h-2 bg-green-500 rounded-full" />
                <View className="flex-1 h-2 bg-green-500 rounded-full" />
                <View className="flex-1 h-2 bg-red-500 rounded-full" />
              </View>
              <View className="flex-row items-center justify-between mt-3">
                <View className="flex-row items-center gap-2">
                  <View className="w-2 h-2 bg-green-500 rounded-full" />
                  <Text className="text-xs text-neutral-600">9 Normal</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="w-2 h-2 bg-red-500 rounded-full" />
                  <Text className="text-xs text-neutral-600">3 Critical</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
      </View>
    </SafeAreaView>
  );
}
