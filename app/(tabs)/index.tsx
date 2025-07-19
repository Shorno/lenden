import "../global.css"
import {Text, View} from "react-native";
import {Redirect} from "expo-router";
import useAuthStore from "@/store/auth.store";

export default function Index() {
    const {isAuthenticated, isLoading} = useAuthStore();


    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Redirect href={"/sign-in"}/>
    }

    return (
        <View className="flex-1 items-center justify-center bg-white">

            <Text className="text-xl font-bold text-blue-500 font-kindsans">
                Welcome to Nativewind!
            </Text>
        </View>
    );
}
