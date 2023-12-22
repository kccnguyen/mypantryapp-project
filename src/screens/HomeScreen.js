import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import NotiDATA from "../components/home/NotiDATA";
import { homeStyles } from "../../styles/styles";

//Only the first view screen, anything else in components/home
const HomeScreen = () => {
	//const [currentTheme, setCurrentTheme] = useState('blue')
	const navigation = useNavigation();

	return (
		<View style={homeStyles.backgroundContainer}>
			<View style={homeStyles.NotifButton}>
				<FlashList
					data={NotiDATA}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={{ marginTop: 10, marginBottom: 30 }}
						>
							<View>
								<Text style={homeStyles.notiText}>
									{item.title}
								</Text>

								<Text style={homeStyles.notiText}>
									{item.description}
								</Text>
							</View>
						</TouchableOpacity>
					)}
					estimatedItemSize={200}
				/>
			</View>

			<TouchableOpacity onPress={() => navigation.navigate("Order")}>
				<View style={homeStyles.chefButton}>
					<Image
						source={require("../../assets/home-images/chef-hat.png")}
						style={homeStyles.image}
					/>
					<View style={homeStyles.textContainer}>
						<Text style={homeStyles.buttonText}>Get a Chef!</Text>
					</View>
				</View>
			</TouchableOpacity>

			<View style={homeStyles.innerBGContainer}>
				<TouchableOpacity
					onPress={() => navigation.navigate("RecipesMainMenu")}
				>
					<View style={homeStyles.innerButton}>
						<Text style={homeStyles.innerButtonText}>Recipes</Text>
						<Image
							source={require("../../assets/home-images/recipe5.png")}
							style={homeStyles.image}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate("AddItems")}
				>
					<View style={homeStyles.innerButton}>
						<Text style={homeStyles.innerButtonText}>
							Add Items
						</Text>
						<Image
							source={require("../../assets/home-images/qr-code3.png")}
							style={homeStyles.image}
						/>
					</View>
				</TouchableOpacity>
			</View>

			<TouchableOpacity onPress={() => navigation.navigate("Expenses")}>
				<View style={homeStyles.spendButton}>
					<Image
						source={require("../../assets/home-images/activity.png")}
						style={homeStyles.image}
					/>
					<View style={homeStyles.textContainer}>
						<Text style={homeStyles.buttonText}>Spending</Text>
						<Text style={homeStyles.buttonText}>Tracker</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default HomeScreen;
