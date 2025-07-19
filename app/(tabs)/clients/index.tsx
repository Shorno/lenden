import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {router} from "expo-router";
import {getClients} from "@/lib/appwrite";
import {useQuery} from "@tanstack/react-query";

const ClientCard = ({client}: { client: any }) => {
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'active':
                return {bg: 'bg-green-100', text: 'text-green-600'};
            case 'pending':
                return {bg: 'bg-yellow-100', text: 'text-yellow-600'};
            case 'inactive':
                return {bg: 'bg-red-100', text: 'text-red-600'};
            default:
                return {bg: 'bg-gray-100', text: 'text-gray-600'};
        }
    };

    const statusStyles = getStatusStyles(client.status);

    return (
        <TouchableOpacity
            className="bg-white rounded-2xl p-5 mb-3 border border-gray-200 shadow-sm active:bg-gray-50"
            activeOpacity={0.95}
        >
            <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 rounded-full bg-blue-500 justify-center items-center mr-4">
                    <Text className="text-white text-base font-semibold">{client.avatar}</Text>
                </View>
                <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-900 mb-1">{client.name}</Text>
                    <Text className="text-sm text-gray-500">{client.email}</Text>
                </View>
                <View className="items-end">
                    <View className={`px-2 py-1 rounded-md ${statusStyles.bg}`}>
                        <Text className={`text-xs font-semibold uppercase tracking-wide ${statusStyles.text}`}>
                            {client.status}
                        </Text>
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                <Text className="text-xs text-gray-400">Last transaction: {client.lastTransaction}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#9CA3AF"/>
            </View>
        </TouchableOpacity>
    );
};

const Clients = () => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['clients'],
        queryFn: async () => {
            const response = await getClients();
            return response.documents || [];
        },
    });


    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#3B82F6" />
            </SafeAreaView>
        );
    }

    if (isError) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center px-4">
                <Text className="text-red-500 text-center">
                    {error?.message || 'Failed to load clients'}
                </Text>
            </SafeAreaView>
        );
    }

    const handleAddClient = () => {
        router.push("/clients/add-client");
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header Section */}
            <View className="bg-white px-5 py-6 border-b border-gray-200">
                <Text className="text-3xl font-bold text-gray-900 mb-4">Clients</Text>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center bg-white mx-5 my-4 px-4 py-3 rounded-xl border border-gray-200">
                <MaterialIcons name="search" size={20} color="#9CA3AF" className="mr-3"/>
                <TextInput
                    className="flex-1 text-base text-gray-900 ml-3"
                    placeholder="Search clients..."
                    placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity className="p-1 ml-2">
                    <MaterialIcons name="tune" size={20} color="#6B7280"/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <ClientCard client={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
            />

            {/* Floating Add Button */}
            <TouchableOpacity
                className="absolute bottom-8 right-5 w-14 h-14 rounded-full bg-blue-500 justify-center items-center shadow-lg shadow-blue-500/30 active:bg-blue-600"
                onPress={handleAddClient}
                activeOpacity={0.9}
            >
                <MaterialIcons name="add" size={28} color="#FFFFFF"/>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Clients;