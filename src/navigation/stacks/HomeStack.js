import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import RecipesCard from "../../components/home/RecipesCard";
import AddItemScreen from "../../screens/Inventory/AddItemsCard";
import UserRecipeStack from "./UserRecipeStack";
import ExpensesStack from "./ExpenseStack";
import AddSearchFoods from "../../components/Inventory/AddSearchFoods";
import AddButtonScreen from "../../screens/Inventory/AddButtonScreen";
import AddManually from "../../screens/Inventory/AddManually";
import AddBarcode from "../../screens/Inventory/AddBarcode";
import AddBarcodeInfo from "../../components/Inventory/AddBarcodeInfo";
import OrderScreen from "../../screens/OrderScreen";
import SearchFoods from "../../screens/Inventory/SearchFoods";

const Stack = createStackNavigator();

export default function HomeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Order" component={OrderScreen} />
			<Stack.Screen name="Recipes" component={RecipesCard} />
			<Stack.Screen
				name="AddItems"
				component={AddItemScreen}
				options={{ headerTitle: "Add To Inventory" }}
			/>
			<Stack.Screen
				name="Expenses"
				component={ExpensesStack}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="AddButtonScreen"
				component={AddButtonScreen}
				options={{ headerTitle: "Add To Inventory" }}
			/>
			<Stack.Screen
				name="RecipesMainMenu"
				component={UserRecipeStack}
				options={{ headerShown: false }}
			/>

			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen
					name="AddManually"
					component={AddManually}
					options={{ headerTitle: "" }}
				/>

				<Stack.Screen
					name="AddBarcodeInfo"
					component={AddBarcodeInfo}
					options={{ headerTitle: "" }}
				/>

				<Stack.Screen
					name="AddSearchFoods"
					component={AddSearchFoods}
					options={{ headerTitle: "" }}
				/>
			</Stack.Group>

			<Stack.Screen
				name="AddBarcode"
				component={AddBarcode}
				options={{ headerTitle: "" }}
			/>

			<Stack.Screen
				name="SearchFoods"
				component={SearchFoods}
				options={{ headerTitle: "" }}
			/>

			{/* add more if needed */}
		</Stack.Navigator>
	);
}
