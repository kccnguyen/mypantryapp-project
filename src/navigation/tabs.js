import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeStack from "./stacks/HomeStack";
import InventoryStack from "./stacks/InventoryStack";
import OrderStack from "./stacks/OrderStack";
import AccountStack from "./stacks/AccountStack";

const Tab = createBottomTabNavigator();

export default function Tabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,

				tabBarStyle: {
					backgroundColor: "black",
				},

				tabBarActiveTintColor: "#2A77EE",

				tabBarIcon: ({ focused, color }) => {
					if (route.name === "HomeTab") {
						return (
							<MaterialCommunityIcons
								name="home"
								size={focused ? 35 : 30}
								color={color}
							/>
						);
					} else if (route.name === "InventoryTab") {
						return (
							<Ionicons
								name="list"
								size={focused ? 35 : 30}
								color={color}
							/>
						);
					} else if (route.name === "OrderTab") {
						return (
							<MaterialCommunityIcons
								name="food"
								size={focused ? 35 : 30}
								color={color}
							/>
						);
					} else if (route.name === "AccountTab") {
						return (
							<MaterialCommunityIcons
								name="account"
								size={focused ? 35 : 30}
								color={color}
							/>
						);
					}
				},
			})}
		>
			<Tab.Screen
				name="HomeTab"
				options={{
					title: "Home",
				}}
				component={HomeStack}
			/>

			<Tab.Screen
				name="InventoryTab"
				options={{
					title: "Inventory",
					headerShown: false,
				}}
				component={InventoryStack}
			/>

			<Tab.Screen
				name="OrderTab"
				component={OrderStack}
				options={{ 
                    title: "Order", 
                    headerShown: false,
                }}
			/>

			<Tab.Screen
				name="AccountTab"
				options={{
					title: "Account",
				}}
				component={AccountStack}
			/>
		</Tab.Navigator>
	);
}
