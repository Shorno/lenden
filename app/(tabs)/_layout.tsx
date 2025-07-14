import {Redirect, Slot} from "expo-router";
import useAuthStore from "@/store/auth.store";

export default function TabLayout() {
    const {isAuthenticated, user} = useAuthStore();

    console.log(user)

    if (isAuthenticated) return <Redirect href="/sign-in"/>
    return <Redirect href="/sign-in"/>
}