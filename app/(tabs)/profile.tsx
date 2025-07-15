import React from 'react';
import {View, Text, TouchableOpacity, Alert, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogOut, Mail, Calendar, Settings, CreditCard as Edit3} from 'lucide-react-native';
import useAuthStore from '@/store/auth.store';

const Profile = () => {
    const {user, logout} = useAuthStore();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => logout()
                }
            ]
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!user) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <View className="flex-1 justify-center items-center p-6">
                    <Text className="text-xl text-gray-600">Please login to view your profile</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="bg-white pt-6 pb-8 px-6 border-b border-gray-100">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-2xl font-bold text-gray-900">Profile</Text>
                        <TouchableOpacity className="p-2">
                            <Edit3 size={20} color="#6b7280"/>
                        </TouchableOpacity>
                    </View>

                    {/* Profile Card */}
                    <View className="items-center">
                        <View className="relative mb-4">
                            <Image
                                source={{uri: user.avatar}}
                                className="w-24 h-24 rounded-full bg-gray-200"
                                defaultSource={{uri: 'https://via.placeholder.com/96x96/3b82f6/ffffff?text=' + user.name.charAt(0)}}
                            />
                            <View
                                className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></View>
                        </View>

                        <Text className="text-xl font-bold text-gray-900 mb-1">{user.name}</Text>
                        <Text className="text-gray-600 mb-4">{user.email}</Text>

                        <View className="bg-primary-50 px-4 py-2 rounded-full">
                            <Text className="text-primary-700 font-medium">Active User</Text>
                        </View>
                    </View>
                </View>

                {/* Account Information */}
                <View className="bg-white mx-6 mt-6 rounded-2xl p-6 shadow-sm border border-gray-100">
                    <Text className="text-lg font-semibold text-gray-900 mb-4">Account Information</Text>

                    <View className="space-y-4">
                        <View className="flex-row items-center p-3 bg-gray-50 rounded-xl">
                            <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                                <Mail size={18} color="#3b82f6"/>
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm text-gray-500 mb-1">Email Address</Text>
                                <Text className="text-gray-900 font-medium">{user.email}</Text>
                            </View>
                        </View>

                        <View className="flex-row items-center p-3 bg-gray-50 rounded-xl">
                            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                                <Calendar size={18} color="#10b981"/>
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm text-gray-500 mb-1">Member Since</Text>
                                <Text className="text-gray-900 font-medium">{formatDate(user.$createdAt)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Account Settings */}
                <View className="bg-white mx-6 mt-4 rounded-2xl p-6 shadow-sm border border-gray-100">
                    <Text className="text-lg font-semibold text-gray-900 mb-4">Account Settings</Text>

                    <TouchableOpacity className="flex-row items-center p-3 bg-gray-50 rounded-xl mb-3">
                        <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                            <Settings size={18} color="#3b82f6"/>
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-900 font-medium">Preferences</Text>
                            <Text className="text-sm text-gray-500">Manage your account settings</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Account Details */}
                <View className="bg-white mx-6 mt-4 rounded-2xl p-6 shadow-sm border border-gray-100">
                    <Text className="text-lg font-semibold text-gray-900 mb-4">Account Details</Text>

                    <View className="space-y-3">
                        <View className="flex-row justify-between py-2">
                            <Text className="text-gray-600">User ID</Text>
                            <Text className="text-gray-900 font-mono text-sm">{user.$id.slice(-8)}</Text>
                        </View>

                        <View className="flex-row justify-between py-2">
                            <Text className="text-gray-600">Account ID</Text>
                            <Text className="text-gray-900 font-mono text-sm">{user.accountId.slice(-8)}</Text>
                        </View>

                        <View className="flex-row justify-between py-2">
                            <Text className="text-gray-600">Last Updated</Text>
                            <Text className="text-gray-900">{formatDate(user.$updatedAt)}</Text>
                        </View>
                    </View>
                </View>

                {/* Logout Button */}
                <View className="mx-6 mt-6 mb-8">
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="bg-red-500 flex-row items-center justify-center p-4 rounded-2xl shadow-sm active:bg-red-600"
                    >
                        <LogOut size={20} color="white"/>
                        <Text className="text-white font-semibold ml-2 text-lg">Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;