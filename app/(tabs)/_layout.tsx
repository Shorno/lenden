import {Redirect, Tabs} from "expo-router";
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "@/type";
import {View, Text} from "react-native";
import cn from "clsx";
import {MaterialIcons} from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';


const TabBarIcon = ({focused, icon, title}: TabBarIconProps) => (
    <View className="tab-icon">
        {/*<Image source={icon} className="size-7" resizeMode="contain" tintColor={focused ? '#FE8C00' : '#5D5F6D'}/>*/}
        {icon}
        <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>
            {title}
        </Text>
    </View>
)

const ProfileIcon = ({focused}: {focused: boolean}) => (
    <MaterialIcons name="person" size={28} color={focused ? "#FE8C00" : "#5D5F6D"}/>
);

const HomeIcon = ({focused}: {focused: boolean}) => (
    <MaterialIcons name="home" size={28} color={focused ? "#FE8C00" : "#5D5F6D"}/>
);

const ListIcon = ({focused}: {focused: boolean}) => (
    <Entypo name="list" size={28} color={focused ? "#FE8C00" : "#5D5F6D"} />
);
export default function TabLayout() {
    const {isAuthenticated} = useAuthStore();

    if (!isAuthenticated) return  <Redirect href={"/sign-in"}/>


    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                height: 80,
            }
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({focused}) => <TabBarIcon title="Home" icon={<HomeIcon focused={focused}/>} focused={focused}/>
                }}
            />
            <Tabs.Screen
                name='clients'
                options={{
                    title: 'Clients',
                    tabBarIcon: ({focused}) => <TabBarIcon title="Clients" icon={<ListIcon focused={focused}/>} focused={focused}/>
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({focused}) => <TabBarIcon title="Profile" icon={<ProfileIcon focused={focused}/>} focused={focused}/>
                }}
            />
        </Tabs>
    )
}