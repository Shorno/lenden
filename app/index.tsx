import "./global.css"
import {Text, View} from "react-native";
import {Redirect} from "expo-router";
import {getCurrentUser} from "@/lib/appwrite";

export default function Index() {

    const currentUser = getCurrentUser()

    if (!currentUser) {
        return <Redirect href={"/sign-in"}/>
    }

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                Welcome to Nativewind!
            </Text>
        </View>
    );
}
