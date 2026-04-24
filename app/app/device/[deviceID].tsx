import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Octicons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import axiosInstance from "@/axiosConfig";
import Toast from "react-native-toast-message";
import loadingOverlay from "../components/LoadingOverlay";

/* ---------- Helpers ---------- */
const formatLastUpdate = (timestamp: number) => {
  if (!timestamp) return "No data";
  return new Date(timestamp).toLocaleString();
};

const getFloodColor = (level: number) => {
  if (level >= 3) return "text-red-600";
  if (level === 2) return "text-orange-500";
  if (level === 1) return "text-yellow-500";
  return "text-green-600";
};

/* ---------- Metric Card ---------- */
const MetricCard = ({ title, value, iconName, bgColor, valueColor }) => (
  <View className="w-1/2 p-2">
    <View
      className={`flex-row items-center p-3 rounded-xl border border-gray-100 ${bgColor}`}
    >
      <MaterialCommunityIcons name={iconName} size={22} color="#374151" />
      <View className="ml-3">
        <Text className={`text-base font-bold ${valueColor}`}>{value}</Text>
        <Text className="text-xs text-gray-500">{title}</Text>
      </View>
    </View>
  </View>
);

/* ---------- Device Details ---------- */
const DeviceDetails = () => {
  const { deviceID } = useLocalSearchParams();
  const [device, setDevice] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newDeviceID, setNewDeviceID] = useState("");

  useEffect(() => {
    loadDevice();
    const interval = setInterval(loadDevice, 20000);
    return () => clearInterval(interval);
  }, []);

  const loadDevice = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(
        `/device/get-a-device/${deviceID}`,
        { withCredentials: true }
      );

      if (!res.data.success) {
        Toast.show({
          type: "error",
          text1: "❌ Failed to load device",
          text2: res.data.message,
        });
        return;
      }

      setDevice(res.data.data[0]);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "❌ Error loading device",
        text2: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmRenamePress = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.put(
        `/device/update/${device._id}`,
        { deviceID: newDeviceID },
        { withCredentials: true }
      );

      if (!res.data.success) {
        Toast.show({
          type: "error",
          text1: "❌ Rename failed",
          text2: res.data.message,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "✅ Device renamed",
      });

      setDevice(res.data.data[0]);
      setNewDeviceID("");
      setShowRenameModal(false);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "❌ Rename error",
        text2: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!device || !device.deviceID) return null;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {isLoading && loadingOverlay()}

      <ScrollView>
        {/* ---------- HEADER ---------- */}
        <View className="bg-white px-4 pt-10 pb-4 border-b border-gray-100">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-extrabold text-gray-900">
                {device.deviceID}
              </Text>

              {!!device.location && (
                <Text className="text-xs text-gray-500 mt-1">
                  📍 {device.location}
                </Text>
              )}

              <Text className="text-xs text-gray-400 mt-1">
                Last update: {formatLastUpdate(device.lastUpdate)}
              </Text>
            </View>

            <View className="items-center">
              <Octicons
                name="dot-fill"
                size={26}
                color={device.isonline ? "green" : "red"}
              />
              <TouchableOpacity
                onPress={() => setShowRenameModal(true)}
                className="mt-2 bg-blue-600 px-3 py-1 rounded-lg"
              >
                <MaterialIcons name="edit" size={14} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ---------- METRICS ---------- */}
        <View className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm border border-gray-100">
          <View className="flex-row flex-wrap -m-2">
            <MetricCard
              title="Rain Status"
              value={device.isRaining ? "Raining" : "Clear"}
              iconName="weather-rainy"
              bgColor="bg-blue-50"
              valueColor={
                device.isRaining ? "text-blue-600" : "text-green-600"
              }
            />

            <MetricCard
              title="Rainfall Intensity"
              value={`${device.rainfallIntensity} mm/hr`}
              iconName="weather-pouring"
              bgColor="bg-indigo-50"
              valueColor="text-gray-800"
            />

            <MetricCard
              title="Flood Level"
              value={`Level ${device.floodLevel}`}
              iconName="home-flood"
              bgColor="bg-red-50"
              valueColor={getFloodColor(device.floodLevel)}
            />
          </View>
        </View>
      </ScrollView>

      {/* ---------- RENAME MODAL ---------- */}
      <Modal transparent visible={showRenameModal} animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold text-center mb-4">
              Rename Device
            </Text>

            <View className="flex-row mb-6">
              <View className="border border-gray-300 px-2 justify-center rounded-l-lg">
                <AntDesign name="barcode" size={26} color="green" />
              </View>
              <TextInput
                value={newDeviceID}
                onChangeText={setNewDeviceID}
                placeholder="New Device ID"
                className="flex-1 border border-gray-300 border-l-0 px-3 rounded-r-lg"
              />
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setShowRenameModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmRenamePress}
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                <Text className="text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DeviceDetails;
