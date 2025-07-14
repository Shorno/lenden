import {Redirect, Slot} from "expo-router";
import {KeyboardAvoidingView, ScrollView} from "react-native";
import useAuthStore from "@/store/auth.store";

export default function AuthLayout() {
    const {isAuthenticated} = useAuthStore()
    if (isAuthenticated) return <Redirect href={"/"}/>

    return (
        <KeyboardAvoidingView behavior={'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <Slot/>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
