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

const ProfileIcon = () => (
    <MaterialIcons name="person" size={28} color="#5D5F6D"/>
);

const HomeIcon = () => (
    <MaterialIcons name="home" size={28} color="#5D5F6D"/>
)

const ListIcon  = ()=>(
    <Entypo name="list" size={28} color="black" />
)
export default function TabLayout() {
    const {isAuthenticated} = useAuthStore();

    if (!isAuthenticated) return  <Redirect href={"/sign-in"}/>


    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                marginHorizontal: 20,
                height: 80,
                position: 'absolute',
                bottom: 40,
                backgroundColor: 'white',
                shadowColor: '#1a1a1a',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5
            }
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({focused}) => <TabBarIcon title="Home" icon={<HomeIcon/>} focused={focused}/>
                }}
            />
            <Tabs.Screen
                name='clients'
                options={{
                    title: 'Clients',
                    tabBarIcon: ({focused}) => <TabBarIcon title="Clients" icon={<ListIcon/>} focused={focused}/>
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({focused}) => <TabBarIcon title="Profile" icon={<ProfileIcon/>} focused={focused}/>
                }}
            />
        </Tabs>
    )
}