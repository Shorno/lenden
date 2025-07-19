import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from "react";
import cn from "clsx";
import { CustomInputProps } from "@/type";

export const CustomInput = ({
                                label,
                                placeholder = 'Enter text',
                                value = '', // Default to empty string
                                onChangeText,
                                onBlur,
                                secureTextEntry = false,
                                keyboardType = "default",
                                rightIcon,
                                onRightIconPress,
                                error,
                                autoCapitalize = "none",
                                autoCorrect = false,
                                ...props
                            }: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => {
        setIsFocused(false);
        onBlur?.(); // Call the onBlur if provided (React Hook Form needs this)
    };

    return (
        <View className="mb-4">
            {/* Label */}
            {label && (
                <Text className="text-gray-700 font-semibold mb-2">
                    {label}
                </Text>
            )}

            {/* Input Container */}
            <View className={cn(
                "bg-gray-50 rounded-xl px-4 py-4 border flex-row items-center",
                // Dynamic border color based on state
                isFocused
                    ? "border-blue-500"
                    : error
                        ? "border-red-500"
                        : "border-gray-200",
                // Dynamic background color when there's an error
                error && !isFocused ? "bg-red-50" : "bg-gray-50"
            )}>
                <TextInput
                    style={{ flex: 1, color: "#111827", fontSize: 16 }}
                    placeholder={placeholder}
                    placeholderTextColor={error ? "#ef4444" : "#888"}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    {...props}
                />
                {rightIcon && (
                    <TouchableOpacity onPress={onRightIconPress} hitSlop={10}>
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>

            {/* Error Message */}
            {error && (
                <View className="mt-1 flex-row items-center">
                    <Text className="text-red-500 text-sm font-medium">
                        {error}
                    </Text>
                </View>
            )}
        </View>
    );
};