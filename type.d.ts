import {Models} from "react-native-appwrite";
import {ReactNode} from "react";

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
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