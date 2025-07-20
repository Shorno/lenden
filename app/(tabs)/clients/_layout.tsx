import { Stack } from 'expo-router';

export default function ClientsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen
                name="add-client"
                options={{
                    presentation: 'modal',
                    headerShown: true,
                    headerTitle: 'New Client',
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: '600',
                    },
                }}
            />
        </Stack>
    );
}