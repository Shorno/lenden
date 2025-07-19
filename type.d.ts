import {Models} from "react-native-appwrite";
import {ReactNode} from "react";

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onBlur?: () => void; // Added for React Hook Form
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
    error?: string; // Added for error handling
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'; // Added for better input control
    autoCorrect?: boolean; // Added for better input control
}

interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
    disabled?: boolean
}

interface CreateUserPrams {
    email: string;
    password: string;
    name: string;
}

interface SignInParams {
    email: string;
    password: string;
}


export interface User extends Models.Document {
    name: string;
    email: string;
    avatar: string;
}

interface TabBarIconProps {
    focused: boolean;
    icon: ReactNode;
    title: string;
}