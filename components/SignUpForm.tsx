import {Alert, Text, View, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import {useState} from "react";
import {CustomInput} from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";

export const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        const {email, name, password} = formData

        if (!formData.name || !formData.email || !formData.password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        if (formData.password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return;
        }
        setIsLoading(true)
        try {
            await createUser({email, name, password})
            router.replace("/")
        } catch (error: any) {
            Alert.alert("Error", error.message)
        } finally {
            setIsLoading(false)
        }

    };

    return (
        <View className={"gap-2 px-6"}>
            <CustomInput
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={text => setFormData({...formData, name: text})}
                keyboardType="default"
            />
            <CustomInput
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={text => setFormData({...formData, email: text})}
                keyboardType="email-address"
            />
            <CustomInput
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={text => setFormData({...formData, password: text})}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#6B7280"/>
                }
                onRightIconPress={() => setShowPassword(!showPassword)}
            />
            <CustomInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={text => setFormData({...formData, confirmPassword: text})}
                secureTextEntry={!showConfirmPassword}
                rightIcon={
                    <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#6B7280"/>
                }
                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <CustomButton
                title={isLoading ? "Creating Account..." : "Create Account"}
                onPress={handleSignUp}
                isLoading={isLoading}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="text-gray-600">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/sign-in")}>
                    <Text className="text-blue-600 font-semibold">Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUpForm;
