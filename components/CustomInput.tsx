import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from "react";
import cn from "clsx";


export const CustomInput = ({
                                label,
                                placeholder = 'Enter text',
                                value,
                                onChangeText,
                                secureTextEntry = false,
                                keyboardType = "default",
                                rightIcon,
                                onRightIconPress,
                                ...props
                            } : CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="mb-4">
            {label && <Text className="text-gray-700 font-semibold mb-2">{label}</Text>}
            <View className={cn(
                "bg-gray-50 rounded-xl px-4 py-4 border flex-row items-center",
                isFocused ? "border-blue-500" : "border-gray-200"
            )}>
                <TextInput
                    style={{ flex: 1, color: "#111827", fontSize: 16 }}
                    placeholder={placeholder}
                    placeholderTextColor="#888"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {rightIcon && (
                    <TouchableOpacity onPress={onRightIconPress} hitSlop={10}>
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
