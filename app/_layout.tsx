import {SplashScreen, Stack} from "expo-router";
import * as Sentry from '@sentry/react-native';
import {useFonts} from "expo-font";
import {useEffect} from "react";
import useAuthStore from "@/store/auth.store";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/queryClient";

Sentry.init({
    dsn: 'https://2deb5594bef1b844dc84b98b7cd0b806@o4509660218785792.ingest.us.sentry.io/4509660268134400',

    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,

    // Configure Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
    const {isLoading, fetchAuthenticatedUser} = useAuthStore();


    const [fontsLoaded, error] = useFonts({
        "kindsans-bold": require("../assets/fonts/kindsans-bold.ttf"),
        "kindsans-medium": require("../assets/fonts/kindsans-medium.ttf"),
        "kindsans-light": require("../assets/fonts/kindsans-light.ttf"),
        "kindsans-regular": require("../assets/fonts/kindsans-regular.ttf"),
        "kindsans-semibold": require("../assets/fonts/kindsans-semibold.ttf"),
    })

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync()
    }, [fontsLoaded, error])

    useEffect(() => {
        fetchAuthenticatedUser()
    }, []);


    if (!fontsLoaded || isLoading) return null;

    return (

        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{headerShown: false}}/>
        </QueryClientProvider>
    );
});