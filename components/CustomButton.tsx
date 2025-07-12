import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import cn from "clsx";

const CustomButton = ({
                          onPress,
                          title = "Click Me",
                          style,
                          textStyle,
                          leftIcon,
                          isLoading = false,
                          disabled = false,
                      }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || isLoading}
            className={cn(
                "mt-8 py-4 rounded-xl flex-row items-center justify-center",
                (disabled || isLoading) ? "bg-gray-400" : "bg-blue-600",
                style
            )}
            style={{
                shadowColor: "#3B82F6",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
            }}
            activeOpacity={0.85}
        >
            {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text className={cn("text-white text-center font-bold text-lg", textStyle)}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;
