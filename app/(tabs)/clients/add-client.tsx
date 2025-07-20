import {useCallback, useEffect, useState} from "react";
import {
    View,
    Text,
    Alert,
    Keyboard,
} from "react-native";
import {useFocusEffect, useNavigation} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import CustomButton from "@/components/CustomButton";
import {CustomInput} from "@/components/CustomInput";
import {addClient} from "@/lib/appwrite";
import {queryKeys} from "@/lib/queryKeys";
import {ImagePickerComponent} from "@/components/ImagePickeer";

const addClientSchema = z.object({
    name: z.string()
        .min(1, "Full name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
        .transform(str => str.trim()),
    memberId: z.string()
        .min(1, "Member ID is required")
        .min(3, "Member ID must be at least 3 characters")
        .max(20, "Member ID must be less than 20 characters")
        .regex(/^[a-zA-Z0-9-_]+$/, "Member ID can only contain letters, numbers, hyphens, and underscores")
        .transform(str => str.trim().toUpperCase()),
    location: z.string()
        .min(1, "Location is required")
        .min(2, "Location must be at least 2 characters")
        .max(100, "Location must be less than 100 characters")
        .transform(str => str.trim()),
    nidImageUri: z.string()
        .min(1, "NID image is required")
});

type AddClientFormData = z.infer<typeof addClientSchema>;

const AddClient = () => {
    const navigation = useNavigation();
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {isValid, errors},
    } = useForm<AddClientFormData>({
        resolver: zodResolver(addClientSchema),
        defaultValues: {
            name: "",
            memberId: "",
            location: "",
            nidImageUri: ""
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const watchedNidImage = watch('nidImageUri');

    const addClientMutation = useMutation({
        mutationFn: addClient,
        onSuccess: (_, variables) => {
            reset();
            Alert.alert(
                "Success! 🎉",
                `Client "${variables.name}" has been added successfully!`,
                [{text: "OK", style: "default"}]
            );
            queryClient.invalidateQueries({queryKey: queryKeys.clients.all});
        },
        onError: (error: any) => {
            Alert.alert(
                'Error ❌',
                error.message || 'Failed to add client. Please try again.',
                [{text: "OK", style: "destructive"}]
            );
        }
    });

    // Android-optimized keyboard listeners
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setIsKeyboardVisible(true)
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setIsKeyboardVisible(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Hide tab bar when screen is focused
    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({
                tabBarStyle: {display: 'none'}
            });

            return () => navigation.getParent()?.setOptions({
                tabBarStyle: {
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: 80,
                    display: 'flex'
                }
            });
        }, [navigation])
    );

    const onSubmit = async (data: AddClientFormData) => {
        Keyboard.dismiss();

        try {
            const {name, memberId, location, nidImageUri} = data;

            // The addClient function will handle the image upload
            addClientMutation.mutate({name, location, memberId, nidImageUri});
        } catch (error) {
            Alert.alert('Error', 'Failed to process form data');
        }
    };

    const handleImageSelect = (uri: string) => {
        setValue('nidImageUri', uri, { shouldValidate: true });
    };

    const handleImageRemove = () => {
        setValue('nidImageUri', '', { shouldValidate: true });
    };

    return (
        <View className="flex-1 bg-gray-50">
            <KeyboardAwareScrollView
                style={{flex: 1}}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: 20,
                    paddingBottom: isKeyboardVisible ? 20 : 32,
                }}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                extraHeight={120}
                extraScrollHeight={120}
                keyboardOpeningTime={250}
                scrollEnabled={true}
                keyboardDismissMode="none"
                bounces={true}
            >
                {/* Header Section */}
                <View className="items-center mb-8 mt-4">
                    <View className="w-24 h-24 bg-green-600 rounded-full items-center justify-center mb-6 shadow-lg">
                        <Ionicons name="person-add" size={36} color="white"/>
                    </View>
                    <Text className="text-3xl font-bold text-gray-900 mb-3">Add New Client</Text>
                    <Text className="text-gray-600 text-center text-base leading-6">
                        Enter client information below to add them to your database
                    </Text>
                </View>

                {/* Form Section */}
                <View className="mb-6">
                    {/* Full Name Input */}
                    <Controller
                        control={control}
                        name="name"
                        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                            <CustomInput
                                label="Full Name *"
                                placeholder="Enter client's full name"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={error?.message}
                                autoCapitalize="words"
                                autoCorrect={false}
                                keyboardType="default"
                            />
                        )}
                    />

                    {/* Member ID Input */}
                    <Controller
                        control={control}
                        name="memberId"
                        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                            <CustomInput
                                label="Member ID *"
                                placeholder="Enter unique member ID"
                                value={value}
                                onChangeText={(text) => {
                                    onChange(text.toUpperCase());
                                }}
                                onBlur={onBlur}
                                error={error?.message}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                            />
                        )}
                    />

                    {/* Location Input */}
                    <Controller
                        control={control}
                        name="location"
                        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                            <CustomInput
                                label="Location *"
                                placeholder="Enter client's location"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={error?.message}
                                autoCapitalize="words"
                                autoCorrect={true}
                                keyboardType="default"
                            />
                        )}
                    />

                    {/* NID Image Picker */}
                    <ImagePickerComponent
                        value={watchedNidImage}
                        onImageSelect={handleImageSelect}
                        onImageRemove={handleImageRemove}
                        error={errors.nidImageUri?.message}
                        label="NID Image"
                        placeholder="Select NID image"
                    />
                </View>

                {/* Action Buttons */}
                <View className="space-y-3 mb-6">
                    {/* Add Client Button */}
                    <CustomButton
                        title={addClientMutation.isPending ? "Adding Client..." : "Add Client"}
                        onPress={handleSubmit(onSubmit)}
                        isLoading={addClientMutation.isPending}
                        disabled={!isValid || addClientMutation.isPending}
                        style="shadow-lg"
                        leftIcon={<Ionicons name="person-add" size={20} color="white"/>}
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default AddClient;