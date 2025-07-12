import {useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
} from "react-native";
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

import CustomButton from "@/components/CustomButton";
import {CustomInput} from "@/components/CustomInput";
import {signIn} from "@/lib/appwrite";

export const SignInForm = () => {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        const {email, password} = formData
        if (!formData.email || !formData.password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        setIsLoading(true)
        try {
            await signIn({email, password})
            router.replace("/")
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false)
        }


    };

    return (
        <KeyboardAvoidingView
            behavior={"height"}
            style={{flex: 1}}
        >
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="px-6 pt-12">
                    {/* Header */}
                    <View className="items-center mb-8">
                        <View className="w-20 h-20 bg-green-600 rounded-full items-center justify-center mb-4">
                            <Ionicons name="log-in" size={32} color="white"/>
                        </View>
                        <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</Text>
                        <Text className="text-gray-600 text-center">Sign in to continue to your account</Text>
                    </View>

                    {/* Form */}
                    <View className="space-y-4">
                        {/* Email Input */}
                        <CustomInput
                            label="Email Address"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChangeText={text => setFormData({...formData, email: text})}
                            keyboardType="email-address"
                        />

                        {/* Password Input */}
                        <CustomInput
                            label="Password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChangeText={text => setFormData({...formData, password: text})}
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={20}
                                    color="#6B7280"
                                />
                            }
                            onRightIconPress={() => setShowPassword(!showPassword)}
                        />

                        {/* Forgot Password */}
                        <TouchableOpacity className="self-end">
                            <Text className="text-blue-600 font-semibold">Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign In Button */}
                    <CustomButton
                        title="Sign In"
                        onPress={handleSignIn}
                        isLoading={isLoading}
                        style="mt-8"
                        // You can add leftIcon if needed
                    />

                    {/* Divider */}
                    <View className="flex-row items-center my-6">
                        <View className="flex-1 h-px bg-gray-300"/>
                        <Text className="mx-4 text-gray-500">or</Text>
                        <View className="flex-1 h-px bg-gray-300"/>
                    </View>

                    <View className="space-y-3">
                        <CustomButton
                            title="Continue with Google"
                            onPress={() => {
                            }}
                            leftIcon={<Ionicons name="logo-google" size={20} color="#DB4437"/>}
                            style="bg-white border border-gray-300"
                            textStyle="text-gray-800 font-semibold ml-3"
                        />
                    </View>

                    {/* Sign Up Link */}
                    <View className="flex-row justify-center items-center mt-6">
                        <Text className="text-gray-600">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/sign-up")}>
                            <Text className="text-green-600 font-semibold">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignInForm;
