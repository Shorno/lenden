import {Text, View} from "react-native";
import SignUpForm from "@/components/SignUpForm";
import {Ionicons} from "@expo/vector-icons";

export const SignUp = () => {
    return (
        <View className={"pt-16"}>
            <View className="items-center mb-8">
                <View className="w-20 h-20 bg-green-600 rounded-full items-center justify-center mb-4">
                    <Ionicons name="add-circle-outline" size={32} color="white" />
                </View>
                <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome</Text>
                <Text className="text-gray-600 text-center">Sign Up to continue using Lenden</Text>
            </View>
            <SignUpForm/>
        </View>
    )
};

export default SignUp;
