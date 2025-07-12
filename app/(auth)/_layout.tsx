import { Slot } from "expo-router";
import {KeyboardAvoidingView, ScrollView} from "react-native";

export default function AuthLayout() {
    return (
        <KeyboardAvoidingView behavior={'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <Slot />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
