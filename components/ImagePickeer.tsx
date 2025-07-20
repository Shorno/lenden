import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    StyleSheet,
    Platform,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface ImagePickerComponentProps {
    value?: string;
    onImageSelect: (uri: string) => void;
    onImageRemove: () => void;
    error?: string;
    label?: string;
    placeholder?: string;
}

export const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
                                                                              value,
                                                                              onImageSelect,
                                                                              onImageRemove,
                                                                              error,
                                                                              label = "NID Image",
                                                                              placeholder = "Select NID image"
                                                                          }) => {
    const [isLoading, setIsLoading] = useState(false);

    const requestPermissions = async () => {
        if (Platform.OS !== 'web') {
            const {status: cameraStatus} = await ImagePicker.requestCameraPermissionsAsync();
            const {status: mediaStatus} = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
                Alert.alert(
                    'Permissions Required',
                    'Camera and media library permissions are required to select images.',
                    [{text: 'OK'}]
                );
                return false;
            }
        }
        return true;
    };

    const showImagePicker = async () => {
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) return;

        Alert.alert(
            'Select Image',
            'Choose how you want to select the NID image',
            [
                {
                    text: 'Camera',
                    onPress: () => pickImage('camera'),
                },
                {
                    text: 'Gallery',
                    onPress: () => pickImage('gallery'),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    const pickImage = async (source: 'camera' | 'gallery') => {
        setIsLoading(true);

        try {
            const options: ImagePicker.ImagePickerOptions = {
                mediaTypes: "images",
                allowsEditing: true,
                quality: 1,
                exif: false,
            };

            let result: ImagePicker.ImagePickerResult;

            if (source === 'camera') {
                result = await ImagePicker.launchCameraAsync(options);
            } else {
                result = await ImagePicker.launchImageLibraryAsync(options);
            }

            if (!result.canceled && result.assets[0]) {
                onImageSelect(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label} <Text style={styles.required}>*</Text>
                </Text>
            )}

            <TouchableOpacity
                style={[
                    styles.imageContainer,
                    error && styles.imageContainerError,
                    value && styles.imageContainerSelected
                ]}
                onPress={showImagePicker}
                disabled={isLoading}
            >
                {value ? (
                    <View style={styles.imageWrapper}>
                        <Image source={{uri: value}} style={styles.image}/>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={onImageRemove}
                        >
                            <Ionicons name="close-circle" size={24} color="#ef4444"/>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Ionicons
                            name={isLoading ? "hourglass" : "camera"}
                            size={32}
                            color="#9ca3af"
                        />
                        <Text style={styles.placeholderText}>
                            {isLoading ? 'Loading...' : placeholder}
                        </Text>
                        <Text style={styles.instructionText}>
                            Tap to select from camera or gallery
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    required: {
        color: '#ef4444',
    },
    imageContainer: {
        borderWidth: 2,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        borderStyle: 'dashed',
        backgroundColor: '#f9fafb',
        minHeight: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainerError: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
    },
    imageContainerSelected: {
        borderColor: '#10b981',
        borderStyle: 'solid',
        backgroundColor: '#f0fdf4',
    },
    imageWrapper: {
        width: '100%',
        height: 150,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 2,
    },
    placeholderContainer: {
        alignItems: 'center',
        padding: 20,
    },
    placeholderText: {
        fontSize: 16,
        color: '#6b7280',
        marginTop: 8,
        fontWeight: '500',
    },
    instructionText: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 4,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 14,
        color: '#ef4444',
        marginTop: 6,
        marginLeft: 4,
    },
});