import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

// Alert Banner Component
function AlertBanner() {
  return (
    <View className="flex flex-row w-100 pr-4 bg-red-500 px-6 py-4 flex-row items-center justify-between">
      <View className="flex-row items-center gap-1">
        <Ionicons name="warning" size={24} color="white" />
        <Text className="text-white font-semibold">SafeAlert</Text>
        <View className=" ml-6 flex flex-col-2">
          <Text className="text-white font-semibold text-sm">FLOOD ALERT: Water level rising</Text><Text className="text-white xfont-semibold text-sm"> rapidly in Barangay 3</Text>
        </View>
      </View>
    </View>
  );
}

// Dashboard Content Component
function DashboardContent() {
  return (
    <ScrollView className="flex-1 p-8">
      <Text className="text-neutral-900 text-2xl font-bold mb-8">Dashboard</Text>

      {/* Alert Summary */}
      <View className="mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-neutral-900 text-xl font-semibold">Alert Summary</Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text className="text-neutral-600">Map</Text>
            <Ionicons name="chevron-forward" size={16} color="#525252" />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1 bg-white rounded-lg p-6 border border-neutral-200">
            <Text className="text-neutral-600 mb-2">Flood Warning</Text>
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-red-500 rounded-lg items-center justify-center">
                <Ionicons name="water" size={24} color="white" />
              </View>
              <Text className="text-neutral-900 text-3xl font-bold">1.9 m</Text>
            </View>
          </View>

          <View className="flex-1 bg-white rounded-lg p-6 border border-neutral-200">
            <Text className="text-neutral-600 mb-2">Rainfall intensity</Text>
            <View className="flex-row items-center gap-3">
              <Ionicons name="rainy" size={48} color="#EF4444" />
              <Text className="text-neutral-900 text-3xl font-bold">
                35 <Text className="text-neutral-600 text-base">mm/hr</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Active Alerts */}
      <View className="mb-8">
        <Text className="text-neutral-900 text-xl font-semibold mb-4">Active Alerts</Text>
        <View className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <View className="flex-row border-b border-neutral-200 bg-neutral-50">
            <Text className="flex-1 px-6 py-3 text-neutral-600 font-semibold">Sensor</Text>
            <Text className="flex-1 px-6 py-3 text-neutral-600 font-semibold">Location</Text>
            <Text className="flex-1 px-6 py-3 text-neutral-600 font-semibold">Water Level</Text>
            <Text className="flex-1 px-6 py-3 text-neutral-600 font-semibold">Rainfall</Text>
          </View>
          <View className="flex-row">
            <Text className="flex-1 px-6 py-4 text-neutral-900">F-1001</Text>
            <Text className="flex-1 px-6 py-4 text-neutral-900">Brgy, San Isidro</Text>
            <Text className="flex-1 px-6 py-4 text-neutral-900">1.9 m</Text>
            <Text className="flex-1 px-6 py-4 text-neutral-900">35 mm/hr</Text>
          </View>
        </View>
      </View>

      {/* Flood Alerts Tabs */}
      <View>
        <Text className="text-neutral-900 text-xl font-semibold mb-4">Flood Alerts</Text>
        <View className="bg-white rounded-lg border border-neutral-200">
          <View className="border-b border-neutral-200 flex-row">
            <TouchableOpacity className="px-6 py-3 border-b-2 border-neutral-900">
              <Text className="text-neutral-900 font-semibold">Timeline</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-6 py-3">
              <Text className="text-neutral-600">Recommender</Text>
            </TouchableOpacity>
            <View className="ml-auto px-6 py-3">
              <Text className="text-neutral-600">None</Text>
            </View>
          </View>
          <View className="p-6">
            <Text className="text-neutral-600">No active flood alerts in timeline</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Notifications Panel Component
function NotificationsPanel() {
  const chartData = {
    labels: ['12:00', '12:00', '17:00', '21:00'],
    datasets: [
      {
        data: [0.5, 0.5, 1.3, 1.9],
        color: (opacity = 1) => `rgba(220, 38, 38, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView className="w-96 bg-white border-l border-neutral-200 p-6">
      <Text className="text-neutral-900 text-xl font-semibold mb-6">Alerts & Notifications</Text>

      {/* Notification Item */}
      <View className="mb-6">
        <View className="flex-row gap-3 mb-2">
          <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center">
            <Ionicons name="notifications" size={20} color="#EF4444" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-start justify-between">
              <Text className="text-neutral-900 font-semibold">Flood Warning</Text>
              <Text className="text-sm text-neutral-500">4 minutes ago</Text>
            </View>
            <Text className="text-sm text-neutral-600">Flood alert</Text>
          </View>
        </View>

        {/* Map */}
        <View className="bg-neutral-100 rounded-lg h-40 mb-4 items-center justify-center relative overflow-hidden">
          <View className="absolute right-0 top-0 bottom-0 w-1/2 bg-blue-200" />
          <View className="absolute left-0 top-0 bottom-0 w-1/2 bg-orange-300 opacity-70" />
          
          <View className="absolute">
            <View className="w-12 h-12 bg-red-500 rounded-full items-center justify-center">
              <Ionicons name="warning" size={28} color="white" />
            </View>
          </View>

          {/* Map controls */}
          <View className="absolute top-2 left-2 gap-1">
            <TouchableOpacity className="w-8 h-8 bg-white rounded shadow items-center justify-center">
              <Ionicons name="add" size={16} color="#171717" />
            </TouchableOpacity>
            <TouchableOpacity className="w-8 h-8 bg-white rounded shadow items-center justify-center">
              <Ionicons name="remove" size={16} color="#171717" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Flood Alerts Chart */}
      <View>
        <Text className="text-neutral-900 font-semibold mb-2">Flood Alerts</Text>
        <Text className="text-sm text-neutral-600 mb-4">Recommendation: Pomadative</Text>

        <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <View className="flex-row items-center gap-2">
            <Ionicons name="warning" size={20} color="#DC2626" />
            <Text className="text-red-600 font-semibold">EVACUATE</Text>
          </View>
        </View>

        <View className="h-48">
          <LineChart
            data={chartData}
            width={screenWidth-40}
            height={192}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(220, 38, 38, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(115, 115, 115, ${opacity})`,
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: '0',
              },
            }}
            bezier
            style={{
              borderRadius: 8,
            }}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={true}
            withHorizontalLines={true}
            withDots={false}
            yAxisSuffix=" m"
            fromZero={true}
          />
        </View>
      </View>
    </ScrollView>
  );
}

// Main App Component
export default function App() {
  return (
    <View className="flex-1 bg-neutral-100 w-full">
      <AlertBanner />
      <View className="flex-row flex-1 mx-auto w-full ml-[-30] mb-10">
        <DashboardContent />
        <NotificationsPanel /> 
      </View>
    </View>
  );
}


